/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Brick = function () {
  function Brick(xPos, yPos, color, ctx) {
    _classCallCheck(this, Brick);

    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
    this.ctx = ctx;
    this.width = 50;
    this.height = 25;
    this.hitsToDestroy = this.color === 'teal' ? 2 : 1;
    this.image = new Image(this.width, this.height);
    this.image.src = './assets/images/' + this.color + '_brick.png';
    this.draw = this.draw.bind(this);
    this.destroy = this.destroy.bind(this);
    this.image.onload = this.draw;
  }

  _createClass(Brick, [{
    key: 'takeHit',
    value: function takeHit() {
      if (this.hitsToDestroy === 1) {
        this.destroy();
        return true;
      } else {
        this.hitsToDestroy -= 1;
        this.image.src = './assets/images/' + this.color + '_brick_cracked.png';
        return false;
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
    }
  }]);

  return Brick;
}();

exports.default = Brick;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MovingObject = function () {
  function MovingObject(options) {
    _classCallCheck(this, MovingObject);

    this.xPos = options["pos"][0];
    this.yPos = options["pos"][1];
    this.xVel = options["vel"][0];
    this.yVel = options["vel"][1];
    this.speed = Math.sqrt(Math.pow(this.xVel, 2) + Math.pow(this.yVel, 2));
    this.width = options["width"];
    this.height = options["height"];
    this.game = options["game"];
    this.draw = this.draw.bind(this);
  }

  _createClass(MovingObject, [{
    key: "draw",
    value: function draw() {
      this.ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height);
    }
  }, {
    key: "move",
    value: function move() {
      var timeDelta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.xPos += this.xVel * (timeDelta / 20);
      this.yPos += this.yVel * (timeDelta / 20);
      if (this.game.isOutOfBounds(this)) {
        this.clear();
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
    }
  }]);

  return MovingObject;
}();

exports.default = MovingObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

var _levels = __webpack_require__(7);

var _levels2 = _interopRequireDefault(_levels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('board');
  canvas.height = 600;
  canvas.width = 700;
  var ctx = canvas.getContext('2d');
  var game = new _game2.default(ctx);

  var startButton = document.getElementById('start-button');
  startButton.addEventListener('click', function () {
    game.start();
    var startModal = document.getElementsByClassName('start-game')[0];
    startModal.className = " hidden";
  });

  var playAgainButton = document.getElementById('play-again button');
  playAgainButton.addEventListener('click', function () {
    game = new _game2.default(ctx);
    game.start();
    var playAgainModal = document.getElementsByClassName('play-again')[0];
    playAgainModal.className += " hidden";
  });

  var muteButton = document.getElementById('mute-button');
  muteButton.addEventListener('click', function () {
    var audioEls = document.getElementsByTagName('audio');
    for (var i = 0; i < audioEls.length; i++) {
      audioEls[i].muted = !audioEls[i].muted;
    }

    if (muteButton.textContent === 'Mute Sounds') {
      muteButton.textContent = 'Unmute Sounds';
    } else {
      muteButton.textContent = 'Mute Sounds';
    }
  });
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _brick = __webpack_require__(0);

var _brick2 = _interopRequireDefault(_brick);

var _paddle = __webpack_require__(4);

var _paddle2 = _interopRequireDefault(_paddle);

var _ball = __webpack_require__(5);

var _ball2 = _interopRequireDefault(_ball);

var _game_view = __webpack_require__(6);

var _game_view2 = _interopRequireDefault(_game_view);

var _levels = __webpack_require__(7);

var _levels2 = _interopRequireDefault(_levels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(ctx) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
    this.bricks = [];
    this.colors = ['teal', 'red', 'yellow', 'blue', 'green'];
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.impactSound = new Audio();
    this.destroySound = new Audio();
    this.gameView = new _game_view2.default(this, ctx);
    this.step = this.step.bind(this);
    this.start = this.start.bind(this);
    this.setupGame();
  }

  _createClass(Game, [{
    key: 'setupGame',
    value: function setupGame() {
      this.addPaddle();
      this.addBall();
      this.populateBricks();
      this.setScoreAndLives();
      this.setupSounds();
    }
  }, {
    key: 'allObjects',
    value: function allObjects() {
      var objects = this.bricks.concat(this.paddle, this.ball);
      return objects;
    }
  }, {
    key: 'addBall',
    value: function addBall() {
      var ballOptions = {
        "pos": [this.paddle.xPos + this.paddle.width / 2, 420],
        "vel": [0, 2],
        "width": 19,
        "height": 19,
        "game": this
      };
      this.ball = new _ball2.default(ballOptions, this.ctx);
    }
  }, {
    key: 'addPaddle',
    value: function addPaddle() {
      var paddleOptions = {
        "pos": [30, 525],
        "vel": [0, 0],
        "width": 100,
        "height": 19,
        "game": this
      };
      this.paddle = new _paddle2.default(paddleOptions, this.ctx);
    }
  }, {
    key: 'populateBricks',
    value: function populateBricks() {
      this.bricks = _levels2.default[this.level](this.ctx);
    }
  }, {
    key: 'setScoreAndLives',
    value: function setScoreAndLives() {
      var scoreCounter = document.getElementById('score');
      scoreCounter.textContent = this.score;
      var livesElement = document.getElementById('lives');
      livesElement.textContent = 'x' + this.lives;
    }
  }, {
    key: 'setupSounds',
    value: function setupSounds() {
      this.impactSound.src = "./assets/sounds/paddle_impact.wav";
      this.destroySound.src = "./assets/sounds/brick_break.wav";
      document.body.append(this.impactSound);
      document.body.append(this.destroySound);
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.ctx.clearRect(0, 0, 700, 600);
      this.allObjects().forEach(function (object) {
        return object.draw();
      });
    }
  }, {
    key: 'moveObjects',
    value: function moveObjects(timeDelta) {
      this.ball.move(timeDelta);
      this.paddle.move(timeDelta);
    }
  }, {
    key: 'checkCollisions',
    value: function checkCollisions() {
      var gameObjects = this.allObjects();

      for (var i = 0; i < gameObjects.length - 1; i++) {
        var gameObject = gameObjects[i];
        if (this.ball.isCollidedWith(gameObject)) {

          if (gameObject instanceof _brick2.default) {
            this.ball.collideWith(gameObject);
            this.removeBrick(gameObject);
          } else {
            this.ball.collideWithPaddle(gameObject);
            this.impactSound.play();
          }

          break;
        }
      }
    }
  }, {
    key: 'step',
    value: function step(timeDelta) {
      this.moveObjects(timeDelta);
      this.checkCollisions();

      if (this.isOutOfBounds(this.ball) && this.lives > 0) {
        this.respawnBall();
      }

      this.draw();
    }
  }, {
    key: 'respawnBall',
    value: function respawnBall() {
      this.addBall();
      this.lives -= 1;
      var livesElement = document.getElementById('lives');
      livesElement.textContent = 'x' + this.lives;
    }
  }, {
    key: 'removeBrick',
    value: function removeBrick(brick) {
      this.destroySound.play();
      if (brick.takeHit()) {
        var index = this.bricks.indexOf(brick);
        this.bricks.splice(index, 1);
        this.updateScore();
      }
    }
  }, {
    key: 'isOutOfBounds',
    value: function isOutOfBounds(gameObject) {
      if (gameObject.yPos >= 600) {
        return true;
      }

      return false;
    }
  }, {
    key: 'updateScore',
    value: function updateScore() {
      this.score += 80;
      var scoreCounter = document.getElementById('score');
      scoreCounter.textContent = this.score;
    }
  }, {
    key: 'nextLevel',
    value: function nextLevel() {
      this.level += 1;
      this.populateBricks();
      this.addBall();
    }
  }, {
    key: 'lost',
    value: function lost() {
      return this.isOutOfBounds(this.ball) && this.lives === 0;
    }
  }, {
    key: 'won',
    value: function won() {
      if (this.bricks.length !== 0) return false;
      if (this.level < 4) {
        this.nextLevel();
        return false;
      }
      return true;
    }
  }, {
    key: 'over',
    value: function over() {
      return this.lost() || this.won();
    }
  }, {
    key: 'start',
    value: function start() {
      this.gameView.start();
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moving_object = __webpack_require__(1);

var _moving_object2 = _interopRequireDefault(_moving_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paddle = function (_MovingObject) {
  _inherits(Paddle, _MovingObject);

  function Paddle(options, ctx) {
    _classCallCheck(this, Paddle);

    var _this = _possibleConstructorReturn(this, (Paddle.__proto__ || Object.getPrototypeOf(Paddle)).call(this, options));

    _this.image = new Image();
    _this.image.src = "./assets/images/paddle.png";
    _this.ctx = ctx;
    _this.image.onload = _this.draw;
    return _this;
  }

  _createClass(Paddle, [{
    key: "move",
    value: function move() {
      var timeDelta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.xPos += this.xVel * (timeDelta / 20);
      this.yPos += this.yVel * (timeDelta / 20);

      if (this.xPos + this.width > 700) {
        this.xPos = 700 - this.width;
      } else if (this.xPos < 0) {
        this.xPos = 0;
      }
    }
  }]);

  return Paddle;
}(_moving_object2.default);

exports.default = Paddle;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moving_object = __webpack_require__(1);

var _moving_object2 = _interopRequireDefault(_moving_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ball = function (_MovingObject) {
  _inherits(Ball, _MovingObject);

  function Ball(options, ctx) {
    _classCallCheck(this, Ball);

    var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this, options));

    _this.image = new Image();
    _this.image.src = "./assets/images/ball.png";
    _this.degree = 90 * (Math.PI / 180);
    _this.ctx = ctx;
    _this.lastXPos = _this.xPos;
    _this.lastYPos = _this.yPos;
    _this.image.onload = _this.draw;
    return _this;
  }

  _createClass(Ball, [{
    key: "move",
    value: function move() {
      var timeDelta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.lastXPos = this.xPos;
      this.lastYPos = this.yPos;
      this.xPos += this.xVel * (timeDelta / 20);
      this.yPos += this.yVel * (timeDelta / 20);

      this.bounceOffWalls();
      if (this.game.isOutOfBounds(this)) {
        this.clear();
      }
    }
  }, {
    key: "bounceOffWalls",
    value: function bounceOffWalls() {
      if (this.yPos <= 0) {
        this.yPos = 0;
        this.yVel = -this.yVel;
      } else if (this.xPos <= 0) {
        this.xPos = 0;
        this.xVel = -this.xVel;
      } else if (this.xPos + this.width >= 700) {
        this.xPos = 700 - this.width;
        this.xVel = -this.xVel;
      }
    }
  }, {
    key: "isCollidedWith",
    value: function isCollidedWith(otherObject) {
      if (this.xPos + this.width < otherObject.xPos || this.xPos > otherObject.xPos + otherObject.width || this.yPos + this.height < otherObject.yPos || this.yPos > otherObject.yPos + otherObject.height) {
        return false;
      }

      return true;
    }
  }, {
    key: "collideWith",
    value: function collideWith(brick) {
      if (this.xPos <= brick.xPos + brick.width && this.lastXPos > brick.xPos + brick.width) {
        this.xVel = Math.abs(this.xVel);
      } else if (this.xPos + this.width >= brick.xPos && this.lastXPos + this.width < brick.xPos) {
        this.xVel = -Math.abs(this.xVel);
      } else if (this.yPos + this.height >= brick.yPos && this.lastYPos + this.height < brick.yPos) {
        this.yVel = -Math.abs(this.yVel);
      } else {
        this.yVel = Math.abs(this.yVel);
      }
    }
  }, {
    key: "collideWithPaddle",
    value: function collideWithPaddle(paddle) {
      var newAngle = this.reboundAngle(paddle);
      this.speed = this.reboundSpeed(paddle);
      this.xVel = this.speed * Math.cos(newAngle);
      this.yVel = -this.speed * Math.sin(newAngle);
    }
  }, {
    key: "paddleCollisionPoint",
    value: function paddleCollisionPoint(paddle) {
      var hitPoint = this.xPos + this.width / 2;
      return (hitPoint - paddle.xPos) / paddle.width;
    }
  }, {
    key: "reboundAngle",
    value: function reboundAngle(paddle) {
      var angle = 150 - 120 * this.paddleCollisionPoint(paddle);
      return angle * (Math.PI / 180);
    }
  }, {
    key: "reboundSpeed",
    value: function reboundSpeed(paddle) {
      var collisionPoint = this.paddleCollisionPoint(paddle);

      if (collisionPoint <= 0.5) {
        return 10 - 6 * collisionPoint;
      } else {
        return 6 * collisionPoint + 4;
      }
    }
  }]);

  return Ball;
}(_moving_object2.default);

exports.default = Ball;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(game, ctx) {
    _classCallCheck(this, GameView);

    this.game = game;
    this.ctx = ctx;
    this.lastTime = null;
    this.moves = { "left": false, "right": false };
    this.movePaddle = this.movePaddle.bind(this);
    this.stopPaddle = this.stopPaddle.bind(this);
    this.animate = this.animate.bind(this);
  }

  _createClass(GameView, [{
    key: "start",
    value: function start() {
      document.addEventListener("keydown", this.movePaddle);
      document.addEventListener("keyup", this.stopPaddle);
      requestAnimationFrame(this.animate);
    }
  }, {
    key: "movePaddle",
    value: function movePaddle(e) {
      if (e.code === 'ArrowRight') {
        this.game.paddle.xVel = 10;
        this.moves["right"] = true;
      } else if (e.code === 'ArrowLeft') {
        this.game.paddle.xVel = -10;
        this.moves["left"] = true;
      }
    }
  }, {
    key: "stopPaddle",
    value: function stopPaddle(e) {
      if (e.code === 'ArrowRight') {
        this.moves["right"] = false;
      } else if (e.code === 'ArrowLeft') {
        this.moves["left"] = false;
      }

      if (this.moves["right"] === false && this.moves["left"] === false) {
        this.game.paddle.xVel = 0;
      } else if (this.moves["right"] === true) {
        this.game.paddle.xVel = 10;
      } else {
        this.game.paddle.xVel = -10;
      }
    }
  }, {
    key: "animate",
    value: function animate(currentTime) {
      if (!this.lastTime) this.lastTime = currentTime;
      var delta = currentTime - this.lastTime;
      this.lastTime = currentTime;
      if (delta > 1000 / 20) {
        delta = 0;
      }

      if (this.game.over()) {
        this.end();
      } else {
        this.game.step(delta);
        requestAnimationFrame(this.animate);
      }
    }
  }, {
    key: "end",
    value: function end() {
      if (this.game.won()) {
        this.promptPlayAgain("You Win!");
      } else {
        this.promptPlayAgain("Game Over!");
      }
    }
  }, {
    key: "promptPlayAgain",
    value: function promptPlayAgain(message) {
      var messageElement = document.getElementById('play-again message');
      var playAgainElement = document.getElementsByClassName('play-again')[0];
      var finalScore = document.getElementById('final-score');

      messageElement.textContent = message;
      finalScore.textContent = this.game.score;
      playAgainElement.className = 'play-again';
    }
  }]);

  return GameView;
}();

exports.default = GameView;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _brick = __webpack_require__(0);

var _brick2 = _interopRequireDefault(_brick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function level1(ctx) {
  var xPos = 25;
  var yPos = 50;
  var bricks = [];
  var colors = ['teal', 'red', 'yellow', 'blue', 'green'];

  for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 13; col++) {
      var brick = new _brick2.default(xPos, yPos, colors[row], ctx);
      bricks.push(brick);
      xPos += 50;
    }

    yPos += 25;
    xPos = 25;
  }

  return bricks;
}

function level2(ctx) {
  var xPos = 0;
  var yPos = 50;
  var bricks = [];
  var colors = ['red', 'yellow', 'orange', 'blue', 'pink', 'green', 'purple'];

  for (var row = 0; row < 12; row++) {
    for (var col = 0; col < row + 3; col++) {
      var color = colors[col % 7];
      if (row === 11) color = 'teal';
      var brick = new _brick2.default(xPos, yPos, color, ctx);
      bricks.push(brick);
      xPos += 50;
    }

    yPos += 25;
    xPos = 0;
  }

  return bricks;
}

function level3(ctx) {
  var xPos = 0;
  var yPos = 25;
  var bricks = [];
  var colors = ['red', 'purple', 'green'];

  for (var row = 0; row < 12; row++) {
    yPos += 25;
    xPos = 0;
    if (row % 2 !== 0) continue;

    for (var col = 0; col < 15; col++) {
      var color = colors[row % 3];
      if (row % 4 === 0) color = 'teal';
      var brick = new _brick2.default(xPos, yPos, color, ctx);
      bricks.push(brick);
      xPos += 50;
    }
  }

  return bricks;
}

function level4(ctx) {
  var xPos = 25;
  var yPos = 25;
  var bricks = [];

  for (var row = 0; row < 13; row++) {
    for (var col = 0; col < 13; col++) {

      if (col === 6) {
        xPos += 50;
        continue;
      }

      var color = void 0;
      if (row === 0 || row === 12 || col === 0 || col === 12 || col === 5 || col === 7) {
        color = 'teal';
      } else {
        color = 'red';
      }
      var brick = new _brick2.default(xPos, yPos, color, ctx);
      bricks.push(brick);
      xPos += 50;
    }

    yPos += 25;
    xPos = 25;
  }

  return bricks;
}

var levels = {
  1: level1,
  2: level2,
  3: level3,
  4: level4
};

exports.default = levels;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map