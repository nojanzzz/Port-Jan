import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const tags = [
  "⚙️ Mechanical",
  "⚡ Electrical",
  "📡 IoT",
  "📟 Embedded",
  "🤖 Robotics",
  "💻 Software",
  "🔩 Hardware",
  "🧊 3D Design",
];

/* ─── helpers ───────────────────────────────── */
function buildGear(teeth, innerR, outerR, toothW = 0.45, depth = 0.26) {
  const shape = new THREE.Shape();
  const total = teeth * 2;
  for (let i = 0; i < total; i++) {
    const a0 = (i / total) * Math.PI * 2;
    const a1 = ((i + toothW) / total) * Math.PI * 2;
    const a2 = ((i + toothW + 0.05) / total) * Math.PI * 2;
    const a3 = ((i + 1) / total) * Math.PI * 2;
    const rA = i % 2 === 0 ? outerR : innerR;
    const rB = i % 2 === 0 ? innerR : outerR;
    const fn = i === 0 ? "moveTo" : "lineTo";
    shape[fn](Math.cos(a0) * rA, Math.sin(a0) * rA);
    shape.lineTo(Math.cos(a1) * rA, Math.sin(a1) * rA);
    shape.lineTo(Math.cos(a2) * rB, Math.sin(a2) * rB);
    shape.lineTo(Math.cos(a3) * rB, Math.sin(a3) * rB);
  }
  shape.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR * 0.42, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.022,
    bevelSize: 0.016,
    bevelSegments: 3,
  });
}
function buildHub(r, depth) {
  return new THREE.CylinderGeometry(r, r, depth + 0.07, 32);
}

function makeRenderer(mount) {
  const W = mount.clientWidth,
    H = mount.clientHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);
  return { renderer, W, H };
}
function makeControls(camera, domElement) {
  const c = new OrbitControls(camera, domElement);
  c.enableDamping = true;
  c.dampingFactor = 0.07;
  c.enableZoom = true;
  c.zoomSpeed = 0.5;
  c.autoRotate = true;
  c.autoRotateSpeed = 0.5;
  c.addEventListener("start", () => {
    c.autoRotate = false;
  });
  return c;
}
function standardLights(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.18));
  const d1 = new THREE.DirectionalLight(0x00f5ff, 2.0);
  d1.position.set(5, 7, 6);
  scene.add(d1);
  const d2 = new THREE.DirectionalLight(0xbf00ff, 1.4);
  d2.position.set(-5, -4, -3);
  scene.add(d2);
  const d3 = new THREE.DirectionalLight(0x00ff88, 0.5);
  d3.position.set(0, -5, 4);
  scene.add(d3);
}
function particles(scene, n, spread, color) {
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread;
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
    pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      color,
      size: 0.022,
      transparent: true,
      opacity: 0.38,
    }),
  );
  scene.add(pts);
  return pts;
}
function cleanup(frameId, controls, onResize, renderer, mount) {
  return () => {
    cancelAnimationFrame(frameId);
    controls.dispose();
    window.removeEventListener("resize", onResize);
    renderer.dispose();
    if (mount.contains(renderer.domElement))
      mount.removeChild(renderer.domElement);
  };
}

