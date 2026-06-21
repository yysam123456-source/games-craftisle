import{Mt as e,Nt as t,a as n,bt as r,d as i,pt as a}from"./KDm2vTix.js";import{r as o,t as s}from"./BbnIowjr.js";function c(e,t,r=`BatchedMesh`){let i=e.length,a=new n(i,e.reduce((e,t)=>e+t.attributes.position.count,0),e.reduce((e,t)=>e+(t.index?.count??0),0),t);a.name=r,a.frustumCulled=!1;for(let t of e){let e=a.addGeometry(t);a.addInstance(e)}return a}var l=`
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vHighPrecisionZW;

void main() {
	vUv = uv;
	vNormal = normalize(normalMatrix * normal);
	vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
	vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
	gl_Position = projectionMatrix * viewPosition;
	vHighPrecisionZW = gl_Position.zw;
}
`,u=`
precision highp float;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColorWaves1;
uniform vec3 uColorWaves2;
uniform sampler2D tNoise;
uniform sampler2D tSceneDepth;
uniform vec2 uResolution;
uniform float uTime;
uniform float uUseSceneDepth;
uniform float uCameraNear;
uniform float uCameraFar;
uniform vec3 uLightPosition;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vHighPrecisionZW;

float linearizeDepth(float depth) {
	float z = depth * 2.0 - 1.0;
	return (2.0 * uCameraNear * uCameraFar) / (uCameraFar + uCameraNear - z * (uCameraFar - uCameraNear));
}

void main() {
	vec2 noiseUv = vWorldPosition.xz * 0.12 + uTime * 0.04;
	float noise = texture2D(tNoise, noiseUv).r;
	float waves = smoothstep(0.35, 0.85, fract(vUv.y * 4.0 + noise * 2.0 + uTime * 0.15));

	vec3 base = mix(uColor1, uColor2, noise * 0.5);
	vec3 color = mix(base, mix(uColorWaves1, uColorWaves2, waves), waves * 0.55);

	if (uUseSceneDepth > 0.5) {
		vec2 screenUv = gl_FragCoord.xy / uResolution;
		float sceneDepth = linearizeDepth(texture2D(tSceneDepth, screenUv).x);
		float waterDepth = linearizeDepth(0.5 * vHighPrecisionZW.x / vHighPrecisionZW.y + 0.5);
		float shore = smoothstep(0.0, 0.12, sceneDepth - waterDepth);
		color = mix(uColorWaves2 * 1.1, color, shore);
	}

	float shade = max(dot(normalize(vNormal), normalize(uLightPosition - vWorldPosition)), 0.0);
	color *= 0.65 + shade * 0.35;

	gl_FragColor = vec4(color, 0.88);
}
`,d={uColor1:`#4c868c`,uColor2:`#437a7f`,uColorWaves1:`#366a6f`,uColorWaves2:`#6facb2`};function f(n,o=new t(10,16,6),s=.1,c=500){return n.wrapS=a,n.wrapT=a,new r({name:`GameplayWater`,transparent:!0,depthWrite:!0,uniforms:{uColor1:{value:new i(d.uColor1)},uColor2:{value:new i(d.uColor2)},uColorWaves1:{value:new i(d.uColorWaves1)},uColorWaves2:{value:new i(d.uColorWaves2)},tNoise:{value:n},tSceneDepth:{value:null},uResolution:{value:new e(1,1)},uTime:{value:0},uUseSceneDepth:{value:0},uCameraNear:{value:s},uCameraFar:{value:c},uLightPosition:{value:o.clone()}},vertexShader:l,fragmentShader:u})}async function p(e,t,n=.1,r=500){let i=await s(o.gameplayWater);for(let e of i)e.computeVertexNormals();return c(i,f(e,t,n,r),`GameplayWater`)}function m(e,t){e.uniforms.uTime.value=t}function h(e,t){e.uniforms.uLightPosition.value.copy(t)}function g(e,t,n,r){e.uniforms.tSceneDepth.value=t,e.uniforms.uResolution.value.set(n,r),e.uniforms.uUseSceneDepth.value=+!!t}var _=`
attribute float surfaceId;
attribute float elementId;

varying vec2 vUv;
varying vec3 wNormal;
varying vec3 wPos;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vSurfaceId;
flat varying int vElementId;

void main() {
	vUv = uv;
	vElementId = int(elementId + 0.5);
	vSurfaceId = surfaceId;

	vec4 worldPosition = modelMatrix * vec4(position, 1.0);
	wNormal = normal;
	wPos = position.xyz;
	vNormal = normalize(normalMatrix * normal);
	vWorldPosition = worldPosition.xyz;

	gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,v=`
precision highp float;

uniform sampler2D tColors;
uniform sampler2D tNoiseTerrain;
uniform sampler2D tNoise;
uniform vec3 uLightPosition;

varying vec2 vUv;
varying vec3 wNormal;
varying vec3 wPos;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vSurfaceId;
flat varying int vElementId;

