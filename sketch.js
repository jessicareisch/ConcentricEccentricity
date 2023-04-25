let circles = [];
let t = 0;

function preload() {
  sound = loadSound("sound.ogg");
  sound.setVolume(1);
}

function makeSlider() {
  //SLIDER
  slider = createSlider(0, 255, 0);
  slider.position(20, 125);
  slider.size(280, 10);
}

function setup() {
  add();
  createCanvas(windowWidth, windowHeight);
  background(0);

  //BUTTONS AND BUTTON STYLE
  button = createButton("🔈");
  button.position(330, 55);
  button.mousePressed(soundControl);

  sound.loop();

  button.style("font-size", "20px");
  button.style("background-color", "black");
  button.style("color", "#0475FF");
  button.style("border-radius", "20px");
  button.style("border-color", "white");
  button.style("padding", "7px");

  button = createButton("⇧");
  button.position(315, 105);
  button.mousePressed(add);

  button.style("font-family", "Courier New");
  button.style("font-size", "40px");
  button.style("font-weight", "bold");
  button.style("background-color", "black");
  button.style("color", "#0475FF");
  button.style("border-radius", "20px");
  button.style("border-color", "white");
  button.style("padding", "2px");

  button = createButton("⇩");
  button.position(355, 105);
  button.mousePressed(subtract);

  button.style("font-family", "Courier New");
  button.style("font-size", "40px");
  button.style("font-weight", "bold");
  button.style("background-color", "black");
  button.style("color", "#0475FF");
  button.style("border-radius", "20px");
  button.style("border-color", "white");
  button.style("padding", "2px");

  button = createButton("Full Screen");
  button.position(20, 58);
  button.mousePressed(fullScreen);

  button.style("font-family", "Courier New");
  button.style("font-size", "20px");
  button.style("font-weight", "bold");
  button.style("background-color", "black");
  button.style("color", "#0475FF");
  button.style("border-radius", "20px");
  button.style("border-color", "white");
  button.style("padding", "5px");

  button = createButton("Reset");
  button.position(170, 58);
  button.mousePressed(reset);

  button.style("font-family", "Courier New");
  button.style("font-size", "20px");
  button.style("font-weight", "bold");
  button.style("background-color", "black");
  button.style("color", "#0475FF");
  button.style("border-radius", "20px");
  button.style("border-color", "white");
  button.style("padding", "5px");

  button = createButton("Stop");
  button.position(248, 58);
  button.mousePressed(stop);

  button.style("font-family", "Courier New");
  button.style("font-size", "20px");
  button.style("font-weight", "bold");
  button.style("background-color", "black");
  button.style("color", "red");
  button.style("border-radius", "20px");
  button.style("border-color", "white");
  button.style("padding", "5px");

  makeSlider();

  t = 0;
}

function draw() {
  //TITLE FRAME
  fill(0);
  stroke(255);
  rect(5, 5, 425, 170, 40);

  //TITLE
  fill(255);
  textSize(24);
  strokeWeight(2);
  textFont("Courier New");
  text("Concentric Eccentricity:", 20, 40);

  //SOUND CONTROLS
  let c1 = circles[0];
  cPan = map(c1.x, 0, windowWidth, 0, 1);
  cRate = map(c1.y, 0, windowHeight, 0.2, 2);

  sound.pan(cPan);
  sound.rate(cRate);

  //DEFAULT CIRCLE FILL AND STROKE
  fill(255, 255, 255, 10);
  stroke(50);
  strokeWeight(0.5);

  //CIRCLE STROKE COLOR VIA SLIDER
  let val = slider.value();
  stroke(val);

  //ADDING AND MOVING CIRCLE OBJECTS
  for (let circle of circles) {
    circle.move();
    circle.appear();
  }

  for (let i = 0; i < circles.length; i++) {
    circles[i].appear();
    circles[i].move();
  }

  t = t + 0.004;
}

function soundControl() {
  if (sound.isPlaying()) {
    sound.stop();
  } else {
    sound.play();
  }
}

function reset() {
  slider.remove();
  sound.stop();
  setup();
  circles.length = 1;
  draw();
  loop();
}

function stop() {
  reset();
  noLoop();
  background(0);
  sound.stop();
}

function windowResized() {
  slider.remove();
  reset();
}

function fullScreen() {
  reset();
  let fs = fullscreen();
  fullscreen(!fs);
}

function add() {
  let b = new Circle(1, 1, random(50, 300));
  circles.push(b);
}

function subtract() {
  let b = new Circle(1, 1, 1);

  if (circles.length == 1) {
    circles.push(b);
  }
  circles.pop(b);
}

//CIRCLE OBJECT CLASS
class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move() {
    this.x = noise(t + 100) * width;
    this.y = noise(t + 1000) * height;
  }

  appear() {
    let val = slider.value();
    stroke(val);

    fill(255, 255, 255, 10);
    stroke(val);
    strokeWeight(0.5);
    ellipse(this.x, this.y, this.r);
  }
}