/* ═══════════════════════════════════════════════
   SCENE 1 — Gear Mechanism
═══════════════════════════════════════════════ */
function initGearScene(mount) {
  const { renderer, W, H } = makeRenderer(mount);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
  camera.position.set(0, 0.1, 5.0);
  const controls = makeControls(camera, renderer.domElement);
  controls.minDistance = 3.0;
  controls.maxDistance = 10;
  standardLights(scene);

  const matC = new THREE.MeshStandardMaterial({
    color: 0x003344,
    emissive: 0x00b8cc,
    emissiveIntensity: 0.42,
    metalness: 0.92,
    roughness: 0.2,
  });
  const matP = new THREE.MeshStandardMaterial({
    color: 0x1a0033,
    emissive: 0x9900dd,
    emissiveIntensity: 0.48,
    metalness: 0.92,
    roughness: 0.18,
  });
  const matA = new THREE.MeshStandardMaterial({
    color: 0x002233,
    emissive: 0x004466,
    emissiveIntensity: 0.55,
    metalness: 0.95,
    roughness: 0.12,
  });
  const group = new THREE.Group();
  scene.add(group);

  const mkGear = (teeth, iR, oR, mat, px, py, pz) => {
    const g = buildGear(teeth, iR, oR, 0.42, 0.28);
    g.center();
    const m = new THREE.Mesh(g, mat);
    m.position.set(px, py, pz);
    group.add(m);
    return m;
  };
  const mkHub = (r, d, pos) => {
    const h = new THREE.Mesh(buildHub(r, d), matA);
    h.rotation.x = Math.PI / 2;
    h.position.copy(pos);
    group.add(h);
  };

  const bigGear = mkGear(16, 0.84, 1.24, matC, -1.05, 0.1, 0);
  mkHub(0.33, 0.28, bigGear.position);
  const medR = 0.8,
    medGear = mkGear(
      10,
      0.54,
      medR,
      matP,
      bigGear.position.x + 1.24 + medR - 0.065,
      0.1,
      0,
    );
  mkHub(0.22, 0.25, medGear.position);
  const smR = 0.52,
    smGear = mkGear(
      6,
      0.35,
      smR,
      matC,
      medGear.position.x,
      medGear.position.y + medR + smR - 0.058,
      0.06,
    );
  mkHub(0.15, 0.22, smGear.position);
  const tyR = 0.62,
    tinyGear = mkGear(
      8,
      0.42,
      tyR,
      matP,
      bigGear.position.x - 0.08,
      bigGear.position.y - 1.24 - tyR + 0.056,
      -0.05,
    );
  mkHub(0.17, 0.2, tinyGear.position);

  const pts = particles(scene, 80, 6, 0x00f5ff);
  const bigSpeed = 0.3,
    medSpeed = -(16 / 10) * bigSpeed,
    smSpeed = -(10 / 6) * medSpeed,
    tinySpeed = -(16 / 8) * bigSpeed;
  let frameId;
  const clock = new THREE.Clock();
  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const dt = clock.getDelta(),
      t = clock.elapsedTime;
    bigGear.rotation.z += bigSpeed * dt;
    medGear.rotation.z += medSpeed * dt;
    smGear.rotation.z += smSpeed * dt;
    tinyGear.rotation.z += tinySpeed * dt;
    group.rotation.x = Math.sin(t * 0.18) * 0.1;
    group.rotation.y = Math.sin(t * 0.13) * 0.07;
    pts.rotation.y += 0.00012;
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
  const onResize = () => {
    const nw = mount.clientWidth,
      nh = mount.clientHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  };
  window.addEventListener("resize", onResize);
  return cleanup(frameId, controls, onResize, renderer, mount);
}

