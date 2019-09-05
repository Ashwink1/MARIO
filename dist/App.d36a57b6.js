// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"utils/Collision.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkCollision;

function checkCollision(game, mario) {
  var isMarioFetchFood = checkElementsCollision(game.Food, mario);
  var isPoisionCollided = game.poisions.find(function (element) {
    return checkElementsCollision(element, mario);
  });
  return {
    mashroom: isMarioFetchFood,
    poision: Boolean(isPoisionCollided)
  };
}

function checkElementsCollision(element1, element2) {
  var rect1 = {
    x: element1.position.x,
    y: element1.position.y,
    width: element1.myWidth,
    height: element1.myWidth
  };
  var rect2 = {
    x: element2.position.x,
    y: element2.position.y,
    width: element2.myWidth,
    height: element2.myWidth
  };

  if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y) {
    // collision detected!
    return true;
  }

  return false;
}
},{}],"controller/Mario.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Collision = _interopRequireDefault(require("../utils/Collision.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mario =
/*#__PURE__*/
function () {
  function Mario(game) {
    _classCallCheck(this, Mario);

    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.maxSpeed = 2;
    this.hSpeed = 0;
    this.vSpeed = 0;
    this.myWidth = 20;
    this.position = {
      x: 0,
      y: 0
    };
    this.image = document.getElementById('mario');
  }

  _createClass(Mario, [{
    key: "moveLeft",
    value: function moveLeft() {
      this.hSpeed = -this.maxSpeed;
      this.vSpeed = 0;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.hSpeed = this.maxSpeed;
      this.vSpeed = 0;
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this.vSpeed = -this.maxSpeed;
      this.hSpeed = 0;
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      this.vSpeed = this.maxSpeed;
      this.hSpeed = 0;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.myWidth, this.myWidth);
    }
  }, {
    key: "update",
    value: function update() {
      if (this.position.x < 0) {
        this.position.x = 0;
        this.hSpeed = 0;
        return;
      }

      if (this.position.y < 0) {
        this.position.y = 0;
        this.vSpeed = 0;
        return;
      }

      if (this.position.x > this.gameWidth - this.myWidth) {
        this.position.x = this.gameWidth - this.myWidth;
        this.hSpeed = 0;
        return;
      }

      if (this.position.y > this.gameHeight - this.myWidth) {
        this.position.y = this.gameHeight - this.myWidth;
        this.vSpeed = 0;
        return;
      }

      var isCollided = (0, _Collision.default)(this.game, this);

      if (isCollided.mashroom) {
        this.game.Food.update();
        this.game.point++;
      }

      if (isCollided.poision) {
        alert("Points : " + this.game.point);
        this.game.init();
        return;
      }

      this.position.x += this.hSpeed;
      this.position.y += this.vSpeed;
    }
  }]);

  return Mario;
}();

exports.default = Mario;
},{"../utils/Collision.js":"utils/Collision.js"}],"controller/Mushroom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

var Mushroom =
/*#__PURE__*/
function () {
  function Mushroom(game) {
    _classCallCheck(this, Mushroom);

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.myWidth = 20;
    this.image = document.getElementById('mushroom');
    this.position = {
      x: getRandomInRange(this.myWidth, this.gameWidth - this.myWidth, 0),
      y: getRandomInRange(this.myWidth, this.gameHeight - this.myWidth, 0)
    };
    this.generateXandY = this.generateXandY.bind(this);
  }

  _createClass(Mushroom, [{
    key: "generateXandY",
    value: function generateXandY() {
      var x = getRandomInRange(this.myWidth, this.gameWidth - this.myWidth, 0);
      var y = getRandomInRange(this.myWidth, this.gameHeight - this.myWidth, 0);
      var pos = {
        x: x,
        y: y
      };

      if (pos.x === this.position.x || pos.y === this.position.y) {
        pos = this.generateXandY();
      }

      ;
      return pos;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.myWidth, this.myWidth);
    }
  }, {
    key: "update",
    value: function update() {
      var pos = this.generateXandY();
      this.position = {
        x: pos.x,
        y: pos.y
      };
    }
  }]);

  return Mushroom;
}();

