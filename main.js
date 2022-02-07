
let camera, scene, renderer, cube;

function init() {

	// Scene graph
	scene = new THREE.Scene();

	// Perspective Camera
	camera = new THREE.PerspectiveCamera(
		100, //Field of View
		window.innerWidth / window.innerHeight, //Aspect ratio (calculated automatically)
		0.1, 100 //frustum
	);

	// Renderer (WebGL) with size set to whole window and linked to canvas on "main.html"
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// Create cube
	var geometry = new THREE.CubeGeometry(2, 2, 2);
	// Add textures 
	//Atribute for Dice Icons: Dice icons created by Freepik - Flaticon
	//https://www.flaticon.com/free-icons/dice
	var texture1 = new THREE.TextureLoader().load('https://cdn-icons-png.flaticon.com/512/143/143559.png');
	var texture2 = new THREE.TextureLoader().load('	https://cdn-icons-png.flaticon.com/512/143/143560.png');
	var texture3 = new THREE.TextureLoader().load('	https://cdn-icons-png.flaticon.com/512/143/143561.png');
	var texture4 = new THREE.TextureLoader().load('	https://cdn-icons-png.flaticon.com/512/143/143562.png');
	var texture5 = new THREE.TextureLoader().load('	https://cdn-icons-png.flaticon.com/512/143/143563.png');
	var texture6 = new THREE.TextureLoader().load('	https://cdn-icons-png.flaticon.com/512/143/143564.png');
//maps textures to each side of the cube
	var materials = [
		new THREE.MeshBasicMaterial({ map: texture1 }),
		new THREE.MeshBasicMaterial({ map: texture2 }),
		new THREE.MeshBasicMaterial({ map: texture3 }),
		new THREE.MeshBasicMaterial({ map: texture4 }),
		new THREE.MeshBasicMaterial({ map: texture5 }),
		new THREE.MeshBasicMaterial({ map: texture6 }),
	];
	

	// Create mesh with geo and materials
	cube = new THREE.Mesh(geometry, materials);
	// Add to scene
	scene.add(cube);
	scene.add(new THREE.AmbientLight(0x666666));
	scene.add(new THREE.DirectionalLight( 0xFFFFFF, 0.125));

	// Position camera
	camera.position.z = 5;

}

//Idle Animation for Dice runs until button is clicked
function update() {

	//set the button to visible
	document.getElementById('button').style.visibility = 'visible';

	// Rotate cube slowly
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.001;
	cube.rotation.z += 0.001;

	//renderer
	renderer.render(scene, camera);

	//Animates the function update
	stopUpdate = window.requestAnimationFrame(update)
}

//generates a random number (1 - 6) and then calls roll function to animate and display the number
function getRandomNumber(){
	randomNumber = Math.floor(Math.random() * 6) + 1 //Random number from 1 - 6 
	roll(randomNumber)
}

//animates a dice roll for 50 cycles and displays side of the cube with random number for 100 more cycles
function roll() {

	//stops the update function animation
	cancelAnimationFrame(stopUpdate)
	//starts roll function animation
	stopRoll = window.requestAnimationFrame(roll)
	//hides button
	document.getElementById('button').style.visibility = 'hidden';
	//counts number of cycles/frames in roll function animation
	counter = counter + 1;

	//if cycles/frames are less then 50, simulate dice roll
	if (counter <= 50){

	// Rotates cube rapidly in all directions to simulate dice roll
		cube.rotation.x += 1.00;
		cube.rotation.y += 1.00;
		cube.rotation.z += 1.00;
	}else{
		//If counter is above 150, end roll function animation and call update()
		if (counter >= 150){
			counter = 0 //sets counter to 0
			cancelAnimationFrame(stopRoll)
			update()
		}else{ //display side of dice which corresponds with random number (1-6)
				if (randomNumber === 1){
					cube.rotation.set(0,-1.6,0);
				}else if (randomNumber === 2){
					cube.rotation.set(0,1.6,0);
				}else if (randomNumber === 3){
					cube.rotation.set(1.6,0,0);
				}else if (randomNumber === 4){
					cube.rotation.set(-1.6,0,0);
				}else if (randomNumber === 5){
					cube.rotation.set(0,0,0);
				}else if (randomNumber === 6){
					cube.rotation.set(3.15,0,0);
				}
		}
	}
	//renderer
	renderer.render(scene, camera);
}

//Keeps dice centered as window size changes
function onWindowResize() {
	// frustum aspect ratio
	camera.aspect = window.innerWidth / window.innerHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
	renderer.setSize(window.innerWidth, window.innerHeight);
}

//declares roll function counter
var counter = 0;
//Listens for change in window size
window.addEventListener('resize', onWindowResize, false);

init();
update();

//Listens for buttons press. If pressed, calls getRandomNumber function
document.getElementById("button").addEventListener("click", getRandomNumber);