/* ═══════════════════════════════════════════════
   SCENE 2 — PCB Board
═══════════════════════════════════════════════ */
function initPCBScene(mount) {
  const { renderer, W, H } = makeRenderer(mount);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
  camera.position.set(0, 1.4, 5.5);
  camera.lookAt(0, 0, 0);
  const controls = makeControls(camera, renderer.domElement);
  controls.minDistance = 3;
  controls.maxDistance = 12;
  standardLights(scene);

  const group = new THREE.Group();
  scene.add(group);
  const boardMat = new THREE.MeshStandardMaterial({
    color: 0x001a0d,
    emissive: 0x002810,
    emissiveIntensity: 0.7,
    metalness: 0.3,
    roughness: 0.75,
  });
  const boardGeo = new THREE.BoxGeometry(5.8, 3.4, 0.13);
  group.add(new THREE.Mesh(boardGeo, boardMat));
  group.add(
    new THREE.LineSegments(
      new THREE.EdgesGeometry(boardGeo),
      new THREE.LineBasicMaterial({
        color: 0x00f5ff,
        transparent: true,
        opacity: 0.55,
      }),
    ),
  );

  const chipMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    emissive: 0x001122,
    emissiveIntensity: 0.5,
    metalness: 0.85,
    roughness: 0.25,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xccaa00,
    emissive: 0x886600,
    emissiveIntensity: 0.9,
    metalness: 1,
  });

  const addChips = (side) => {
    const zPos = side * 0.115;
    const pinZ = side * 0.09;
    const items =
      side === 1
        ? [
            { x: -1.7, y: 0.6, w: 1.0, h: 0.95, pins: 5 },
            { x: 0.2, y: 0.55, w: 1.2, h: 0.72, pins: 6 },
            { x: 1.7, y: -0.4, w: 0.75, h: 0.75, pins: 4 },
            { x: -0.5, y: -0.65, w: 0.65, h: 0.52, pins: 4 },
            { x: 1.85, y: 0.65, w: 0.52, h: 0.42, pins: 3 },
            { x: -1.9, y: -0.55, w: 0.52, h: 0.62, pins: 3 },
          ]
        : [
            { x: 1.5, y: 0.8, w: 0.8, h: 0.8, pins: 4 },
            { x: -0.8, y: -0.2, w: 1.4, h: 0.9, pins: 8 },
            { x: -2.2, y: 1.0, w: 0.6, h: 0.5, pins: 3 },
            { x: 0.5, y: -1.0, w: 0.9, h: 0.6, pins: 5 },
            { x: -1.2, y: -1.2, w: 0.4, h: 0.4, pins: 2 },
          ];
    items.forEach((c) => {
      const cg = new THREE.BoxGeometry(c.w, c.h, 0.09);
      const chip = new THREE.Mesh(cg, chipMat);
      chip.position.set(c.x, c.y, zPos);
      group.add(chip);
      const ce = new THREE.LineSegments(
        new THREE.EdgesGeometry(cg),
        new THREE.LineBasicMaterial({
          color: 0x00f5ff,
          transparent: true,
          opacity: 0.75,
        }),
      );
      ce.position.set(c.x, c.y, zPos);
      group.add(ce);
      for (let p = 0; p < c.pins; p++) {
        const pin = new THREE.Mesh(
          new THREE.BoxGeometry(0.07, 0.045, 0.04),
          goldMat,
        );
        pin.position.set(
          c.x - c.w / 2 - 0.05,
          c.y - c.h / 2 + (p + 0.5) * (c.h / c.pins),
          pinZ,
        );
        group.add(pin);
      }
    });
  };

  const trC = new THREE.LineBasicMaterial({
    color: 0x00f5ff,
    transparent: true,
    opacity: 0.38,
  });
  const trP = new THREE.LineBasicMaterial({
    color: 0xbf00ff,
    transparent: true,
    opacity: 0.3,
  });
  const trG = new THREE.LineBasicMaterial({
    color: 0x00ff88,
    transparent: true,
    opacity: 0.28,
  });

  const addTraces = (side) => {
    const zPos = side * 0.145;
    const paths =
      side === 1
        ? [
            {
              pts: [
                [-2.6, 0.6],
                [-1.7, 0.6],
              ],
              m: trC,
            },
            {
              pts: [
                [-1.2, 0.6],
                [0.2, 0.6],
              ],
              m: trC,
            },
            {
              pts: [
                [0.8, 0.6],
                [1.7, 0.6],
              ],
              m: trP,
            },
            {
              pts: [
                [0.2, 0.19],
                [0.2, -0.29],
              ],
              m: trG,
            },
            {
              pts: [
                [-0.5, -0.39],
                [1.7, -0.39],
              ],
              m: trC,
            },
            {
              pts: [
                [-1.7, 0.13],
                [-1.7, -0.55],
              ],
              m: trP,
            },
            {
              pts: [
                [-1.7, -0.55],
                [-0.5, -0.55],
              ],
              m: trP,
            },
            {
              pts: [
                [1.7, -0.03],
                [1.7, -0.39],
              ],
              m: trG,
            },
            {
              pts: [
                [2.1, 0.65],
                [2.6, 0.65],
              ],
              m: trC,
            },
            {
              pts: [
                [-2.1, -0.55],
                [-2.6, -0.55],
              ],
              m: trP,
            },
            {
              pts: [
                [0.5, -0.65],
                [0.5, -1.3],
              ],
              m: trG,
            },
            {
              pts: [
                [-0.8, 0.6],
                [-0.8, 1.25],
              ],
              m: trC,
            },
            {
              pts: [
                [-0.8, 1.25],
                [0.5, 1.25],
              ],
              m: trP,
            },
            {
              pts: [
                [0.5, 1.25],
                [0.5, -0.65],
              ],
              m: trG,
            },
          ]
        : [
            {
              pts: [
                [1.5, 0.8],
                [2.6, 0.8],
              ],
              m: trP,
            },
            {
              pts: [
                [-0.8, -0.2],
                [0.5, -1.0],
              ],
              m: trC,
            },
            {
              pts: [
                [-0.8, -0.2],
                [-2.2, 1.0],
              ],
              m: trG,
            },
            {
              pts: [
                [-2.2, 1.0],
                [-2.6, 1.0],
              ],
              m: trP,
            },
            {
              pts: [
                [0.5, -1.0],
                [2.6, -1.0],
              ],
              m: trC,
            },
            {
              pts: [
                [1.5, 0.8],
                [0.5, 1.5],
              ],
              m: trG,
            },
            {
              pts: [
                [0.5, 1.5],
                [-2.6, 1.5],
              ],
              m: trC,
            },
          ];
    paths.forEach(({ pts, m }) => {
      group.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(
            pts.map(([x, y]) => new THREE.Vector3(x, y, zPos)),
          ),
          m,
        ),
      );
    });
  };

  const capMat = new THREE.MeshStandardMaterial({
    color: 0x002244,
    emissive: 0x0055cc,
    emissiveIntensity: 0.7,
    metalness: 0.7,
    roughness: 0.3,
  });

  const addCaps = (side) => {
    const zPos = side * 0.185;
    const rotObjX = side === 1 ? Math.PI / 2 : -Math.PI / 2;
    const items =
      side === 1
        ? [
            [-0.8, 1.05],
            [0.5, -1.05],
            [2.15, 0.05],
            [-2.15, 0.22],
          ]
        : [
            [1.8, 1.2],
            [-1.2, 0.8],
            [0.2, -1.3],
            [-2.0, -1.1],
          ];
    items.forEach(([x, y]) => {
      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.11, 0.25, 14),
        capMat,
      );
      cap.rotation.x = rotObjX;
      cap.position.set(x, y, zPos);
      group.add(cap);
    });
  };

  // Add components to both top (1) and bottom (-1)
  addChips(1);
  addChips(-1);
  addTraces(1);
  addTraces(-1);
  addCaps(1);
  addCaps(-1);

  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x998800,
    emissive: 0x554400,
    metalness: 1,
  });
  // Mounting holes via Torus going through the board (z=0)
  [
    [-2.5, 1.45],
    [2.5, 1.45],
    [-2.5, -1.45],
    [2.5, -1.45],
  ].forEach(([x, y]) => {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(0.13, 0.028, 8, 24),
      ringMat,
    );
    r.position.set(x, y, 0);
    group.add(r);
  });

  particles(scene, 60, 7, 0x00f5ff);
  let frameId;
  const clock = new THREE.Clock();
  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const t = clock.elapsedTime;
    clock.getDelta();
    group.position.y = Math.sin(t * 0.5) * 0.07;
    group.rotation.z = Math.sin(t * 0.3) * 0.012;
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
  const onResize = () => {
    const nw = mount.clientWidth,
      nh = mount.clientHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  };
  window.addEventListener("resize", onResize);
  return cleanup(frameId, controls, onResize, renderer, mount);
}

