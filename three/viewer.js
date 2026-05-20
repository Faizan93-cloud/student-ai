let scene, camera, renderer, model;

// Initialize Three.js scene
function initViewer(modelPath) {
    const container = document.getElementById('canvas-container');
    
    // Clear previous content
    container.innerHTML = '';
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    
    // Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Load GLB model
    const loader = new THREE.GLTFLoader();
    loader.load(
        modelPath,
        (gltf) => {
            // Remove old model if exists
            if (model) {
                scene.remove(model);
            }
            
            model = gltf.scene;
            scene.add(model);
            
            // Center and scale model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            cameraZ *= 1.5;
            camera.position.z = cameraZ;
            camera.lookAt(model.position);
        },
        (progress) => {
            console.log('Loading model: ' + (progress.loaded / progress.total * 100) + '%');
        },
        (error) => {
            console.error('Error loading model:', error);
            // Show placeholder if model fails to load
            showPlaceholder();
        }
    );
    
    // Animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate model
    if (model) {
        model.rotation.x += 0.003;
        model.rotation.y += 0.005;
    }
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function showPlaceholder() {
    // Create a simple geometric shape as placeholder
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
        color: 0x667eea,
        shininess: 100
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    model = cube;
}

// Initialize scene on page load
window.addEventListener('load', () => {
    // Initialize with a placeholder or first model
    const container = document.getElementById('canvas-container');
    if (container) {
        // Create an empty scene first
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a2e);
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;
        
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        animate();
        window.addEventListener('resize', onWindowResize, false);
    }
});
