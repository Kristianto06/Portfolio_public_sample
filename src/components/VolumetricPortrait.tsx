import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function VolumetricPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth || 400;
    const height = container.offsetHeight || 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 650;

    // Create canvas texture from text
    const canvas = document.createElement('canvas');
    canvas.width = 140;
    canvas.height = 30;
    const ctx2d = canvas.getContext('2d')!;
    ctx2d.fillStyle = 'white';
    ctx2d.font = 'bold 20px Inter, sans-serif';
    ctx2d.fillText('FITRIANAH', 0, 20);
    const texture = new THREE.CanvasTexture(canvas);

    // Instanced mesh
    const instanceCount = 2500;
    const planeGeom = new THREE.PlaneGeometry(30, 6);
    const planeMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const instancedMesh = new THREE.InstancedMesh(planeGeom, planeMat, instanceCount);
    const dummy = new THREE.Object3D();
    const color1 = new THREE.Color('#F2EDE7');
    const color2 = new THREE.Color('#F5B304');

    for (let i = 0; i < instanceCount; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 200;
      const z = -100 + (i / instanceCount) * 300;
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
      instancedMesh.setColorAt(i, i % 2 === 0 ? color1 : color2);
    }

    const group = new THREE.Group();
    group.add(instancedMesh);
    scene.add(group);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      group.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = container.offsetWidth || 400;
      const h = container.offsetHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      planeGeom.dispose();
      planeMat.dispose();
      texture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
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