/* ═══════════════════════════════════════════════
   SCENE 3 — IoT Network
═══════════════════════════════════════════════ */
function initIoTScene(mount) {
  const { renderer, W, H } = makeRenderer(mount);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 100);
  camera.position.set(0, 0, 6.5);
  const controls = makeControls(camera, renderer.domElement);
  controls.minDistance = 3.5;
  controls.maxDistance = 12;
  standardLights(scene);

  const group = new THREE.Group();
  scene.add(group);

  // Central hub (ESP32/MCU style)
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0x001a33,
    emissive: 0x0077cc,
    emissiveIntensity: 0.7,
    metalness: 0.8,
    roughness: 0.2,
  });
  const hub = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.12), hubMat);
  group.add(hub);
  // antenna
  const antMat = new THREE.MeshStandardMaterial({
    color: 0x00f5ff,
    emissive: 0x00f5ff,
    emissiveIntensity: 0.5,
    metalness: 1,
  });
  const ant = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.9, 8),
    antMat,
  );
  ant.position.set(0.45, 0.65, 0);
  group.add(ant);

  // Signal rings (WiFi waves)
  const ringMat = (opacity) =>
    new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      emissive: 0x00f5ff,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity,
      wireframe: false,
    });
  const rings = [0.8, 1.4, 2.0].map((r, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.025, 8, 60),
      ringMat(0.5 - i * 0.12),
    );
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
    return ring;
  });

  // IoT nodes orbiting
  const nodeMat = new THREE.MeshStandardMaterial({
    color: 0x002244,
    emissive: 0x00aaff,
    emissiveIntensity: 0.8,
    metalness: 0.7,
  });
  const connMat = new THREE.LineBasicMaterial({
    color: 0x00f5ff,
    transparent: true,
    opacity: 0.3,
  });
  const nodeData = [
    { dist: 1.8, speed: 0.6, phase: 0 },
    { dist: 2.2, speed: -0.4, phase: 1.2 },
    { dist: 1.6, speed: 0.8, phase: 2.5 },
    { dist: 2.4, speed: -0.55, phase: 0.8 },
    { dist: 1.9, speed: 0.45, phase: 4.0 },
    { dist: 2.1, speed: -0.7, phase: 3.1 },
  ];
  const nodeObjs = nodeData.map((d) => {
    const n = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 0.06), nodeMat);
    group.add(n);
    // connection line to center
    const linePts = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(d.dist, 0, 0),
    ];
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(linePts),
      connMat,
    );
    group.add(line);
    return { mesh: n, line, ...d };
  });

  particles(scene, 70, 8, 0x00f5ff);
  let frameId;
  const clock = new THREE.Clock();
  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const t = clock.elapsedTime;
    clock.getDelta();
    rings.forEach((r, i) => {
      r.scale.setScalar(1 + Math.sin(t * 1.5 + i * 1.2) * 0.06);
    });
    nodeObjs.forEach((n) => {
      const angle = t * n.speed + n.phase;
      n.mesh.position.set(
        Math.cos(angle) * n.dist,
        Math.sin(angle) * n.dist * 0.4,
        Math.sin(angle * 1.3) * 0.3,
      );
      n.mesh.rotation.y = angle;
      const pts = [new THREE.Vector3(0, 0, 0), n.mesh.position.clone()];
      n.line.geometry.setFromPoints(pts);
    });
    group.rotation.y = Math.sin(t * 0.12) * 0.12;
    group.rotation.x = Math.sin(t * 0.09) * 0.08;
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
  const onResize = () => {
    const nw = mount.clientWidth,
      nh = mount.clientHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  };
  window.addEventListener("resize", onResize);
  return cleanup(frameId, controls, onResize, renderer, mount);
}

