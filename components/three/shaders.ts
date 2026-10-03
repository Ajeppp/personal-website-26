// Simplex 3D noise — Ian McEwan / Ashima Arts (MIT)
const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

/* ─────────────────────────────────────────────
   PARTICLES — one cloud, six shapes.
   uStage is a float: the integer part picks the shape,
   the fraction morphs toward the next one.
   ───────────────────────────────────────────── */
export const particlesVertex = /* glsl */ `
uniform float uTime;
uniform float uStage;
uniform float uSize;
uniform float uVel;
uniform float uOpacity;
uniform vec4 uLayerW;
uniform vec3 uMouse;

attribute vec3 aP1;
attribute vec3 aP2;
attribute vec3 aP3;
attribute vec3 aP4;
attribute vec3 aP5;
attribute vec4 aRand; // xyz = random, w = stack layer (0-3)

varying float vWarm;
varying float vAlpha;
varying float vSpark;

${noise}

mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float ease(float t){t=clamp(t,0.0,1.0);return t*t*(3.0-2.0*t);}

void main(){
  float t=uTime;
  float layer=aRand.w;
  float lw=layer<0.5?uLayerW.x:layer<1.5?uLayerW.y:layer<2.5?uLayerW.z:uLayerW.w;

  // 0 — orb shell, breathing
  vec3 p0=position;
  p0+=normalize(position)*snoise(position*1.3+t*0.25)*0.1;
  p0.xz=rot(t*0.14)*p0.xz;
  p0.xy=rot(0.35)*p0.xy;

  // 1 — drifting dust
  vec3 p1=aP1;
  p1.x+=cos(t*0.15+aRand.y*6.283)*0.3;
  p1.y+=sin(t*0.2+aRand.x*6.283)*0.3;

  // 2 — the stack: four layers, the active one lifts
  vec3 p2=aP2;
  p2.y+=sin(p2.x*3.0+t*1.1+layer)*cos(p2.z*3.0+t*0.9)*0.035*(0.4+lw);
  p2.y+=lw*0.1;
  p2.xz=rot(t*0.16+0.78)*p2.xz;
  p2.yz=rot(-0.2)*p2.yz;

  // 3 — helix
  vec3 p3=aP3;
  p3.xz=rot(t*0.32)*p3.xz;
  p3.xy=rot(0.28)*p3.xy;

  // 4 — tunnel, streaming toward the camera
  vec3 p4=aP4;
  p4.z=mod(p4.z+t*0.5+12.0,16.0)-12.0;
  p4.xy=rot(t*0.035)*p4.xy;

  // 5 — planet + ring
  vec3 p5=aP5;
  p5.xz=rot(t*0.2)*p5.xz;
  p5.yz=rot(0.38)*p5.yz;
  p5.xy=rot(-0.2)*p5.xy;

  float s=uStage;
  vec3 p=mix(p0,p1,ease(s));
  p=mix(p,p2,ease(s-1.0));
  p=mix(p,p3,ease(s-2.0));
  p=mix(p,p4,ease(s-3.0));
  p=mix(p,p5,ease(s-4.0));

  // turbulence while morphing and while scrolling fast
  float trans=sin(fract(s)*3.14159);
  float amp=trans*0.4+uVel*0.16;
  vec3 q=p*0.7+aRand.xyz*2.0+t*0.08;
  p+=vec3(snoise(q),snoise(q+11.3),snoise(q+23.7))*amp;

  vec4 wp=modelMatrix*vec4(p,1.0);

  // cursor pushes particles away
  vec2 d=wp.xy-uMouse.xy;
  float push=1.0-smoothstep(0.0,1.0,length(d));
  wp.xy+=normalize(d+0.0001)*push*0.32;

  vec4 mv=viewMatrix*wp;
  gl_Position=projectionMatrix*mv;
  float tunnel=ease(s-3.0)*(1.0-ease(s-4.0));
  gl_PointSize=min(uSize*(0.35+aRand.z)*(1.0+tunnel*0.35)*(1.0/-mv.z),48.0);

  float stackAmt=1.0-clamp(abs(s-2.0),0.0,1.0);
  float flow=smoothstep(-0.55,0.55,snoise(p*0.45+t*0.05));
  vWarm=mix(flow,lw,stackAmt);
  vSpark=step(0.965,aRand.y);
  vAlpha=uOpacity*mix(1.0,0.42+0.58*lw,stackAmt)*(0.55+0.45*aRand.x);
  // fade the tunnel in from the far end instead of popping
  vAlpha*=mix(1.0,smoothstep(-12.0,-9.0,p4.z)*(1.0-smoothstep(1.5,4.0,p4.z)),tunnel);
}
`;

export const particlesFragment = /* glsl */ `
uniform vec3 uWarm;
uniform vec3 uCool;
varying float vWarm;
varying float vAlpha;
varying float vSpark;

void main(){
  float d=length(gl_PointCoord-0.5);
  float a=1.0-smoothstep(0.0,0.5,d);
  a=pow(a,1.3);
  vec3 col=mix(uCool,uWarm,vWarm);
  col=mix(col,vec3(1.0,0.95,0.88),vSpark*0.8);
  gl_FragColor=vec4(col,a*vAlpha);
  #include <colorspace_fragment>
}
`;

/* ─────────────────────────────────────────────
   CORE — the liquid vermilion orb (the "period" in jefer.)
   ───────────────────────────────────────────── */
export const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uVel;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;

${noise}

float field(vec3 p){
  return snoise(p*1.25+uTime*0.22)*(0.13+uVel*0.05)+snoise(p*2.9-uTime*0.3)*0.03;
}
vec3 displace(vec3 p){return p+normalize(p)*field(p);}

void main(){
  float r=length(position);
  vec3 n=normalize(position);
  vec3 up=abs(n.y)>0.99?vec3(1.0,0.0,0.0):vec3(0.0,1.0,0.0);
  vec3 tg=normalize(cross(up,n));
  vec3 bt=cross(n,tg);
  float e=0.02;
  vec3 p=displace(position);
  vec3 pa=displace(normalize(position+tg*e)*r);
  vec3 pb=displace(normalize(position+bt*e)*r);
  vec3 dn=normalize(cross(pa-p,pb-p));

  vDisp=field(position);
  vNormal=normalize(normalMatrix*dn);
  vec4 mv=modelViewMatrix*vec4(p,1.0);
  vView=normalize(-mv.xyz);
  gl_Position=projectionMatrix*mv;
}
`;

export const coreFragment = /* glsl */ `
uniform vec3 uWarm;
uniform vec3 uCool;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;

void main(){
  vec3 N=normalize(vNormal);
  vec3 V=normalize(vView);
  vec3 L=normalize(vec3(-0.55,0.75,0.6));

  float diff=dot(N,L)*0.5+0.5;
  diff=diff*diff;
  float fres=pow(1.0-max(dot(N,V),0.0),2.6);
  float spec=pow(max(dot(reflect(-L,N),V),0.0),48.0);

  vec3 deep=uWarm*0.16+vec3(0.02,0.0,0.03);
  vec3 col=mix(deep,uWarm,diff);
  col=mix(col,uWarm*1.25+vec3(0.12,0.06,0.0),smoothstep(0.02,0.16,vDisp)*0.35);
  col=mix(col,uCool,fres*0.85);
  col+=spec*vec3(1.0,0.93,0.86)*0.7;

  gl_FragColor=vec4(col,1.0);
  #include <colorspace_fragment>
}
`;
