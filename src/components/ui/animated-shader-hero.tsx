"use client";

import { useRef, useEffect } from "react";

// ─── GLSL shader source (by Matthias Hurrle @atzedent) ───────────────────────
const SHADER_SRC = `#version 300 es
/*
 * made by Matthias Hurrle (@atzedent)
 */
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 move;
uniform vec2 touch;
uniform int pointerCount;
uniform vec2 pointers;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p){
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);
  for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}
  return t;
}
float clouds(vec2 p){
  float d=1.,t=.0;
  for(float i=.0;i<3.;i++){
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}
void main(void){
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1);
}`;

// ─── WebGL renderer ───────────────────────────────────────────────────────────
class WebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;
  private scale: number;
  private mouseMove = [0, 0];
  private mouseCoords = [0, 0];
  private pointerCoords = [0, 0];
  private nbrOfPointers = 0;

  private readonly vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

  private readonly vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

  constructor(canvas: HTMLCanvasElement, scale: number) {
    this.canvas = canvas;
    this.scale = scale;
    const gl = canvas.getContext("webgl2");
    if (!gl) throw new Error("WebGL2 not supported");
    this.gl = gl;
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
  }

  private compile(shader: WebGLShader, source: string) {
    const { gl } = this;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader error:", gl.getShaderInfoLog(shader));
    }
  }

  reset() {
    const { gl } = this;
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs); }
      if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs); }
      gl.deleteProgram(this.program);
    }
  }

  setup() {
    const { gl } = this;
    this.vs = gl.createShader(gl.VERTEX_SHADER)!;
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    this.compile(this.vs, this.vertexSrc);
    this.compile(this.fs, SHADER_SRC);
    this.program = gl.createProgram()!;
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const { gl, program } = this;
    if (!program) return;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    (program as any).resolution   = gl.getUniformLocation(program, "resolution");
    (program as any).time         = gl.getUniformLocation(program, "time");
    (program as any).move         = gl.getUniformLocation(program, "move");
    (program as any).touch        = gl.getUniformLocation(program, "touch");
    (program as any).pointerCount = gl.getUniformLocation(program, "pointerCount");
    (program as any).pointers     = gl.getUniformLocation(program, "pointers");
  }

  updateScale(scale: number) {
    this.scale = scale;
    this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
  }

  updateMove(d: number[])   { this.mouseMove    = d; }
  updateMouse(c: number[])  { this.mouseCoords  = c; }
  updatePointerCoords(c: number[]) { this.pointerCoords = c; }
  updatePointerCount(n: number)    { this.nbrOfPointers = n; }

  render(now = 0) {
    const { gl, program } = this;
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.uniform2f((program as any).resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f((program as any).time, now * 1e-3);
    gl.uniform2f((program as any).move, ...([this.mouseMove[0], this.mouseMove[1]] as [number, number]));
    gl.uniform2f((program as any).touch, ...([this.mouseCoords[0], this.mouseCoords[1]] as [number, number]));
    gl.uniform1i((program as any).pointerCount, this.nbrOfPointers);
    gl.uniform2fv((program as any).pointers, this.pointerCoords);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

// ─── Pointer handler ──────────────────────────────────────────────────────────
class PointerHandler {
  private active = false;
  private pointers = new Map<number, number[]>();
  private lastCoords = [0, 0];
  private moves = [0, 0];
  private scale: number;

  constructor(canvas: HTMLCanvasElement, scale: number) {
    this.scale = scale;
    const map = (x: number, y: number) =>
      [x * this.scale, canvas.height - y * this.scale];

    canvas.addEventListener("pointerdown", (e) => {
      this.active = true;
      this.pointers.set(e.pointerId, map(e.clientX, e.clientY));
    });
    canvas.addEventListener("pointerup", (e) => {
      if (this.pointers.size === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });
    canvas.addEventListener("pointerleave", (e) => {
      if (this.pointers.size === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!this.active) return;
      this.lastCoords = [e.clientX, e.clientY];
      this.pointers.set(e.pointerId, map(e.clientX, e.clientY));
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
    });
  }

  updateScale(s: number) { this.scale = s; }
  get count()  { return this.pointers.size; }
  get move()   { return this.moves; }
  get coords() { return this.pointers.size > 0 ? Array.from(this.pointers.values()).flat() : [0, 0]; }
  get first()  { return this.pointers.values().next().value || this.lastCoords; }
}

// ─── Exported canvas-only background component ────────────────────────────────
export default function AnimatedShaderBackground() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number>(0);
  const rendererRef  = useRef<WebGLRenderer | null>(null);
  const pointersRef  = useRef<PointerHandler | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer(canvas, dpr);
    } catch {
      // WebGL2 not available — just show black
      return;
    }
    rendererRef.current = renderer;
    const handler = new PointerHandler(canvas, dpr);
    pointersRef.current = handler;

    const resize = () => {
      const d = Math.max(1, 0.5 * window.devicePixelRatio);
      canvas.width  = window.innerWidth  * d;
      canvas.height = window.innerHeight * d;
      renderer.updateScale(d);
      handler.updateScale(d);
    };

    resize();
    renderer.setup();
    renderer.init();

    const loop = (now: number) => {
      renderer.updateMouse(handler.first);
      renderer.updatePointerCount(handler.count);
      renderer.updatePointerCoords(handler.coords);
      renderer.updateMove(handler.move);
      renderer.render(now);
      rafRef.current = requestAnimationFrame(loop);
    };
    loop(0);

    window.addEventListener("resize", resize, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
      renderer.reset();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full touch-none pointer-events-none z-0"
      style={{ background: "black" }}
      aria-hidden="true"
    />
  );
}
