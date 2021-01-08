"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * demo2.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
  var chars = ["$", "%", "#", "@", "&", "(", ")", "=", "*", "/"];
  var charsTotal = chars.length;

  var getRandomInt = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var Entry =
  /*#__PURE__*/
  function () {
    function Entry(el) {
      _classCallCheck(this, Entry);

      this.DOM = {
        el: el
      };
      this.DOM.image = this.DOM.el.querySelector(".content__img");
      this.DOM.title = {
        word: this.DOM.el.querySelector(".content__text")
      };
      charming(this.DOM.title.word);
      this.DOM.title.letters = Array.from(this.DOM.title.word.querySelectorAll("span")).sort(function () {
        return 0.5 - Math.random();
      });
      this.DOM.title.letters.forEach(function (letter) {
        return letter.dataset.initial = letter.innerHTML;
      });
      this.lettersTotal = this.DOM.title.letters.length;
      observer.observe(this.DOM.el);
    }

    _createClass(Entry, [{
      key: "enter",
      value: function enter() {
        var _this = this;

        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "down";
        this.DOM.title.word.style.opacity = 1;
        this.timeouts = [];
        this.complete = false;
        var cnt = 0;
        this.DOM.title.letters.forEach(function (letter, pos) {
          var loopTimeout;

          var loop = function loop() {
            letter.innerHTML = chars[getRandomInt(0, charsTotal - 1)];
            letter.style.color = ["#2c0baf", "#03a9f4", "#062d86"][getRandomInt(0, 2)];
            loopTimeout = setTimeout(loop, getRandomInt(75, 150));

            _this.timeouts.push(loopTimeout);
          };

          loop();
          var timeout = setTimeout(function () {
            clearTimeout(loopTimeout);
            letter.innerHTML = letter.dataset.initial;
            letter.style.color = "#934ae8";
            ++cnt;

            if (cnt === _this.lettersTotal) {
              _this.complete = true;
            }
          }, pos * 80 + 400);

          _this.timeouts.push(timeout);
        });
      }
    }, {
      key: "exit",
      value: function exit() {
        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "down";
        this.DOM.title.word.style.opacity = 0;
        if (this.complete) return;

        for (var i = 0, len = this.timeouts.length; i <= len - 1; ++i) {
          clearTimeout(this.timeouts[i]);
        }
      }
    }]);

    return Entry;
  }();

  var observer;
  var current = -1;
  var allentries = [];
  var sections = Array.from(document.querySelectorAll(".content__section")); // Preload all the images in the page..

  imagesLoaded(document.querySelectorAll(".content__img"), function () {
    document.body.classList.remove("loading");

    if ("IntersectionObserver" in window) {
      document.body.classList.add("ioapi");
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio > 0.5) {
            var newcurrent = sections.indexOf(entry.target);
            if (newcurrent === current) return;
            var direction = newcurrent > current;

            if (current >= 0) {
              allentries[current].exit(direction ? "down" : "up");
            }

            allentries[newcurrent].enter(direction ? "down" : "up");
            current = newcurrent;
          }
        });
      }, {
        threshold: 0.5
      });
      sections.forEach(function (section) {
        return allentries.push(new Entry(section));
      });
    }
  });
}