/* ═══════════════════════════════════════════════
   SCENE 4 — Software / Server Stack
═══════════════════════════════════════════════ */
function initSoftwareScene(mount) {
  const { renderer, W, H } = makeRenderer(mount);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
  camera.position.set(0, 0.5, 6.5);
  const controls = makeControls(camera, renderer.domElement);
  controls.minDistance = 3.5;
  controls.maxDistance = 12;
  standardLights(scene);

  const group = new THREE.Group();
  scene.add(group);

  // Server rack: stacked slabs
  const srvMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a1a,
    emissive: 0x110033,
    emissiveIntensity: 0.5,
    metalness: 0.9,
    roughness: 0.15,
  });
  const ledColors = [0x00f5ff, 0x00ff88, 0xbf00ff, 0x00f5ff, 0x00ff88];
  for (let i = 0; i < 5; i++) {
    const slab = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.28, 0.9), srvMat);
    slab.position.y = (i - 2) * 0.36;
    group.add(slab);
    const slabEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2.4, 0.28, 0.9)),
      new THREE.LineBasicMaterial({
        color: 0x00f5ff,
        transparent: true,
        opacity: 0.2,
      }),
    );
    slabEdge.position.copy(slab.position);
    group.add(slabEdge);
    // LED on each
    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 8, 8),
      new THREE.MeshStandardMaterial({
        color: ledColors[i],
        emissive: ledColors[i],
        emissiveIntensity: 1.5,
      }),
    );
    led.position.set(1.1, (i - 2) * 0.36, 0.46);
    group.add(led);
  }

  // Floating service nodes connected by lines
  const nodeMat = new THREE.MeshStandardMaterial({
    color: 0x001533,
    emissive: 0x0055bb,
    emissiveIntensity: 0.8,
    metalness: 0.7,
  });
  const edgeMat = new THREE.LineBasicMaterial({
    color: 0x00f5ff,
    transparent: true,
    opacity: 0.25,
  });
  const servicePositions = [
    [-2.5, 1.2, 0.5],
    [2.5, 1.0, 0.3],
    [-2.5, -1.2, 0.4],
    [2.5, -1.0, 0.5],
    [0, 2.0, 0.2],
    [0, -2.0, 0.3],
  ];
  const serviceMeshes = servicePositions.map((p) => {
    const n = new THREE.Mesh(new THREE.OctahedronGeometry(0.22), nodeMat);
    n.position.set(...p);
    group.add(n);
    return n;
  });
  // Connect each to center
  serviceMeshes.forEach((n) => {
    const pts = [new THREE.Vector3(0, 0, 0), n.position.clone()];
    group.add(
      new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), edgeMat),
    );
  });

  // Data packets traveling along connections
  const packetMat = new THREE.MeshStandardMaterial({
    color: 0x00f5ff,
    emissive: 0x00f5ff,
    emissiveIntensity: 1.5,
  });
  const packets = servicePositions.map((p) => {
    const pk = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), packetMat);
    scene.add(pk);
    return { pk, target: p };
  });

  particles(scene, 80, 9, 0xbf00ff);
  let frameId;
  const clock = new THREE.Clock();
  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const t = clock.elapsedTime;
    clock.getDelta();
    serviceMeshes.forEach((n, i) => {
      n.rotation.y = t * (0.4 + i * 0.05);
      n.rotation.x = t * 0.3;
    });
    packets.forEach(({ pk, target }, i) => {
      const phase = (t * 0.8 + i * 1.05) % (Math.PI * 2),
        lp = Math.abs(Math.sin(phase));
      pk.position.set(target[0] * lp, target[1] * lp, target[2] * lp);
    });
    group.rotation.y = Math.sin(t * 0.1) * 0.1;
    group.rotation.x = Math.sin(t * 0.07) * 0.06;
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
  const onResize = () => {
    const nw = mount.clientWidth,
      nh = mount.clientHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  };
  window.addEventListener("resize", onResize);
  return cleanup(frameId, controls, onResize, renderer, mount);
}