exports.default = Mushroom;
},{}],"controller/Poision.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

var Poison =
/*#__PURE__*/
function () {
  function Poison(game) {
    _classCallCheck(this, Poison);

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.myWidth = 20;
    this.image = document.getElementById('poison');
    this.position = {
      x: getRandomInRange(this.myWidth, this.gameWidth - this.myWidth, 0),
      y: getRandomInRange(this.myWidth, this.gameHeight - this.myWidth, 0)
    };
    this.generateXandY = this.generateXandY.bind(this);
  }

  _createClass(Poison, [{
    key: "generateXandY",
    value: function generateXandY() {
      var x = getRandomInRange(this.myWidth, this.gameWidth - this.myWidth, 0);
      var y = getRandomInRange(this.myWidth, this.gameHeight - this.myWidth, 0);
      var pos = {
        x: x,
        y: y
      };

      if (pos.x === this.position.x || pos.y === this.position.y) {
        pos = this.generateXandY();
      }

      ;
      return pos;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.myWidth, this.myWidth);
    }
  }, {
    key: "update",
    value: function update() {
      var pos = this.generateXandY();
      this.position = {
        x: pos.x,
        y: pos.y
      };
    }
  }]);

  return Poison;
}();

exports.default = Poison;
},{}],"utils/InputHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImputHandler = function ImputHandler(MarioMan) {
  _classCallCheck(this, ImputHandler);

  document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
      case 37:
        MarioMan.moveLeft();
        break;

      case 39:
        MarioMan.moveRight();
        break;

      case 38:
        MarioMan.moveDown();
        break;

      case 40:
        MarioMan.moveUp();
        break;
    }
  });
};

exports.default = ImputHandler;
},{}],"controller/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Mario = _interopRequireDefault(require("./Mario.js"));

var _Mushroom = _interopRequireDefault(require("./Mushroom.js"));

var _Poision = _interopRequireDefault(require("./Poision.js"));

var _InputHandler = _interopRequireDefault(require("../utils/InputHandler.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(gameWidth, gameHeight) {
    _classCallCheck(this, Game);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.point = 0;
    this.poisions = [];
  }

  _createClass(Game, [{
    key: "init",
    value: function init() {
      this.MarioMan = new _Mario.default(this);
      this.Food = new _Mushroom.default(this);
      this.poisions = [];

      for (var i = 0; i < 3; i++) {
        this.poisions.push(new _Poision.default(this));
      }

      new _InputHandler.default(this.MarioMan);
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      this.MarioMan.draw(ctx);
      this.Food.draw(ctx);
      this.poisions.forEach(function (element) {
        element.draw(ctx);
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.MarioMan.update();
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"./Mario.js":"controller/Mario.js","./Mushroom.js":"controller/Mushroom.js","./Poision.js":"controller/Poision.js","../utils/InputHandler.js":"utils/InputHandler.js"}],"constants/index.js":[function(require,module,exports) {
var GAME_WIDTH = 300;
var GAME_HEIGHT = 100;
module.exports = {
  GAME_WIDTH: GAME_WIDTH,
  GAME_HEIGHT: GAME_HEIGHT
};
},{}],"App.js":[function(require,module,exports) {
"use strict";

var _Game = _interopRequireDefault(require("./controller/Game.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./style.css');

var _require = require("./constants"),
    GAME_WIDTH = _require.GAME_WIDTH,
    GAME_HEIGHT = _require.GAME_HEIGHT;

console.log(GAME_WIDTH, GAME_HEIGHT);

window.onload = function () {
  var canvas = document.getElementById('gameScreen');
  var ctx = canvas.getContext('2d');
  var lastTime = 0;
  var Gamer = new _Game.default(GAME_WIDTH, GAME_HEIGHT);
  Gamer.init();

  function gameLoop() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    Gamer.update();
    Gamer.draw(ctx);
    window.lastTime = requestAnimationFrame(gameLoop);
  }

  gameLoop();
};
},{"./style.css":"style.css","./controller/Game.js":"controller/Game.js","./constants":"constants/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62476" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","App.js"], null)
//# sourceMappingURL=/App.d36a57b6.js.map