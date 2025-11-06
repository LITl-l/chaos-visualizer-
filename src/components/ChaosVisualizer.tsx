import { Component, onMount, onCleanup, createEffect } from 'solid-js';
import * as THREE from 'three';

interface ChaosVisualizerProps {
  sigma: number;
  rho: number;
  beta: number;
  speed: number;
  particleCount: number;
  showTrail: boolean;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  points: THREE.Points;
  line?: THREE.Line;
  positions: number[];
  maxPoints: number;
}

const ChaosVisualizer: Component<ChaosVisualizerProps> = (props) => {
  let containerRef: HTMLDivElement | undefined;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let particles: Particle[] = [];
  let animationId: number;

  const initThreeJS = () => {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000510);
    scene.fog = new THREE.Fog(0x000510, 50, 200);

    // Camera setup
    camera = new THREE.PerspectiveCamera(
      75,
      containerRef!.clientWidth / containerRef!.clientHeight,
      0.1,
      1000
    );
    camera.position.set(50, 30, 50);
    camera.lookAt(0, 25, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef!.clientWidth, containerRef!.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef!.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Add point lights
    const pointLight1 = new THREE.PointLight(0x4040ff, 1, 200);
    pointLight1.position.set(30, 30, 30);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff4040, 1, 200);
    pointLight2.position.set(-30, 30, -30);
    scene.add(pointLight2);

    // Add grid helper for reference
    const gridHelper = new THREE.GridHelper(100, 20, 0x444444, 0x222222);
    scene.add(gridHelper);

    // Handle window resize
    const handleResize = () => {
      if (!containerRef) return;
      camera.aspect = containerRef.clientWidth / containerRef.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.clientWidth, containerRef.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Mouse interaction for camera rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const rotationSpeed = 0.005;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      const radius = Math.sqrt(
        camera.position.x ** 2 + camera.position.z ** 2
      );

      const angle = Math.atan2(camera.position.z, camera.position.x);
      const newAngle = angle - deltaX * rotationSpeed;

      camera.position.x = radius * Math.cos(newAngle);
      camera.position.z = radius * Math.sin(newAngle);

      camera.position.y += deltaY * 0.1;
      camera.lookAt(0, 25, 0);

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    containerRef!.addEventListener('mousedown', handleMouseDown);
    containerRef!.addEventListener('mousemove', handleMouseMove);
    containerRef!.addEventListener('mouseup', handleMouseUp);
    containerRef!.addEventListener('mouseleave', handleMouseUp);

    // Cleanup function
    onCleanup(() => {
      window.removeEventListener('resize', handleResize);
      containerRef?.removeEventListener('mousedown', handleMouseDown);
      containerRef?.removeEventListener('mousemove', handleMouseMove);
      containerRef?.removeEventListener('mouseup', handleMouseUp);
      containerRef?.removeEventListener('mouseleave', handleMouseUp);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    });
  };

  const initParticles = () => {
    // Clear existing particles
    particles.forEach(particle => {
      scene.remove(particle.points);
      if (particle.line) scene.remove(particle.line);
    });
    particles = [];

    const colors = [
      0x00ffff, // cyan
      0xff00ff, // magenta
      0xffff00, // yellow
      0x00ff00, // green
      0xff0000, // red
      0x0000ff, // blue
      0xff8800, // orange
      0x8800ff, // purple
      0x00ff88, // spring green
      0xff0088, // rose
    ];

    for (let i = 0; i < props.particleCount; i++) {
      // Random initial position with slight variation
      const offset = i * 0.1;
      const particle: Particle = {
        x: 0.1 + offset,
        y: 0 + offset,
        z: 0 + offset,
        positions: [],
        maxPoints: 3000,
        points: new THREE.Points(),
      };

      // Create point geometry
      const geometry = new THREE.BufferGeometry();
      const material = new THREE.PointsMaterial({
        color: colors[i % colors.length],
        size: 0.5,
        transparent: true,
        opacity: 0.8,
      });

      particle.points = new THREE.Points(geometry, material);
      scene.add(particle.points);

      particles.push(particle);
    }
  };

  const lorenzStep = (particle: Particle, dt: number) => {
    const { x, y, z } = particle;
    const { sigma, rho, beta } = props;

    // Lorenz equations
    const dx = sigma * (y - x);
    const dy = x * (rho - z) - y;
    const dz = x * y - beta * z;

    particle.x += dx * dt;
    particle.y += dy * dt;
    particle.z += dz * dt;

    // Add to trail
    particle.positions.push(particle.x, particle.y, particle.z);

    // Limit trail length
    if (particle.positions.length > particle.maxPoints * 3) {
      particle.positions.splice(0, 3);
    }

    // Update point geometry
    const geometry = particle.points.geometry as THREE.BufferGeometry;
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(particle.positions, 3)
    );
    geometry.computeBoundingSphere();

    // Update or create line for trail
    if (props.showTrail && particle.positions.length > 6) {
      if (particle.line) {
        scene.remove(particle.line);
      }

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(particle.positions, 3)
      );

      const material = particle.points.material as THREE.PointsMaterial;
      const lineMaterial = new THREE.LineBasicMaterial({
        color: material.color,
        transparent: true,
        opacity: 0.3,
      });

      particle.line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(particle.line);
    } else if (!props.showTrail && particle.line) {
      scene.remove(particle.line);
      particle.line = undefined;
    }
  };

  const animate = () => {
    animationId = requestAnimationFrame(animate);

    // Update each particle
    particles.forEach(particle => {
      lorenzStep(particle, props.speed);
    });

    // Slow camera rotation
    const time = Date.now() * 0.0001;
    camera.position.x = Math.cos(time) * 60;
    camera.position.z = Math.sin(time) * 60;
    camera.lookAt(0, 25, 0);

    renderer.render(scene, camera);
  };

  onMount(() => {
    initThreeJS();
    initParticles();
    animate();
  });

  // React to particle count changes
  createEffect(() => {
    if (scene) {
      initParticles();
    }
  });

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        cursor: 'grab',
      }}
    />
  );
};

export default ChaosVisualizer;
