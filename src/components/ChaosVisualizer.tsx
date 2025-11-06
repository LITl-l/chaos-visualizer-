import { onMount, onCleanup, createEffect } from 'solid-js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  generateAttractorTrail,
  type AttractorParams,
  type Point3D,
} from '../chaos/attractors';

interface ChaosVisualizerProps {
  attractorType: 'lorenz' | 'rossler';
  params: AttractorParams;
  numPoints: number;
  showAxes: boolean;
  trailColor: string;
}

export default function ChaosVisualizer(props: ChaosVisualizerProps) {
  let containerRef: HTMLDivElement | undefined;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let controls: OrbitControls;
  let trailLine: THREE.Line;
  let animationId: number;
  let axesHelper: THREE.AxesHelper;

  const initScene = () => {
    if (!containerRef) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    // Camera setup
    const width = containerRef.clientWidth;
    const height = containerRef.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    // Position camera based on attractor type
    if (props.attractorType === 'lorenz') {
      camera.position.set(50, 30, 50);
    } else {
      camera.position.set(20, 20, 20);
    }

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.appendChild(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Axes helper
    axesHelper = new THREE.AxesHelper(30);
    if (props.showAxes) {
      scene.add(axesHelper);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    // Initialize trail
    updateTrail();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef) return;
      const width = containerRef.clientWidth;
      const height = containerRef.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    onCleanup(() => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (containerRef) {
        containerRef.removeChild(renderer.domElement);
      }
    });
  };

  const updateTrail = () => {
    // Remove existing trail
    if (trailLine) {
      scene.remove(trailLine);
      trailLine.geometry.dispose();
      (trailLine.material as THREE.Material).dispose();
    }

    // Generate new trail points
    const initialPoint: Point3D =
      props.attractorType === 'lorenz'
        ? { x: 0.1, y: 0, z: 0 }
        : { x: 1, y: 1, z: 1 };

    const points = generateAttractorTrail(
      props.attractorType,
      props.params,
      initialPoint,
      props.numPoints
    );

    // Create geometry from points
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(points.length * 3);
    const colors = new Float32Array(points.length * 3);

    const color = new THREE.Color(props.trailColor);

    points.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;

      // Create gradient effect along the trail
      const t = i / points.length;
      const gradientColor = color.clone().lerp(new THREE.Color(0x000000), 1 - t);
      colors[i * 3] = gradientColor.r;
      colors[i * 3 + 1] = gradientColor.g;
      colors[i * 3 + 2] = gradientColor.b;
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create material and line
    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      linewidth: 2,
    });

    trailLine = new THREE.Line(geometry, material);
    scene.add(trailLine);
  };

  const updateAxes = () => {
    if (props.showAxes && !scene.children.includes(axesHelper)) {
      scene.add(axesHelper);
    } else if (!props.showAxes && scene.children.includes(axesHelper)) {
      scene.remove(axesHelper);
    }
  };

  onMount(() => {
    initScene();
  });

  // Update trail when parameters change
  createEffect(() => {
    if (scene) {
      // Access reactive props to track changes
      props.attractorType;
      props.params;
      props.numPoints;
      props.trailColor;

      updateTrail();
    }
  });

  // Update axes visibility
  createEffect(() => {
    if (scene) {
      props.showAxes;
      updateAxes();
    }
  });

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    />
  );
}