/* ═══════════════════════════════════════════════
   SCENE 5 — Robotics / Hardware Arm
═══════════════════════════════════════════════ */
function initRoboticsScene(mount) {
  const { renderer, W, H } = makeRenderer(mount);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
  camera.position.set(0, 3.0, 7.5);
  camera.lookAt(0, 1.0, 0);
  const controls = makeControls(camera, renderer.domElement);
  controls.minDistance = 3;
  controls.maxDistance = 12;
  controls.target.set(0, 1.0, 0);
  standardLights(scene);

  const group = new THREE.Group();
  scene.add(group);

  // Materials
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x112233,
    metalness: 0.8,
    roughness: 0.2,
  });
  const armMat = new THREE.MeshStandardMaterial({
    color: 0x00f5ff,
    emissive: 0x005577,
    emissiveIntensity: 0.2,
    metalness: 0.5,
    roughness: 0.4,
  });
  const jointMat = new THREE.MeshStandardMaterial({
    color: 0xccaa00,
    emissive: 0x886600,
    emissiveIntensity: 0.3,
    metalness: 0.9,
    roughness: 0.1,
  });
  const edgeMat = new THREE.LineBasicMaterial({
    color: 0x00f5ff,
    transparent: true,
    opacity: 0.3,
  });

  const addEdges = (mesh, geo) => {
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
    mesh.add(edges);
  };

  // Base
  const baseGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.3, 32);
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.5;
  group.add(base);

  // Swivel (Shoulder Base)
  const swivel = new THREE.Group();
  swivel.position.y = -0.35;
  group.add(swivel);

  const shoulderBaseGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.6, 32);
  const shoulderBase = new THREE.Mesh(shoulderBaseGeo, armMat);
  shoulderBase.position.y = 0.3;
  swivel.add(shoulderBase);

  // Shoulder Joint
  const shoulderJoint = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.45, 1.2, 32),
    jointMat,
  );
  shoulderJoint.rotation.x = Math.PI / 2;
  shoulderJoint.position.y = 0.8;
  swivel.add(shoulderJoint);

  // Lower Arm
  const lowerArmGrp = new THREE.Group();
  lowerArmGrp.position.y = 0.8;
  swivel.add(lowerArmGrp);

  const lowerArmGeo = new THREE.BoxGeometry(0.6, 2.0, 0.6);
  const lowerArm = new THREE.Mesh(lowerArmGeo, armMat);
  lowerArm.position.y = 1.0;
  addEdges(lowerArm, lowerArmGeo);
  lowerArmGrp.add(lowerArm);

  // Elbow Joint
  const elbowJoint = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 1.0, 32),
    jointMat,
  );
  elbowJoint.rotation.x = Math.PI / 2;
  elbowJoint.position.y = 2.0;
  lowerArmGrp.add(elbowJoint);

  // Upper Arm
  const upperArmGrp = new THREE.Group();
  upperArmGrp.position.y = 2.0;
  lowerArmGrp.add(upperArmGrp);

  const upperArmGeo = new THREE.BoxGeometry(0.45, 1.6, 0.45);
  const upperArm = new THREE.Mesh(upperArmGeo, armMat);
  upperArm.position.y = 0.8;
  addEdges(upperArm, upperArmGeo);
  upperArmGrp.add(upperArm);

  // Wrist Joint & End Effector
  const wrist = new THREE.Group();
  wrist.position.y = 1.6;
  upperArmGrp.add(wrist);

  const wristJoint = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 32, 32),
    jointMat,
  );
  wrist.add(wristJoint);

  const gripperBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.2, 0.5),
    baseMat,
  );
  gripperBase.position.y = 0.25;
  wrist.add(gripperBase);

  const fingerGeo = new THREE.BoxGeometry(0.12, 0.5, 0.2);
  const finger1 = new THREE.Mesh(fingerGeo, armMat);
  finger1.position.set(-0.25, 0.6, 0);
  addEdges(finger1, fingerGeo);
  wrist.add(finger1);
  const finger2 = new THREE.Mesh(fingerGeo, armMat);
  finger2.position.set(0.25, 0.6, 0);
  addEdges(finger2, fingerGeo);
  wrist.add(finger2);

  particles(scene, 60, 8, 0xccaa00);
  let frameId;
  const clock = new THREE.Clock();
  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const t = clock.elapsedTime;
    clock.getDelta();

    // Smooth Kinematic Animation
    swivel.rotation.y = Math.sin(t * 0.7) * 1.2; // Base sweep
    lowerArmGrp.rotation.z = Math.sin(t * 0.9) * 0.4 + 0.2; // Shoulder tilt
    upperArmGrp.rotation.z = Math.sin(t * 1.1) * 0.6 - 0.6; // Elbow bend
    wrist.rotation.x = Math.sin(t * 1.5) * 0.8; // Wrist twist

    // Gentle floating for the whole group to match other scenes
    group.position.y = Math.sin(t * 0.5) * 0.1;

    controls.update();
    renderer.render(scene, camera);
  };
  animate();
  const onResize = () => {
    const nw = mount.clientWidth,
      nh = mount.clientHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  };
  window.addEventListener("resize", onResize);
  return cleanup(frameId, controls, onResize, renderer, mount);
}

