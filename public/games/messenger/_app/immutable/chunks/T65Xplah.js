import{Nt as e,bt as t,d as n,pt as r}from"./KDm2vTix.js";var i=`
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vLightDirection;

uniform vec3 uLightPosition;

void main() {
	vUv = uv;
	vNormal = normalize(normalMatrix * normal);
	vec4 worldPosition = modelMatrix * vec4(position, 1.0);
	vWorldPosition = worldPosition.xyz;
	vLightDirection = uLightPosition - worldPosition.xyz;
	gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,a=`
precision highp float;

uniform sampler2D tAtlas;
uniform vec3 uLightPosition;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vLightDirection;

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

void main() {
	vec3 baseColor = texture2D(tAtlas, vUv).rgb;
	vec3 colorShadow = hsv2rgb(vec3(rgb2hsv(baseColor).xy, rgb2hsv(baseColor).z * 0.5));

	vec3 normal = normalize(vNormal);
	vec3 lightDir = normalize(vLightDirection);
	float shade = max(dot(normal, lightDir), 0.0);
	float shadow = 1.0 - step(0.4, shade);

	vec3 color = mix(baseColor, colorShadow, shadow * 0.85);
	gl_FragColor = vec4(color, 1.0);
}
`,o=`
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vDistance;

void main() {
	vUv = uv;
	vNormal = normalize(normalMatrix * normal);
	vec4 worldPosition = modelMatrix * vec4(position, 1.0);
	vWorldPosition = worldPosition.xyz;
	vDistance = length(position);
	gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,s=`
precision highp float;

uniform sampler2D tAtlas;
uniform sampler2D tNoise;
uniform float uTime;
uniform vec3 uLightPosition;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vDistance;

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

void main() {
	vec3 color = texture2D(tAtlas, vUv).rgb;
	vec2 noiseUv = vWorldPosition.xz * 0.07 + uTime * 0.05;
	float noise = texture2D(tNoise, noiseUv).r;

	float waves = fract(noise * 0.7 + vDistance * 3.0 + uTime * 0.1);
	waves *= 1.0 - step(0.7, vDistance);
	waves *= step(0.3, vDistance);
	waves = step(0.3, waves * noise);
	color = mix(color, vec3(1.0), waves * 0.35);

	vec3 colorShadow = hsv2rgb(vec3(rgb2hsv(color).xy, rgb2hsv(color).z * 0.5));
	vec3 lightDir = normalize(uLightPosition - vWorldPosition);
	float shade = max(dot(normalize(vNormal), lightDir), 0.0);
	color = mix(colorShadow, color, smoothstep(0.2, 0.55, shade));

	color += smoothstep(0.3, 0.0, step(0.2, vDistance - noise * 1.5)) * vec3(0.2, 0.8, 1.0) * 0.04;
	gl_FragColor = vec4(color, 0.92);
}
`,c=`
uniform sampler2D tNoise;
uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
	vUv = uv;
	vec3 pos = position;
	float noise = texture2D(tNoise, pos.xz * 0.07).r;
	pos += normalize(pos) * sin(noise * 180.0 + floor(uTime * 6.0) * 0.25) * 0.08;

	vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
	vWorldPosition = worldPosition.xyz;
	vNormal = normalize(normalMatrix * normal);
	gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,l=`
precision highp float;

uniform vec3 uColor;
uniform sampler2D tNoise;
uniform vec3 uLightPosition;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

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

void main() {
	vec3 color = uColor;
	float noise = texture2D(tNoise, vWorldPosition.xz * 0.07).g;

	vec3 colorShadow = hsv2rgb(vec3(rgb2hsv(color).xy, rgb2hsv(color).z * 0.5));
	vec3 lightDir = normalize(uLightPosition - vWorldPosition);
	float shade = max(dot(normalize(vNormal), lightDir), 0.0);
	color = mix(colorShadow, color, smoothstep(0.2, 0.55, shade));
	color = mix(color, vec3(1.0), noise * 0.08);

	gl_FragColor = vec4(color, 0.72);
}
`;function u(e){return e.wrapS=r,e.wrapT=r,e.needsUpdate=!0,e}function d(r,d,f=new e(10,16,6)){let p=u(d),m=f.clone();return{atlas:new t({uniforms:{tAtlas:{value:r},uLightPosition:{value:m}},vertexShader:i,fragmentShader:a}),water:new t({transparent:!0,uniforms:{tAtlas:{value:r},tNoise:{value:p},uTime:{value:0},uLightPosition:{value:m}},vertexShader:o,fragmentShader:s}),clouds:new t({transparent:!0,side:2,depthWrite:!1,uniforms:{uColor:{value:new n(`#f8f8f8`)},tNoise:{value:p},uTime:{value:0},uLightPosition:{value:m}},vertexShader:c,fragmentShader:l}),lightPosition:m}}function f(e,t){e.water.uniforms.uTime.value=t,e.clouds.uniforms.uTime.value=t}function p(e,t){e.lightPosition.copy(t),e.atlas.uniforms.uLightPosition.value.copy(t),e.water.uniforms.uLightPosition.value.copy(t),e.clouds.uniforms.uLightPosition.value.copy(t)}export{p as n,f as r,d as t};