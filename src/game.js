import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('game-canvas');
const scoreText = document.getElementById('score');
const timeText = document.getElementById('time');
const levelText = document.getElementById('level');
const messageBox = document.getElementById('message-box');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x09111a, 6, 18);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.25, 7.5);

const ambient = new THREE.AmbientLight(0xffffff, 1.25);
scene.add(ambient);

const keyLight = new THREE.DirectionalLight(0xcfe7ff, 2.4);
keyLight.position.set(4, 5, 6);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x8ec5ff, 0.8);
fillLight.position.set(-5, 3, -4);
scene.add(fillLight);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(6, 64),
  new THREE.MeshStandardMaterial({
    color: 0x162b3d,
    metalness: 0.2,
    roughness: 0.8,
  })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.1;
scene.add(floor);

const boltGroup = new THREE.Group();
scene.add(boltGroup);

const boltMaterial = new THREE.MeshStandardMaterial({
  color: 0xe5e7eb,
  metalness: 0.9,
  roughness: 0.18,
});

const boltHead = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.7, 32), boltMaterial);
boltHead.position.y = 0.8;
boltGroup.add(boltHead);

const boltStem = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 2.2, 16), boltMaterial);
boltStem.position.y = -0.3;
boltGroup.add(boltStem);

const boltThread = new THREE.Mesh(
  new THREE.TorusGeometry(0.85, 0.17, 8, 32),
  new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.8, roughness: 0.25 })
);
boltThread.rotation.x = Math.PI / 2;
boltThread.position.y = -1.2;
boltGroup.add(boltThread);

const screwdriver = new THREE.Group();
scene.add(screwdriver);

const driverHandle = new THREE.Mesh(
  new THREE.CylinderGeometry(0.16, 0.16, 2.7, 18),
  new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.35, roughness: 0.75 })
);
driverHandle.rotation.z = Math.PI / 2;
driverHandle.position.x = -1.2;
screwdriver.add(driverHandle);

const driverTip = new THREE.Mesh(
  new THREE.CylinderGeometry(0.12, 0.12, 0.85, 18),
  new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.3 })
);
driverTip.rotation.z = Math.PI / 2;
driverTip.position.x = 0.3;
screwdriver.add(driverTip);

const requiredTurn = 2.8;
let currentTurn = 0;
let score = 0;
let timeLeft = 30;
let level = 1;
let isPointerDown = false;
let previousPointerX = 0;
let finished = false;

const updateHud = () => {
  scoreText.textContent = String(score);
  timeText.textContent = String(Math.max(0, Math.ceil(timeLeft)));
  levelText.textContent = String(level);
};

const resetBolt = () => {
  currentTurn = 0;
  boltGroup.rotation.y = 0;
  boltGroup.rotation.x = 0.2 + (level * 0.08);
  boltGroup.position.y = 0.25;
  screwdriver.rotation.set(0, 0, 0);
  screwdriver.position.set(0.9, 0.2, 0);
  finished = false;
  messageBox.innerHTML = '<h1>Unscrew Anything 3D</h1><p>Drag/tap and rotate the screw to finish the unscrew.</p>';
};

const completeLevel = () => {
  finished = true;
  score += 10 * level;
  level += 1;
  timeLeft += 3;
  updateHud();
  messageBox.innerHTML = '<h1>Nice!</h1><p>Level cleared. Next bolt incoming...</p>';
  setTimeout(resetBolt, 650);
};

const onPointerMove = (event) => {
  if (!isPointerDown || finished) return;

  const x = event.clientX || event.touches?.[0]?.clientX || 0;
  const delta = x - previousPointerX;
  previousPointerX = x;

  const rotationStep = delta * 0.005;
  currentTurn += Math.abs(rotationStep);

  if (delta !== 0) {
    boltGroup.rotation.z -= rotationStep;
    screwdriver.rotation.z -= rotationStep * 0.6;
  }

  if (currentTurn >= requiredTurn) {
    completeLevel();
  }
};

const onPointerDown = (event) => {
  if (finished) return;
  isPointerDown = true;
  previousPointerX = event.clientX || event.touches?.[0]?.clientX || 0;
};

const onPointerUp = () => {
  isPointerDown = false;
};

window.addEventListener('pointerdown', onPointerDown);
window.addEventListener('pointermove', onPointerMove);
window.addEventListener('pointerup', onPointerUp);
window.addEventListener('pointercancel', onPointerUp);
window.addEventListener('touchstart', onPointerDown, { passive: true });
window.addEventListener('touchmove', onPointerMove, { passive: true });
window.addEventListener('touchend', onPointerUp, { passive: true });

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const clock = new THREE.Clock();
let lastFrameTime = 0;

const animate = () => {
  const delta = clock.getDelta();
  lastFrameTime += delta;

  if (!finished) {
    boltGroup.rotation.y += delta * 0.8;
    boltGroup.position.y = Math.sin(lastFrameTime * 1.5) * 0.18;
  }

  camera.position.x = Math.sin(lastFrameTime * 0.8) * 0.5;
  camera.position.y = 1.2 + Math.sin(lastFrameTime * 1.2) * 0.18;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

const timerLoop = () => {
  if (!finished) {
    timeLeft -= 1 / 60;
    if (timeLeft <= 0) {
      finished = true;
      messageBox.innerHTML = '<h1>Time Up!</h1><p>Restart by refreshing the page.</p>';
    }
  }

  updateHud();
  setTimeout(timerLoop, 1000 / 60);
};

resetBolt();
updateHud();
animate();
timerLoop();
