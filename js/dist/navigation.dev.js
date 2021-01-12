"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var navSlide = function navSlide() {
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".nav-links");
  var navLinks = document.querySelectorAll(".nav-links li"); // Toggle Nav

  [burger].concat(_toConsumableArray(navLinks)).forEach(function (element, index) {
    element.addEventListener("click", function () {
      nav.classList.toggle("nav-active"); // Burger Animation

      burger.classList.toggle("toggle"); // Animate Links

      navLinks.forEach(function (link, index) {
        if (window.innerWidth < 767) {
          if (link.style.animation) {
            link.style.animation = "";
          } else {
            link.style.animation = "navLinkFade 0.15s ease forwards ".concat(index / 7 + 0.3, "s");
          }
        }
      });
    });
  });
};

navSlide(); // Scroll Reveal

ScrollReveal().reveal("#about");
ScrollReveal().reveal("#portfolio");
ScrollReveal().reveal("#contact");