/* ─── Canvas Components ─────────────────────── */
function makeCanvas(initFn) {
  return function CanvasComp() {
    const ref = useRef(null);
    useEffect(() => {
      if (!ref.current) return;
      return initFn(ref.current);
    }, []);
    return <div ref={ref} className="canvas-fill" />;
  };
}
const GearCanvas = makeCanvas(initGearScene);
const PCBCanvas = makeCanvas(initPCBScene);
const IoTCanvas = makeCanvas(initIoTScene);
const SoftwareCanvas = makeCanvas(initSoftwareScene);
const RoboticsCanvas = makeCanvas(initRoboticsScene);

/* ─── Main Home ─────────────────────────────── */
export default function Home({ onNavigate }) {
  return (
    <section className="home-section">
      {/* Left column */}
      <div className="hero-content">
        <div className="hero-label">
          // Computer Engineering · IPB University · Bogor, Indonesia
        </div>
        <h1 className="hero-title">
          Engineer at
          <br />
          <span className="hero-title-gradient">Every Layer.</span>
          <br />
          Hardware to Code.
        </h1>
        <p className="hero-desc">
          Curiosity-driven Computer Engineering student at IPB University,
          building across disciplines — from welded chassis and PCB design to
          embedded firmware and real-time IoT systems. I follow problems
          wherever they lead, even if it means learning a new field to solve
          them.
        </p>
        <div className="hero-tags">
          {tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className="hero-cta">
          <button
            className="btn-primary"
            onClick={() => onNavigate("projects")}
          >
            View Projects
          </button>
          <button className="btn-outline" onClick={() => onNavigate("contact")}>
            Get In Touch
          </button>
        </div>
        <div className="hero-terminal">
          <div className="terminal-bar">
            <div className="tb tb-r" />
            <div className="tb tb-y" />
            <div className="tb tb-g" />
            <span className="terminal-title">engineer.sh</span>
          </div>
          <div className="terminal-body">
            <div>
              <span className="t-prompt">$ </span>
              <span className="t-cmd">whoami</span>
            </div>
            <span className="t-out">naufal_auzan_r@system.engineer:~</span>
            <br />
            <div>
              <span className="t-prompt">$ </span>
              <span className="t-cmd">cat skills.json</span>
            </div>
            <span className="t-out">{"{"}</span>
            <span className="t-out">
              &nbsp;&nbsp;"mechanical_engineering":{" "}
              <span className="t-val">true</span>,
            </span>
            <span className="t-out">
              &nbsp;&nbsp;"electrical_engineering":{" "}
              <span className="t-val">true</span>,
            </span>
            <span className="t-out">
              &nbsp;&nbsp;"IoT_engineering": <span className="t-val">true</span>
              ,
            </span>
            <span className="t-out">
              &nbsp;&nbsp;"robotics_engineering":{" "}
              <span className="t-val">true</span>,
            </span>
            <span className="t-out">
              &nbsp;&nbsp;"embedded_systems":{" "}
              <span className="t-val">true</span>,
            </span>
            <span className="t-out">
              &nbsp;&nbsp;"3d_design": <span className="t-val">true</span>
            </span>
            <span className="t-out">
              &nbsp;&nbsp;"hardware_fabrication":{" "}
              <span className="t-val">true</span>
            </span>
            <span className="t-out">{"}"}</span>
            <div>
              <span className="t-prompt">$ </span>
              <span className="t-cmd">cat approach.txt</span>
            </div>
            <span className="t-out">
              →{" "}
              <span className="t-val">I go where the problem leads.</span>{" "}
            </span>
            <div>
              <span className="t-prompt">$ </span>
              <span className="t-cmd">status</span>
            </div>
            <span className="t-out">
              → <span className="t-val">OPEN TO OPPORTUNITIES</span>{" "}
            </span>
            <span className="t-out">
              → <span className="t-val">READY TO BUILD</span>{" "}
              <span className="t-cursor" />
            </span>
          </div>
        </div>
      </div>

      {/* Right column: 5 independent 3D panels */}
      <div className="hero-3d-wrapper">
        <div className="canvas-panel canvas-panel-gear">
          <GearCanvas />
          <div className="canvas-label">⚙ GEAR MECHANISM</div>
          <div className="drag-hint">⟳ Drag and ↕ Scroll</div>
        </div>
        <div className="canvas-divider" />
        <div className="canvas-panel canvas-panel-pcb">
          <PCBCanvas />
          <div className="canvas-label">◈ PCB / CIRCUIT BOARD</div>
          <div className="drag-hint">⟳ Drag and ↕ Scroll</div>
        </div>
        <div className="canvas-divider" />
        <div className="canvas-panel canvas-panel-iot">
          <IoTCanvas />
          <div className="canvas-label">📡 IoT NETWORK</div>
          <div className="drag-hint">⟳ Drag and ↕ Scroll</div>
        </div>
        <div className="canvas-divider" />
        <div className="canvas-panel canvas-panel-sw">
          <SoftwareCanvas />
          <div className="canvas-label">💻 SOFTWARE STACK</div>
          <div className="drag-hint">⟳ Drag and ↕ Scroll</div>
        </div>
        <div className="canvas-divider" />
        <div className="canvas-panel canvas-panel-robotics">
          <RoboticsCanvas />
          <div className="canvas-label">🦾 ROBOTIC / HARDWARE</div>
          <div className="drag-hint">⟳ Drag and ↕ Scroll</div>
        </div>
      </div>
    </section>
  );
}