vec3 rgb2hsv(vec3 c) {
	vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
	vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
	vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
	float d = q.x - min(q.w, q.y);
	float e = 1.0e-10;
	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec4 triplanar(sampler2D tex, vec3 normal, vec3 pos, float scale) {
	vec3 blend = abs(normal);
	blend = normalize(max(blend, 0.00001));
	float b = blend.x + blend.y + blend.z;
	blend /= vec3(b);
	vec4 x = texture2D(tex, pos.yz * scale);
	vec4 y = texture2D(tex, pos.xz * scale);
	vec4 z = texture2D(tex, pos.xy * scale);
	return x * blend.x + y * blend.y + z * blend.z;
}

void main() {
	float surfaceId = vSurfaceId;
	vec3 worldNormal = normalize(vNormal);
	vec4 triplanarNoise = triplanar(tNoise, wNormal, wPos * 0.07, 1.0);
	float height = length(wPos);
	float grassMask = 0.0;

	if (vElementId == 1) {
		grassMask = step(
			0.15,
			max(0.0, -triplanarNoise.r * 1.5 + dot(wNormal, normalize(wPos)))
				- triplanarNoise.g * 0.35 + 0.1 - triplanarNoise.b * 0.05
		);

		float n1 = sin(height * 0.025 + (wNormal.x + wNormal.y + wNormal.z) * 0.05 + (wPos.x + wPos.y + wPos.z) * 1.5);
		float striations = texture2D(tNoise, vec2(n1 * 0.01, height * 0.07 - n1 * 0.02)).g;
		striations = step(0.47, striations + triplanarNoise.r * 0.2 + triplanarNoise.g * 0.05);
		surfaceId += striations * (1.0 - grassMask) * step(0.25, triplanarNoise.r);
	}

	vec2 colorUV = vUv;
	if (grassMask > 0.5) colorUV = vec2(0.15, 0.95);

	vec3 color = texture2D(tColors, colorUV).rgb;
	vec3 colorShadow = rgb2hsv(color);
	colorShadow.r -= 0.02;
	colorShadow.b *= 0.5;
	colorShadow = hsv2rgb(colorShadow);

	vec3 lightDir = normalize(uLightPosition - vWorldPosition);
	float shade = max(dot(worldNormal, lightDir), 0.0);
	float shadowCut = smoothstep(0.15, 0.45, shade);
	color = mix(colorShadow, color, shadowCut);

	float terrainDetail = texture2D(tNoiseTerrain, wPos.xz * 0.12).r;
	color *= 0.92 + terrainDetail * 0.08;

	gl_FragColor = vec4(color, 1.0);
}
`;function y(e,n,i,o=new t(10,16,6)){return n.wrapS=a,n.wrapT=a,i.wrapS=a,i.wrapT=a,new r({name:`GameplayTerrain`,uniforms:{tColors:{value:e},tNoiseTerrain:{value:n},tNoise:{value:i},uLightPosition:{value:o.clone()}},vertexShader:_,fragmentShader:v})}function b(e,t){e.uniforms.uLightPosition.value.copy(t)}var x=`
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vRand;

uniform float uTime;
uniform float uScale;

void main() {
	vUv = uv;
	vRand = fract(sin(dot(position.xyz, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
	vNormal = normalize(normalMatrix * normal);

	vec3 pos = position;
	float sway = sin(uTime * 0.75 + pos.x * 3.0 + pos.z * 2.0) * 0.04 * vRand;
	pos.x += sway;
	pos.z += sway * 0.5;

	vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
	vWorldPosition = worldPosition.xyz;
	gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,S=`
precision highp float;

uniform sampler2D tTrees;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uLightPosition;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vRand;

void main() {
	vec4 leaf = texture2D(tTrees, vUv);
	if (leaf.a < 0.35) discard;

	vec3 tint = mix(uColor1, uColor2, vRand);
	tint = mix(tint, uColor3, step(0.6, vRand));
	vec3 color = mix(tint, leaf.rgb, 0.65);

	vec3 lightDir = normalize(uLightPosition - vWorldPosition);
	float shade = max(dot(normalize(vNormal), lightDir), 0.0);
	color *= 0.55 + shade * 0.45;

	gl_FragColor = vec4(color, leaf.a);
}
`;function C(e,n=new t(10,16,6)){return e.wrapS=a,e.wrapT=a,new r({name:`TreeLeaves`,transparent:!0,side:2,depthWrite:!0,uniforms:{tTrees:{value:e},uColor1:{value:new i(`#5b9f7b`)},uColor2:{value:new i(`#649c75`)},uColor3:{value:new i(`#4e8c6d`)},uTime:{value:0},uScale:{value:.28},uLightPosition:{value:n.clone()}},vertexShader:x,fragmentShader:S})}function w(e,t){e.uniforms.uTime.value=t}function T(e,t){e.uniforms.uLightPosition.value.copy(t)}export{b as a,h as c,y as i,m as l,T as n,p as o,w as r,g as s,C as t};