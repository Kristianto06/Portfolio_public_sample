import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const glassVertexShader = `
varying vec3 vPosition;
varying vec3 vNormal;
void main() {
  vNormal = normal;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const glassFragmentShader = `
uniform float uTime;
uniform float uHover;
uniform float uIndex;
varying vec3 vPosition;
varying vec3 vNormal;

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return fract(sin(dot(i, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

vec3 glassGradient(vec3 pos, float time) {
  float n1 = noise(pos * 1.5 + time * 0.2);
  float n2 = noise(pos * 3.0 - time * 0.3);
  float n3 = noise(pos * 6.0 + time * 0.1) * 0.2;
  float combined = n1 * 0.5 + n2 * 0.3 + n3;
  vec3 color1 = vec3(0.96, 0.70, 0.02);
  vec3 color2 = vec3(0.23, 0.23, 0.23);
  vec3 color3 = vec3(0.95, 0.93, 0.97);
  vec3 finalColor = mix(mix(color1, color2, combined), color3, n3);
  return finalColor * (0.8 + 0.2 * sin(time + pos.x));
}

void main() {
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
  vec3 baseColor = vec3(0.0);
  baseColor += glassGradient(vPosition, uTime) * fresnel * (1.0 + sin(uTime * 0.5) * 0.2);
  vec3 refractionColor = vec3(0.0);
  vec3 refracted1 = refract(-viewDirection, vNormal, 0.95);
  refractionColor += glassGradient(vPosition + refracted1 * 2.0, uTime) * fresnel * 0.5;
  vec3 refracted2 = refract(-viewDirection, vNormal, 0.8);
  refractionColor += glassGradient(vPosition + refracted2 * 3.0, uTime) * fresnel * 0.8;
  baseColor += refractionColor;
  float spec = pow(max(dot(reflect(-viewDirection, vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 32.0);
  baseColor += vec3(1.0, 1.0, 1.0) * spec * fresnel * (0.5 + uHover * 0.5);
  vec4 finalColor = vec4(baseColor, fresnel * 0.9 + 0.1);
  if (uHover > 0.0) {
    vec3 glowColor = vec3(0.96, 0.70, 0.02);
    float glowStrength = uHover * fresnel * 2.0;
    finalColor.rgb += glowColor * glowStrength;
    finalColor.a += uHover * 0.2;
  }
  gl_FragColor = finalColor;
}
`;

const edgeVertexShader = `
varying vec3 vPosition;
varying vec3 vNormal;
void main() {
  vNormal = normal;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const edgeFragmentShader = `
uniform float uTime;
uniform float uHover;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float edge = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);
  vec3 edgeColor = vec3(0.96, 0.70, 0.02);
  float alpha = edge * (0.6 + 0.4 * sin(uTime * 2.0));
  vec4 finalColor = vec4(edgeColor, alpha);
  if (uHover > 0.0) {
    finalColor.rgb += vec3(0.2) * uHover;
    finalColor.a += uHover * 0.3;
  }
  gl_FragColor = finalColor;
}
`;

export default function KineticMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth || window.innerWidth - 280;
    const height = container.offsetHeight || window.innerHeight;
    const isMobile = window.innerWidth < 1024;
    const gridCols = isMobile ? 4 : 6;
    const gridRows = isMobile ? 3 : 4;
    const totalCards = gridRows * gridCols;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 400;

    // Materials
    const glassMaterials: THREE.ShaderMaterial[] = [];
    const edgeMaterials: THREE.ShaderMaterial[] = [];
    const glassMeshes: THREE.Group[] = [];
    const pointLights: THREE.PointLight[] = [];

    const cardW = 60;
    const cardH = 80;
    const spacingX = 90;
    const spacingY = 110;
    const startX = -((gridCols - 1) * spacingX) / 2;
    const startY = ((gridRows - 1) * spacingY) / 2;

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const idx = row * gridCols + col;
        const group = new THREE.Group();

        const glassMat = new THREE.ShaderMaterial({
          vertexShader: glassVertexShader,
          fragmentShader: glassFragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uHover: { value: 0 },
            uIndex: { value: idx },
          },
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        const edgeMat = new THREE.ShaderMaterial({
          vertexShader: edgeVertexShader,
          fragmentShader: edgeFragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uHover: { value: 0 },
          },
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        const geom = new THREE.PlaneGeometry(cardW, cardH);
        const glassMesh = new THREE.Mesh(geom, glassMat);
        const edgeMesh = new THREE.Mesh(new THREE.PlaneGeometry(cardW + 2, cardH + 2), edgeMat);
        edgeMesh.position.z = -0.5;

        group.add(edgeMesh);
        group.add(glassMesh);

        group.position.x = startX + col * spacingX;
        group.position.y = startY - row * spacingY;

        scene.add(group);
        glassMaterials.push(glassMat);
        edgeMaterials.push(edgeMat);
        glassMeshes.push(group);
      }
    }

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Point lights
    for (let i = 0; i < 3; i++) {
      const pl = new THREE.PointLight(0xf5b304, 0.5, 600);
      pl.position.set(
        (i - 1) * 200,
        (i % 2 === 0 ? 1 : -1) * 150,
        200
      );
      scene.add(pl);
      pointLights.push(pl);
    }

    // GSAP Animation Timeline
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(glassMaterials.map(m => m.uniforms.uHover), {
      value: 1,
      duration: 0.3,
      ease: 'power2.out',
      stagger: { each: 0.05 },
    }, 0);

    tl.to(glassMaterials, {
      opacity: 0.9,
      duration: 0.5,
      stagger: { each: 0.03, from: 'center', grid: [gridCols, gridRows] },
    }, 0);

    tl.to(glassMeshes, {
      rotationX: Math.PI,
      ease: 'power3.inOut',
      duration: 2,
      stagger: { each: 0.05, from: 'start', grid: [gridCols, gridRows] },
    }, 0.5);

    tl.to(edgeMaterials, {
      opacity: 0.8,
      duration: 1.5,
      stagger: { each: 0.03, from: 'center', grid: [gridCols, gridRows] },
    }, 0.5);

    tl.to(glassMaterials.map(m => m.uniforms.uHover), {
      value: 0,
      duration: 0.3,
      ease: 'power2.in',
      stagger: { each: 0.05 },
    }, 2);

    tl.to(glassMaterials, {
      opacity: 0.6,
      duration: 1.5,
      stagger: { each: 0.03, from: 'center', grid: [gridCols, gridRows] },
    }, 2);

    tl.to(edgeMaterials, {
      opacity: 0.3,
      duration: 1.5,
      stagger: { each: 0.03, from: 'center', grid: [gridCols, gridRows] },
    }, 2);

    // Pulse label
    tl.addLabel('pulse', 2.5);

    tl.fromTo(
      glassMaterials.map(m => m.uniforms.uHover),
      { value: 0 },
      {
        value: 0.5,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
        stagger: { each: 0.02, from: 'random' },
      },
      'pulse'
    );

    tl.fromTo(
      pointLights.map(l => ({ intensity: l.intensity })),
      { intensity: 0.5 },
      {
        intensity: 2,
        duration: 0.3,
        yoyo: true,
        repeat: 3,
        ease: 'sine.inOut',
        stagger: { each: 0.1, from: 'center' },
      },
      'pulse'
    );

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Update uniforms
      for (let i = 0; i < totalCards; i++) {
        glassMaterials[i].uniforms.uTime.value = elapsed;
        edgeMaterials[i].uniforms.uTime.value = elapsed;
      }

      // Subtle camera follow mouse
      camera.position.x += (mouse.x * 30 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 20 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const w = container.offsetWidth || window.innerWidth - 280;
      const h = container.offsetHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    cleanupRef.current = () => {
      cancelAnimationFrame(animId);
      tl.kill();
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      for (const mat of glassMaterials) mat.dispose();
      for (const mat of edgeMaterials) mat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
