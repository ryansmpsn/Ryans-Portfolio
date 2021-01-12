"use strict";

var circleCount = Math.ceil(window.innerWidth / 100) * 100 / 4;
var circlePropCount = 8;
var circlePropsLength = circleCount * circlePropCount;
var baseSpeed = 0.01;
var rangeSpeed = 1;
var baseTTL = 150;
var rangeTTL = 200;
var baseRadius = 1;
var rangeRadius = 10;
var rangeLight = 90;
var xOff = 0.0015;
var yOff = 0.0015;
var zOff = 0.0015;
var backgroundColor = "hsla(100,100%,100%,1)";
var container;
var canvas;
var ctx;
var circles;
var circleProps;
var simplex;
var baseLight;

function setup() {
  createCanvas();
  resize();
  initCircles();
  draw();
}

function initCircles() {
  circleProps = new Float32Array(circlePropsLength);
  simplex = new SimplexNoise();
  baseLight = 0;
  var i;

  for (i = 0; i < circlePropsLength; i += circlePropCount) {
    initCircle(i);
  }
}

function initCircle(i) {
  var x, y, n, t, speed, vx, vy, life, ttl, radius, light;
  x = rand(canvas.a.width);
  y = rand(canvas.a.height);
  n = simplex.noise3D(x * xOff, y * yOff, baseLight * zOff);
  t = rand(TAU);
  speed = baseSpeed + rand(rangeSpeed);
  vx = speed * cos(t);
  vy = speed * sin(t);
  life = 0;
  ttl = baseTTL + rand(rangeTTL);
  radius = baseRadius + rand(rangeRadius);
  light = baseLight + n * rangeLight;
  circleProps.set([x, y, vx, vy, life, ttl, radius, light], i);
}

function updateCircles() {
  var i;
  baseLight++;

  if (baseLight > 150) {
    baseLight = 10;
  }

  for (i = 0; i < circlePropsLength; i += circlePropCount) {
    updateCircle(i);
  }
}

function updateCircle(i) {
  var i2 = 1 + i,
      i3 = 2 + i,
      i4 = 3 + i,
      i5 = 4 + i,
      i6 = 5 + i,
      i7 = 6 + i,
      i8 = 7 + i;
  var x, y, vx, vy, life, ttl, radius, light;
  x = circleProps[i];
  y = circleProps[i2];
  vx = circleProps[i3];
  vy = circleProps[i4];
  life = circleProps[i5];
  ttl = circleProps[i6];
  radius = circleProps[i7];
  light = circleProps[i8];
  drawCircle(x, y, life, ttl, radius, light);
  life++;
  circleProps[i] = x + vx;
  circleProps[i2] = y + vy;
  circleProps[i5] = life;
  (checkBounds(x, y, radius) || life > ttl) && initCircle(i);
}

function drawCircle(x, y, life, ttl, radius, light) {
  ctx.a.save();
  ctx.a.fillStyle = "hsla(220,80%,".concat(light, "%,").concat(fadeInOut(life, ttl), ")");
  ctx.a.beginPath();
  ctx.a.arc(x, y, radius, 0, TAU);
  ctx.a.fill();
  ctx.a.closePath();
  ctx.a.restore();
}

function checkBounds(x, y, radius) {
  return x < -radius || x > canvas.a.width + radius || y < -radius || y > canvas.a.height + radius;
}

function createCanvas() {
  container = document.querySelector(".content--canvas");
  canvas = {
    a: document.createElement("canvas"),
    b: document.createElement("canvas")
  };
  canvas.b.style = "\n\t\tposition: fixed;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t";
  container.appendChild(canvas.b);
  ctx = {
    a: canvas.a.getContext("2d"),
    b: canvas.b.getContext("2d")
  };
}

function resize() {
  circleCount = Math.ceil(window.innerWidth / 100) * 100 / 4;
  initCircles();
  var _window = window,
      innerWidth = _window.innerWidth,
      innerHeight = _window.innerHeight;
  canvas.a.width = innerWidth;
  canvas.a.height = innerHeight;
  ctx.a.drawImage(canvas.b, 0, 0);
  canvas.b.width = innerWidth;
  canvas.b.height = innerHeight;
  ctx.b.drawImage(canvas.a, 0, 0);
}

function render() {
  ctx.b.save(); // ctx.b.filter = "blur(1px)";

  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();
}

function draw() {
  ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
  ctx.b.fillStyle = backgroundColor;
  ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height);
  updateCircles();
  render();
  window.requestAnimationFrame(draw);
}

window.addEventListener("load", setup);
window.addEventListener("resize", resize);