// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 60;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.3, 8, 8);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(150).fill().forEach(addStar);

//  Moons
function addMoon() {
  const geometry = new THREE.SphereGeometry(1.8, 16, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0x888888 });
  const moon = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));
  moon.position.set(x, y, z);
  scene.add(moon);
}
Array(20).fill().forEach(addMoon);

//  Rings
function addRing() {
  const geometry = new THREE.TorusGeometry(2.5, 0.4, 8, 50);
  const material = new THREE.MeshStandardMaterial({ color: 0xff7b00 });
  const ring = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  ring.position.set(x, y, z);
  ring.rotation.set(Math.random(), Math.random(), Math.random());
  scene.add(ring);
}
Array(15).fill().forEach(addRing);

//  Lighting
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Animate
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

//Responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
