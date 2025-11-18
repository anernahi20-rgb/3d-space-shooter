// Game variables
let scene, camera, renderer;
let player, enemies = [], bullets = [];
let score = 0, lives = 3;
let gameRunning = false;
let keys = {};
let enemySpawnTimer = 0;
let stars = [];

// Game configuration
const config = {
    playerSpeed: 0.15,
    bulletSpeed: 0.5,
    enemySpeed: 0.08,
    enemySpawnRate: 60,
    maxEnemies: 10
};

// Initialize the game
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 100);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.getElementById('game-container').appendChild(renderer.domElement);
    
    // Create starfield background
    createStarfield();
    
    // Create player ship
    createPlayer();
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
    
    // Event listeners
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

function createStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    
    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        starVertices.push(x, y, z);
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
    stars.push(starField);
}

function createPlayer() {
    const geometry = new THREE.ConeGeometry(0.5, 1.5, 4);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 0.5 });
    player = new THREE.Mesh(geometry, material);
    player.rotation.x = Math.PI / 2;
    player.position.z = 5;
    scene.add(player);
}

function createEnemy() {
    if (enemies.length >= config.maxEnemies) return;
    
    const geometry = new THREE.OctahedronGeometry(0.5);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 0.5 });
    const enemy = new THREE.Mesh(geometry, material);
    
    enemy.position.x = (Math.random() - 0.5) * 20;
    enemy.position.y = (Math.random() - 0.5) * 15;
    enemy.position.z = -30;
    
    scene.add(enemy);
    enemies.push(enemy);
}

function createBullet() {
    const geometry = new THREE.SphereGeometry(0.15, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const bullet = new THREE.Mesh(geometry, material);
    
    bullet.position.copy(player.position);
    bullet.position.z -= 1;
    
    scene.add(bullet);
    bullets.push(bullet);
}

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    gameRunning = true;
    score = 0;
    lives = 3;
    updateUI();
}

function restartGame() {
    // Clear enemies and bullets
    enemies.forEach(enemy => scene.remove(enemy));
    bullets.forEach(bullet => scene.remove(bullet));
    enemies = [];
    bullets = [];
    
    // Reset player position
    player.position.set(0, 0, 5);
    
    document.getElementById('game-over-screen').classList.add('hidden');
    startGame();
}

function gameOver() {
    gameRunning = false;
    document.getElementById('final-score').textContent = score;
    document.getElementById('game-over-screen').classList.remove('hidden');
}

function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
}

function onKeyDown(event) {
    keys[event.key.toLowerCase()] = true;
    
    if (event.key === ' ' && gameRunning) {
        event.preventDefault();
        createBullet();
    }
}

function onKeyUp(event) {
    keys[event.key.toLowerCase()] = false;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function updatePlayer() {
    if (!gameRunning) return;
    
    // Movement
    if (keys['w'] || keys['arrowup']) {
        player.position.y = Math.min(player.position.y + config.playerSpeed, 8);
    }
    if (keys['s'] || keys['arrowdown']) {
        player.position.y = Math.max(player.position.y - config.playerSpeed, -8);
    }
    if (keys['a'] || keys['arrowleft']) {
        player.position.x = Math.max(player.position.x - config.playerSpeed, -10);
    }
    if (keys['d'] || keys['arrowright']) {
        player.position.x = Math.min(player.position.x + config.playerSpeed, 10);
    }
    
    // Slight rotation for visual effect
    player.rotation.z = player.position.x * -0.1;
}

function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].position.z -= config.bulletSpeed;
        
        // Remove bullets that are off screen
        if (bullets[i].position.z < -40) {
            scene.remove(bullets[i]);
            bullets.splice(i, 1);
        }
    }
}

function updateEnemies() {
    if (!gameRunning) return;
    
    // Spawn enemies
    enemySpawnTimer++;
    if (enemySpawnTimer > config.enemySpawnRate) {
        createEnemy();
        enemySpawnTimer = 0;
    }
    
    // Move enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].position.z += config.enemySpeed;
        enemies[i].rotation.x += 0.02;
        enemies[i].rotation.y += 0.02;
        
        // Check collision with player
        if (enemies[i].position.distanceTo(player.position) < 1) {
            scene.remove(enemies[i]);
            enemies.splice(i, 1);
            lives--;
            updateUI();
            
            if (lives <= 0) {
                gameOver();
            }
            continue;
        }
        
        // Remove enemies that passed the player
        if (enemies[i].position.z > 20) {
            scene.remove(enemies[i]);
            enemies.splice(i, 1);
        }
    }
}

function checkCollisions() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (bullets[i] && enemies[j] && bullets[i].position.distanceTo(enemies[j].position) < 0.8) {
                scene.remove(bullets[i]);
                scene.remove(enemies[j]);
                bullets.splice(i, 1);
                enemies.splice(j, 1);
                score += 10;
                updateUI();
                break;
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    // Update game objects
    updatePlayer();
    updateBullets();
    updateEnemies();
    checkCollisions();
    
    // Animate stars
    stars.forEach(starField => {
        starField.rotation.z += 0.0001;
    });
    
    // Render scene
    renderer.render(scene, camera);
}

// Initialize game when page loads
init();