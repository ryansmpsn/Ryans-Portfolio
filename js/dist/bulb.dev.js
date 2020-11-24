"use strict";

var _window = window,
    _window$gsap = _window.gsap,
    registerPlugin = _window$gsap.registerPlugin,
    set = _window$gsap.set,
    to = _window$gsap.to,
    timeline = _window$gsap.timeline,
    MorphSVGPlugin = _window.MorphSVGPlugin,
    Draggable = _window.Draggable;
registerPlugin(MorphSVGPlugin); // Used to calculate distance of "tug"

var startX;
var startY;
var AUDIO = {
  CLICK: new Audio("https://assets.codepen.io/605876/click.mp3")
};
var STATE = {
  ON: false
};
var CORD_DURATION = 0.1;
var CORDS = document.querySelectorAll(".toggle-scene__cord");
var HIT = document.querySelector(".toggle-scene__hit-spot");
var DUMMY = document.querySelector(".toggle-scene__dummy-cord");
var DUMMY_CORD = document.querySelector(".toggle-scene__dummy-cord line");
var PROXY = document.createElement("div"); // set init position

var ENDX = DUMMY_CORD.getAttribute("x2");
var ENDY = DUMMY_CORD.getAttribute("y2");

var RESET = function RESET() {
  set(PROXY, {
    x: ENDX,
    y: ENDY
  });
};

RESET();
var CORD_TL = timeline({
  paused: true,
  onStart: function onStart() {
    STATE.ON = !STATE.ON;
    set(document.documentElement, {
      "--on": STATE.ON ? 1 : 0
    });
    set(DUMMY, {
      display: "none"
    });
    set(CORDS[0], {
      display: "block"
    });
    AUDIO.CLICK.play();
  },
  onComplete: function onComplete() {
    set(DUMMY, {
      display: "block"
    });
    set(CORDS[0], {
      display: "none"
    });
    RESET();
  }
});

for (var i = 1; i < CORDS.length; i++) {
  CORD_TL.add(to(CORDS[0], {
    morphSVG: CORDS[i],
    duration: CORD_DURATION,
    repeat: 1,
    yoyo: true
  }));
}

Draggable.create(PROXY, {
  trigger: HIT,
  type: "x,y",
  onPress: function onPress(e) {
    startX = e.x;
    startY = e.y;
  },
  onDrag: function onDrag() {
    set(DUMMY_CORD, {
      attr: {
        x2: this.x,
        y2: this.y
      }
    });
  },
  onRelease: function onRelease(e) {
    var DISTX = Math.abs(e.x - startX);
    var DISTY = Math.abs(e.y - startY);
    var TRAVELLED = Math.sqrt(DISTX * DISTX + DISTY * DISTY);
    to(DUMMY_CORD, {
      attr: {
        x2: ENDX,
        y2: ENDY
      },
      duration: CORD_DURATION,
      onComplete: function onComplete() {
        if (TRAVELLED > 50) {
          CORD_TL.restart();
        } else {
          RESET();
        }
      }
    });
  }
});