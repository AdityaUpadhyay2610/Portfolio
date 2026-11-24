import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useScroll";

export default function Workstation3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 400;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 5.2);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffecd2, 2.0);
    dirLight.position.set(3, 6, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const warmPointLight = new THREE.PointLight(0xffa726, 1.8, 8);
    warmPointLight.position.set(-1.8, 2.2, 0.5);
    scene.add(warmPointLight);

    // 3. Root Group for Rotation & Mouse Tilt
    const workstationGroup = new THREE.Group();
    scene.add(workstationGroup);

    // --- MATERIALS ---
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x221d17,
      roughness: 0.6,
      metalness: 0.1,
    });
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0xd4a373,
      roughness: 0.7,
      metalness: 0.05,
    });
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x2b2d42,
      roughness: 0.3,
      metalness: 0.8,
    });
    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xdcdcdc,
      roughness: 0.2,
      metalness: 0.9,
    });
    const plantPotMat = new THREE.MeshStandardMaterial({
      color: 0xf4f1de,
      roughness: 0.4,
    });
    const plantLeafMat = new THREE.MeshStandardMaterial({
      color: 0x386641,
      roughness: 0.5,
    });

    // Screen Texture Canvas (Generates a clean dark code IDE preview)
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 512;
    screenCanvas.height = 320;
    const ctx = screenCanvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#161822";
      ctx.fillRect(0, 0, 512, 320);

      // Top bar dots
      ctx.fillStyle = "#ef4444";
      ctx.beginPath(); ctx.arc(20, 16, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#eab308";
      ctx.beginPath(); ctx.arc(36, 16, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#22c55e";
      ctx.beginPath(); ctx.arc(52, 16, 5, 0, Math.PI * 2); ctx.fill();

      // Fake code lines
      ctx.fillStyle = "#e8a33d";
      ctx.font = "bold 15px monospace";
      ctx.fillText("const engineer = 'Aditya Upadhyay';", 25, 55);

      ctx.fillStyle = "#60a5fa";
      ctx.font = "14px monospace";
      ctx.fillText("import { MERN } from '@core';", 25, 85);
      ctx.fillText("const stack = ['React', 'Node', 'Mongo'];", 25, 110);

      ctx.fillStyle = "#4ade80";
      ctx.fillText("export async function buildFuture() {", 25, 150);
      ctx.fillText("  await deploy({ scale: 'infinite' });", 25, 175);
      ctx.fillText("  return 'Fast, reliable, human';", 25, 200);
      ctx.fillText("}", 25, 225);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "12px monospace";
      ctx.fillText("// Status: Available for full-time / internship", 25, 270);
      ctx.fillStyle = "#e8a33d";
      ctx.fillRect(25, 285, 120, 4);
    }
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });

    // --- 3D OBJECTS ---

    // A. Desk Surface
    const deskGeo = new THREE.BoxGeometry(4.8, 0.1, 2.5);
    const deskMesh = new THREE.Mesh(deskGeo, deskMat);
    deskMesh.position.set(0, -0.05, 0);
    deskMesh.receiveShadow = true;
    workstationGroup.add(deskMesh);

    // B. Wooden Desk Shelf / Riser
    const shelfGeo = new THREE.BoxGeometry(3.0, 0.08, 0.9);
    const shelfMesh = new THREE.Mesh(shelfGeo, woodMat);
    shelfMesh.position.set(0, 0.32, -0.4);
    shelfMesh.castShadow = true;
    shelfMesh.receiveShadow = true;
    workstationGroup.add(shelfMesh);

    // Shelf Legs
    const shelfLegGeo = new THREE.BoxGeometry(0.08, 0.32, 0.8);
    const legLeft = new THREE.Mesh(shelfLegGeo, metalMat);
    legLeft.position.set(-1.4, 0.16, -0.4);
    legLeft.castShadow = true;
    workstationGroup.add(legLeft);

    const legRight = legLeft.clone();
    legRight.position.x = 1.4;
    workstationGroup.add(legRight);

    // C. Main Ultra-wide Monitor
    // Stand base
    const standBaseGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.04, 32);
    const standBase = new THREE.Mesh(standBaseGeo, silverMat);
    standBase.position.set(0, 0.38, -0.4);
    standBase.castShadow = true;
    workstationGroup.add(standBase);

    // Stand neck
    const standNeckGeo = new THREE.BoxGeometry(0.08, 0.8, 0.08);
    const standNeck = new THREE.Mesh(standNeckGeo, silverMat);
    standNeck.position.set(0, 0.76, -0.45);
    standNeck.rotation.x = 0.1;
    standNeck.castShadow = true;
    workstationGroup.add(standNeck);

    // Monitor Bezel & Frame
    const monitorFrameGeo = new THREE.BoxGeometry(2.4, 1.45, 0.08);
    const monitorFrame = new THREE.Mesh(monitorFrameGeo, metalMat);
    monitorFrame.position.set(0, 1.25, -0.4);
    monitorFrame.castShadow = true;
    workstationGroup.add(monitorFrame);

    // Monitor Screen with texture
    const screenGeo = new THREE.PlaneGeometry(2.32, 1.37);
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 1.25, -0.35);
    workstationGroup.add(screen);

    // D. Minimalist Slim Keyboard
    const kbGeo = new THREE.BoxGeometry(1.2, 0.03, 0.4);
    const keyboard = new THREE.Mesh(kbGeo, silverMat);
    keyboard.position.set(-0.1, 0.02, 0.4);
    keyboard.rotation.y = 0.02;
    keyboard.castShadow = true;
    workstationGroup.add(keyboard);

    // Trackpad / Mouse
    const mousePadGeo = new THREE.BoxGeometry(0.35, 0.02, 0.35);
    const trackpad = new THREE.Mesh(mousePadGeo, silverMat);
    trackpad.position.set(0.85, 0.015, 0.4);
    trackpad.castShadow = true;
    workstationGroup.add(trackpad);

    // E. Desk Plant (Pot + Leaves)
    const potGeo = new THREE.CylinderGeometry(0.18, 0.12, 0.3, 16);
    const plantPot = new THREE.Mesh(potGeo, plantPotMat);
    plantPot.position.set(1.15, 0.51, -0.4);
    plantPot.castShadow = true;
    workstationGroup.add(plantPot);

    // Succulent leaves
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const leafGeo = new THREE.ConeGeometry(0.09, 0.28, 5);
      const leaf = new THREE.Mesh(leafGeo, plantLeafMat);
      leaf.position.set(
        1.15 + Math.cos(angle) * 0.08,
        0.72,
        -0.4 + Math.sin(angle) * 0.08
      );
      leaf.rotation.x = Math.sin(angle) * 0.5;
      leaf.rotation.z = -Math.cos(angle) * 0.5;
      workstationGroup.add(leaf);
    }

    // F. Modern Desk Lamp (Left)
    const lampBaseGeo = new THREE.CylinderGeometry(0.2, 0.22, 0.05, 24);
    const lampBase = new THREE.Mesh(lampBaseGeo, metalMat);
    lampBase.position.set(-1.8, 0.03, 0.2);
    workstationGroup.add(lampBase);

    // Lamp Arm
    const lampArmGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.4);
    const lampArm = new THREE.Mesh(lampArmGeo, silverMat);
    lampArm.position.set(-1.8, 0.7, 0.2);
    lampArm.rotation.z = -0.15;
    workstationGroup.add(lampArm);

    // Lamp Shade
    const lampShadeGeo = new THREE.ConeGeometry(0.22, 0.3, 24);
    const lampShade = new THREE.Mesh(lampShadeGeo, metalMat);
    lampShade.position.set(-1.62, 1.35, 0.2);
    lampShade.rotation.z = 0.8;
    workstationGroup.add(lampShade);

    // Lamp Glow Bulb
    const bulbGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffd166 });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.set(-1.58, 1.3, 0.2);
    workstationGroup.add(bulb);

    // 4. Mouse Move Interaction
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      target.x = x * 0.4;
      target.y = y * 0.2;
    };

    container.addEventListener("mousemove", onMouseMove, { passive: true });

    // 5. Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // 6. Animation
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;

      // Subtle slow auto rotation around Y + tilt based on mouse
      if (!reducedMotion) {
        workstationGroup.rotation.y = Math.sin(elapsed * 0.3) * 0.12 + mouse.x;
        workstationGroup.rotation.x = 0.08 - mouse.y * 0.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-[360px] md:h-[440px] rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--surface-2)]/60 to-[var(--surface)]/90 border border-[var(--border)] shadow-2xl flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      
      <div className="absolute bottom-4 left-6 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg)]/80 backdrop-blur-md border border-[var(--border)]">
        <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
        <span className="font-mono text-[11px] text-[var(--text-muted)]">
          Interactive Workstation 3D • Move cursor to inspect
        </span>
      </div>
    </div>
  );
}
