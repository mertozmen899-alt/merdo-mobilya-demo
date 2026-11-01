"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { polyhaven } from "@/data/showcase";
import { cx } from "@/lib/utils";

interface Props {
  modelId: string;
  /** Kullanıcı sürükleyerek çevirebilir mi */
  interactive?: boolean;
  /** Animasyon çalışsın mı (ör. slayt aktif değilken durur) */
  active?: boolean;
  tone?: "dark" | "light";
  className?: string;
  onState?: (s: "loading" | "ready" | "error") => void;
}

/**
 * 3D döner tabla: ürün kendi etrafında yavaşça döner, stüdyo ışığı ve yumuşak gölgeyle gösterilir.
 * Görünür değilken çizim durur (pil ve performans için).
 */
export default function Turntable({ modelId, interactive, active = true, tone = "dark", className, onState }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => { activeRef.current = active; }, [active]);
  const onStateRef = useRef(onState);
  useEffect(() => { onStateRef.current = onState; });
  useEffect(() => { onStateRef.current?.(state); }, [state]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    setState("loading"); setProgress(0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch { setState("error"); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = tone === "dark" ? 1.05 : 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = tone === "dark" ? 0.55 : 0.8;

    const camera = new THREE.PerspectiveCamera(28, 1, 0.05, 50);

    // Işıklar: ana ışık (gölgeli), dolgu ve arka kontur
    const key = new THREE.DirectionalLight(0xfff1e0, tone === "dark" ? 2.6 : 2.0);
    key.position.set(2.5, 4.5, 3);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 0.5; key.shadow.camera.far = 15;
    Object.assign(key.shadow.camera, { left: -2.5, right: 2.5, top: 2.5, bottom: -2.5 });
    key.shadow.radius = 6; key.shadow.bias = -0.0004;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xd8e4ff, tone === "dark" ? 1.6 : 0.8);
    rim.position.set(-3, 2.5, -3);
    scene.add(rim);
    scene.add(new THREE.HemisphereLight(0xfff6ea, 0x3a2e26, tone === "dark" ? 0.35 : 0.6));

    // Zemin: sadece gölgeyi alır
    const ground = new THREE.Mesh(new THREE.CircleGeometry(4, 64), new THREE.ShadowMaterial({ opacity: tone === "dark" ? 0.45 : 0.22 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const pivot = new THREE.Group();
    scene.add(pivot);

    let controls: OrbitControls | null = null;
    if (interactive) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false; controls.enablePan = false;
      controls.enableDamping = true; controls.dampingFactor = 0.06;
      controls.minPolarAngle = Math.PI * 0.22; controls.maxPolarAngle = Math.PI * 0.49;
      controls.rotateSpeed = 0.6;
      renderer.domElement.style.cursor = "grab";
      renderer.domElement.style.touchAction = "pan-y";
    }

    // Kamerayı modele göre konumla
    let radius = 4, target = new THREE.Vector3(0, 0.5, 0);
    const frame = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Dar ekranda biraz daha uzaktan bak
      const fit = camera.aspect < 0.8 ? 1.45 : camera.aspect < 1.2 ? 1.15 : 1;
      camera.position.set(0, target.y + radius * 0.32 * fit, radius * fit);
      camera.lookAt(target);
      camera.updateProjectionMatrix();
      if (controls) { controls.target.copy(target); controls.update(); }
    };

    // Modeli yükle (Poly Haven, CC0)
    const ph = polyhaven(modelId, window.innerWidth > 900 ? "2k" : "1k");
    const manager = new THREE.LoadingManager();
    manager.setURLModifier((u) => (u.startsWith("data:") || u.startsWith("blob:") ? u : ph.resolve(u)));
    manager.onProgress = (_u, loaded, total) => setProgress(Math.round((loaded / Math.max(total, 1)) * 100));
    let disposed = false;
    new GLTFLoader(manager).load(
      ph.gltf,
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;
        model.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; }
        });
        // Ölçekle, ortala, zemine oturt
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const s = 1.2 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(s);
        box.setFromObject(model);
        const c = box.getCenter(new THREE.Vector3());
        model.position.set(-c.x, -box.min.y, -c.z);
        pivot.add(model);
        const h = box.max.y - box.min.y;
        target = new THREE.Vector3(0, h * 0.45, 0);
        radius = 3.9;
        frame();
        setState("ready");
      },
      undefined,
      () => { if (!disposed) setState("error"); },
    );

    const ro = new ResizeObserver(frame);
    ro.observe(el);
    frame();

    // Ekranda görünür mü
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; });
    io.observe(el);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let raf = 0, t = 0, userTouched = 0;
    if (controls) controls.addEventListener("start", () => { userTouched = performance.now(); renderer.domElement.style.cursor = "grabbing"; });
    if (controls) controls.addEventListener("end", () => { renderer.domElement.style.cursor = "grab"; });

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!onScreen || !activeRef.current || document.hidden) return;
      t += dt;
      // Kullanıcı çevirdiyse 2.5 sn bekleyip yavaşça kendi dönmeye devam et
      const idle = performance.now() - userTouched > 2500;
      if (idle) pivot.rotation.y += dt * (reduce ? 0.12 : 0.32);
      // Sinematik his: kamera çok hafif yükselip alçalır
      if (!controls) {
        camera.position.y = target.y + radius * 0.32 + Math.sin(t * 0.35) * 0.08;
        camera.lookAt(target);
      }
      controls?.update();
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      controls?.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.geometry?.dispose();
          const mats = Array.isArray(m.material) ? m.material : [m.material];
          mats.forEach((mat) => {
            Object.values(mat as unknown as Record<string, unknown>).forEach((v) => { if (v instanceof THREE.Texture) v.dispose(); });
            mat.dispose();
          });
        }
      });
      env.dispose(); pmrem.dispose(); renderer.dispose();
      renderer.domElement.remove();
    };
  }, [modelId, interactive, tone]);

  return (
    <div ref={host} className={cx("absolute inset-0", className)} aria-hidden={!interactive}>
      {state === "loading" && (
        <div className={cx("pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em]", tone === "dark" ? "text-paper/70" : "text-mute")}>
          <span>3D model yükleniyor</span>
          <span className="h-px w-32 overflow-hidden bg-current/20"><span className="block h-px bg-current transition-all" style={{ width: `${progress}%` }} /></span>
        </div>
      )}
    </div>
  );
}
