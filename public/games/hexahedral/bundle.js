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
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var diff = __webpack_require__(42)
var patch = __webpack_require__(45)
var h = __webpack_require__(51)
var create = __webpack_require__(60)
var VNode = __webpack_require__(23)
var VText = __webpack_require__(24)

module.exports = {
    diff: diff,
    patch: patch,
    h: h,
    create: create,
    VNode: VNode,
    VText: VText
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadLevel;
/* harmony export (immutable) */ __webpack_exports__["b"] = move;
/* harmony export (immutable) */ __webpack_exports__["c"] = moveTo;
/* harmony export (immutable) */ __webpack_exports__["d"] = reset;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__levels__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_actions__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_audio__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_misc__ = __webpack_require__(6);








// Loads the given level.
function loadLevel(levelNumber) {
  var levelExists = levelNumber in __WEBPACK_IMPORTED_MODULE_0__levels__["a" /* default */];

  if (!levelExists) {
    Object(__WEBPACK_IMPORTED_MODULE_3__util__["d" /* log */])('warn', 'There is no level ' + levelNumber + '.');
    levelNumber = 0;
  }

  __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch({ type: __WEBPACK_IMPORTED_MODULE_4__constants_actions__["a" /* LOAD_LEVEL */], levelNumber: levelNumber });
}

// Moves the player up, down, left, or right.
function move(rowDelta, columnDelta) {
  var _store$getState = __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].getState(),
      playerPosition = _store$getState.playerPosition;

  var row = playerPosition.row + rowDelta;
  var column = playerPosition.column + columnDelta;
  moveTo(row, column);
}

// Moves the player to a specific location.
function moveTo(row, column) {
  var state = __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].getState();

  if (!Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* canMoveTo */])(state, row, column)) {
    return;
  }

  var invalidMoveDistance = Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["b" /* distanceFromPlayer */])(state, row, column) !== 1;

  // Ensure player only move one spot at a time.
  if (invalidMoveDistance) {
    return;
  }

  __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch({ type: __WEBPACK_IMPORTED_MODULE_4__constants_actions__["c" /* MOVE */], row: row, column: column });
  Object(__WEBPACK_IMPORTED_MODULE_3__util__["e" /* playSoundEffect */])(__WEBPACK_IMPORTED_MODULE_5__constants_audio__["b" /* MOVE_AUDIO */]);
  checkForWinOrLoss();
}

// Resets the current level.
function reset() {
  var _store$getState2 = __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].getState(),
      currentLevelNumber = _store$getState2.currentLevelNumber;

  loadLevel(currentLevelNumber);
}

// Checks whether the level has been won or lost.
function checkForWinOrLoss() {
  var state = __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].getState();

  if (Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["d" /* winConditionsMet */])(state)) {
    win();
  } else if (Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["c" /* maxMovesMet */])(state)) {
    lose();
  }
}

// Loads the next level after a pause.
function loadNextLevelAfterDelay() {
  var _store$getState3 = __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].getState(),
      currentLevelNumber = _store$getState3.currentLevelNumber;

  var nextLevelNumber = currentLevelNumber + 1;
  setTimeout(function () {
    return loadLevel(nextLevelNumber);
  }, __WEBPACK_IMPORTED_MODULE_6__constants_misc__["a" /* NEXT_LEVEL_DELAY */]);
}

// Admonishes the player then restarts the current level.
function lose() {
  __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch({ type: __WEBPACK_IMPORTED_MODULE_4__constants_actions__["b" /* LOSE */] });
  Object(__WEBPACK_IMPORTED_MODULE_3__util__["e" /* playSoundEffect */])(__WEBPACK_IMPORTED_MODULE_5__constants_audio__["a" /* LOSE_AUDIO */]);
  resetAfterDelay();
}

// Reloads the current level after a pause.
function resetAfterDelay() {
  setTimeout(reset, __WEBPACK_IMPORTED_MODULE_6__constants_misc__["a" /* NEXT_LEVEL_DELAY */]);
}

// Congratulates the player then move onto the next level.
function win() {
  var _store$getState4 = __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].getState(),
      moveCount = _store$getState4.moveCount;

  Object(__WEBPACK_IMPORTED_MODULE_3__util__["d" /* log */])('info', 'Completed in ' + moveCount + ' moves.');
  __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch({ type: __WEBPACK_IMPORTED_MODULE_4__constants_actions__["d" /* WIN */] });
  Object(__WEBPACK_IMPORTED_MODULE_3__util__["e" /* playSoundEffect */])(__WEBPACK_IMPORTED_MODULE_5__constants_audio__["c" /* WIN_AUDIO */]);
  loadNextLevelAfterDelay();
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "2"


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(3)

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EASY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MEDIUM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HARD; });
var EASY = 'EASY';
var MEDIUM = 'MEDIUM';
var HARD = 'HARD';

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NEXT_LEVEL_DELAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PROGRESS_STEP_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SQUARE_SIZE; });
var NEXT_LEVEL_DELAY = 2000;
var PROGRESS_STEP_SIZE = 1.1;
var SQUARE_SIZE = 10;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(3)

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DIFFICULTY_LABELS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return STARTING_LEVEL_NUMBERS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_difficulty_levels__ = __webpack_require__(5);
var _DIFFICULTY_LABELS, _STARTING_LEVEL_NUMBE;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var DIFFICULTY_LABELS = (_DIFFICULTY_LABELS = {}, _defineProperty(_DIFFICULTY_LABELS, __WEBPACK_IMPORTED_MODULE_0__constants_difficulty_levels__["a" /* EASY */], 'Easy'), _defineProperty(_DIFFICULTY_LABELS, __WEBPACK_IMPORTED_MODULE_0__constants_difficulty_levels__["c" /* MEDIUM */], 'Medium'), _defineProperty(_DIFFICULTY_LABELS, __WEBPACK_IMPORTED_MODULE_0__constants_difficulty_levels__["b" /* HARD */], 'Hard'), _DIFFICULTY_LABELS);

var STARTING_LEVEL_NUMBERS = (_STARTING_LEVEL_NUMBE = {}, _defineProperty(_STARTING_LEVEL_NUMBE, __WEBPACK_IMPORTED_MODULE_0__constants_difficulty_levels__["a" /* EASY */], 0), _defineProperty(_STARTING_LEVEL_NUMBE, __WEBPACK_IMPORTED_MODULE_0__constants_difficulty_levels__["c" /* MEDIUM */], 10), _defineProperty(_STARTING_LEVEL_NUMBE, __WEBPACK_IMPORTED_MODULE_0__constants_difficulty_levels__["b" /* HARD */], 20), _STARTING_LEVEL_NUMBE);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createReducer;
/* harmony export (immutable) */ __webpack_exports__["b"] = findDistance;
/* harmony export (immutable) */ __webpack_exports__["c"] = levelNumbersInDifficulty;
/* harmony export (immutable) */ __webpack_exports__["d"] = log;
/* harmony export (immutable) */ __webpack_exports__["e"] = playSoundEffect;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__levels__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_difficulty_levels__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_prefs__ = __webpack_require__(32);




var allLevelNumbers = __WEBPACK_IMPORTED_MODULE_0__levels__["a" /* default */].map(function (level, levelNumber) {
  return levelNumber;
});
var isChrome = navigator.userAgent.toLowerCase().includes('chrome');

// Creates a Redux reducer that maps action types to handlers.
function createReducer(initialState) {
  var handlers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // Adapted from http://redux.js.org/docs/recipes/ReducingBoilerplate.html.
  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var handler = handlers[action.type];

    if (!handler) {
      return state;
    }

    return handler(state, action);
  };

  return reducer;
}

// Determines the distance between two points (i.e. with no diagonal movement).
function findDistance(position1, position2) {
  var rowDistance = Math.abs(position1.row - position2.row);
  var columnDistance = Math.abs(position1.column - position2.column);
  var distance = rowDistance + columnDistance;
  return distance;
}

// Gets the level numbers that are part of the given difficulty range.
function levelNumbersInDifficulty(difficulty) {
  var levelNumbers = [];

  switch (difficulty) {
    case __WEBPACK_IMPORTED_MODULE_1__constants_difficulty_levels__["a" /* EASY */]:
      levelNumbers = allLevelNumbers.slice(0, 10);
      break;

    case __WEBPACK_IMPORTED_MODULE_1__constants_difficulty_levels__["c" /* MEDIUM */]:
      levelNumbers = allLevelNumbers.slice(10, 20);
      break;

    case __WEBPACK_IMPORTED_MODULE_1__constants_difficulty_levels__["b" /* HARD */]:
      levelNumbers = allLevelNumbers.slice(20, 30);
      break;
  }

  return levelNumbers;
}

// Logs a console message.
function log(consoleFunction) {
  var _console;

  if (!__WEBPACK_IMPORTED_MODULE_2__constants_prefs__["b" /* DEV_MODE_ENABLED */]) {
    return;
  }

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  (_console = console)[consoleFunction].apply(_console, args);
}

// Plays an audio clip from the beginning.
function playSoundEffect(audio) {
  if (__WEBPACK_IMPORTED_MODULE_2__constants_prefs__["a" /* AUDIO_DISABLED */]) {
    return;
  }

  // This is horrible, but currently audio really slows down Safari.
  // In lieu of a better solution just disable it.
  if (!isChrome) {
    return;
  }

  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Splits level rows into individual tiles.
function createLevelTiles(rows) {
  var levelTiles = rows.map(function (row) {
    return row.split('');
  });
  return levelTiles;
}

var levels = [
// Easy:

{
  maxMoves: 3,
  playerPosition: { row: 0, column: 1 },
  tiles: createLevelTiles(['0_', '00'])
}, {
  maxMoves: 4,
  playerPosition: { row: 1, column: 0 },
  tiles: createLevelTiles(['_0', '0x'])
}, {
  maxMoves: 8,
  playerPosition: { row: 2, column: 0 },
  tiles: createLevelTiles(['_00', '00x', '0_0'])
}, {
  maxMoves: 8,
  playerPosition: { row: 0, column: 1 },
  tiles: createLevelTiles(['_00', '0x0', '_00'])
}, {
  maxMoves: 6,
  playerPosition: { row: 1, column: 1 },
  tiles: createLevelTiles(['_0x', '0_0', 'x_0'])
}, {
  maxMoves: 7,
  playerPosition: { row: 2, column: 2 },
  tiles: createLevelTiles(['_x0', '000', '_x0'])
}, {
  maxMoves: 8,
  playerPosition: { row: 2, column: 1 },
  tiles: createLevelTiles(['00_', '0x_', '_x0'])
}, {
  maxMoves: 10,
  playerPosition: { row: 1, column: 1 },
  tiles: createLevelTiles(['00x', '0_0', '0x0'])
}, {
  maxMoves: 12,
  playerPosition: { row: 0, column: 2 },
  tiles: createLevelTiles(['x0_', '0x_', '___'])
}, {
  maxMoves: 12,
  playerPosition: { row: 0, column: 2 },
  tiles: createLevelTiles(['0_0', '_x_', '0_0'])
},

// Medium:

{
  maxMoves: 12,
  playerPosition: { row: 0, column: 2 },
  tiles: createLevelTiles(['_0__', 'x_x_', '0_00', '0000'])
}, {
  maxMoves: 13,
  playerPosition: { row: 3, column: 3 },
  tiles: createLevelTiles(['__x0', 'x___', '0_x0', '_x00'])
}, {
  maxMoves: 10,
  playerPosition: { row: 2, column: 1 },
  tiles: createLevelTiles(['_x00', '0_0_', 'x_0_', '_0__'])
}, {
  maxMoves: 11,
  playerPosition: { row: 2, column: 3 },
  tiles: createLevelTiles(['x00x', '_000', 'x_0x', '0_xx'])
}, {
  maxMoves: 12,
  playerPosition: { row: 3, column: 0 },
  tiles: createLevelTiles(['000_', '0x_0', '00_0', '_x__'])
}, {
  maxMoves: 9,
  playerPosition: { row: 1, column: 2 },
  tiles: createLevelTiles(['__0_', 'x000', '_00_', '_0__'])
}, {
  maxMoves: 17,
  playerPosition: { row: 0, column: 1 },
  tiles: createLevelTiles(['00__', 'x_x_', 'x_x0', 'x0x0'])
}, {
  maxMoves: 20,
  playerPosition: { row: 2, column: 1 },
  tiles: createLevelTiles(['00x0', 'x000', '00x0', '00x0'])
}, {
  maxMoves: 13,
  playerPosition: { row: 2, column: 1 },
  tiles: createLevelTiles(['_x00', '00_0', '_x0x', '000_'])
}, {
  maxMoves: 12,
  playerPosition: { row: 2, column: 2 },
  tiles: createLevelTiles(['0_00', '_0_0', '____', '0___'])
},

// Hard:

{
  maxMoves: 17,
  playerPosition: { row: 3, column: 4 },
  tiles: createLevelTiles(['__0__', '_xx_x', '0_0_0', 'x0xxx', '_0000'])
}, {
  maxMoves: 21,
  playerPosition: { row: 2, column: 3 },
  tiles: createLevelTiles(['00000', 'x_0_0', '0_0_0', '0_x_0', '00000'])
}, {
  maxMoves: 27,
  playerPosition: { row: 2, column: 0 },
  tiles: createLevelTiles(['x0000', '00x00', 'x0_00', '0__00', '00000'])
}, {
  maxMoves: 27,
  playerPosition: { row: 2, column: 1 },
  tiles: createLevelTiles(['00000', 'x0x00', 'x000_', '00x00', '_0000'])
}, {
  maxMoves: 21,
  playerPosition: { row: 4, column: 2 },
  tiles: createLevelTiles(['___00', '0x0x0', '_x_x0', '_x0x0', '0__00'])
}, {
  maxMoves: 20,
  playerPosition: { row: 2, column: 2 },
  tiles: createLevelTiles(['00_00', '0_0_0', '000__', '___00', 'x__00'])
}, {
  maxMoves: 24,
  playerPosition: { row: 2, column: 2 },
  tiles: createLevelTiles(['00_00', '0x_x0', '__000', '0x_x_', '0_0__'])
}, {
  maxMoves: 23,
  playerPosition: { row: 1, column: 3 },
  tiles: createLevelTiles(['00x00', '00_x0', '0x_0_', '000_0', 'x____'])
}, {
  maxMoves: 17,
  playerPosition: { row: 3, column: 3 },
  tiles: createLevelTiles(['00_xx', '0___x', '____0', '_00x0', '_00_x'])
}, {
  maxMoves: 23,
  playerPosition: { row: 2, column: 3 },
  tiles: createLevelTiles(['___00', '0000_', '0x0x_', '00x__', '_00_0'])
}];

/* harmony default export */ __webpack_exports__["a"] = (levels);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LOST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MAIN_MENU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PLAYING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return WON; });
var LOST = 'LOST';
var MAIN_MENU = 'MAIN_MENU';
var PLAYING = 'PLAYING';
var WON = 'WON';

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PRESSED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UNPRESSED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BROKEN; });
var PRESSED = '_';
var UNPRESSED = '0';
var BROKEN = 'x';

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(3)

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var isVNode = __webpack_require__(4)
var isVText = __webpack_require__(7)
var isWidget = __webpack_require__(1)
var isThunk = __webpack_require__(8)

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = __webpack_require__(47);

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(20)

var applyProperties = __webpack_require__(22)

var isVNode = __webpack_require__(4)
var isVText = __webpack_require__(7)
var isWidget = __webpack_require__(1)
var handleThunk = __webpack_require__(18)

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(19)
var isHook = __webpack_require__(9)

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous)
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined)
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue)
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                node.setAttribute(attrName, attrValue)
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(3)
var isVNode = __webpack_require__(4)
var isWidget = __webpack_require__(1)
var isThunk = __webpack_require__(8)
var isVHook = __webpack_require__(9)

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var hasThunks = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hasThunks = hasThunks
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var version = __webpack_require__(3)

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducers__ = __webpack_require__(80);



var rootReducer = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["a" /* combineReducers */])(__WEBPACK_IMPORTED_MODULE_1__reducers__);
/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_redux__["b" /* createStore */])(rootReducer));

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(72);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(66);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AUDIO_DISABLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DEV_MODE_ENABLED; });
var AUDIO_DISABLED = localStorage.getItem('audioDisabled') === 'true';
var DEV_MODE_ENABLED = localStorage.getItem('devMode') === 'true';

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LOAD_LEVEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LOSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return WIN; });
var LOAD_LEVEL = 'LOAD_LEVEL';
var LOSE = 'LOSE';
var MOVE = 'MOVE';
var WIN = 'WIN';

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_css__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__main_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fastclick__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fastclick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fastclick__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_game_statuses__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_key_codes__ = __webpack_require__(92);
var _keyHandlers;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var keyHandlers = (_keyHandlers = {}, _defineProperty(_keyHandlers, __WEBPACK_IMPORTED_MODULE_6__constants_key_codes__["b" /* LEFT */], function () {
  return Object(__WEBPACK_IMPORTED_MODULE_4__game__["b" /* move */])(0, -1);
}), _defineProperty(_keyHandlers, __WEBPACK_IMPORTED_MODULE_6__constants_key_codes__["e" /* UP */], function () {
  return Object(__WEBPACK_IMPORTED_MODULE_4__game__["b" /* move */])(-1, 0);
}), _defineProperty(_keyHandlers, __WEBPACK_IMPORTED_MODULE_6__constants_key_codes__["d" /* RIGHT */], function () {
  return Object(__WEBPACK_IMPORTED_MODULE_4__game__["b" /* move */])(0, 1);
}), _defineProperty(_keyHandlers, __WEBPACK_IMPORTED_MODULE_6__constants_key_codes__["a" /* DOWN */], function () {
  return Object(__WEBPACK_IMPORTED_MODULE_4__game__["b" /* move */])(1, 0);
}), _defineProperty(_keyHandlers, __WEBPACK_IMPORTED_MODULE_6__constants_key_codes__["c" /* R */], __WEBPACK_IMPORTED_MODULE_4__game__["d" /* reset */]), _keyHandlers);

var keysCurrentlyPressed = new Set();

document.addEventListener('keydown', function (evt) {
  var keyCode = evt.keyCode;

  // Prevent keys from repeating.

  if (keysCurrentlyPressed.has(keyCode)) {
    return;
  }

  var isPlaying = __WEBPACK_IMPORTED_MODULE_3__store__["a" /* default */].getState().status === __WEBPACK_IMPORTED_MODULE_5__constants_game_statuses__["c" /* PLAYING */];

  // Ignore key presses when we're transitioning between levels.
  if (!isPlaying) {
    return;
  }

  var handler = keyHandlers[keyCode];

  // Ignore keys that we lack a handler for.
  if (!handler) {
    return;
  }

  handler();
  keysCurrentlyPressed.add(keyCode);

  evt.preventDefault();
  evt.stopPropagation();
});

document.addEventListener('keyup', function (evt) {
  keysCurrentlyPressed.delete(evt.keyCode);
});

// Provides the UI with the game state.
function renderProps() {
  var props = __WEBPACK_IMPORTED_MODULE_3__store__["a" /* default */].getState();
  Object(__WEBPACK_IMPORTED_MODULE_2__render__["a" /* default */])(props);
}

__WEBPACK_IMPORTED_MODULE_1_fastclick___default.a.attach(document.body);
__WEBPACK_IMPORTED_MODULE_3__store__["a" /* default */].subscribe(renderProps);
renderProps();

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(38)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/lib/index.js??ref--1-2!./main.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/lib/index.js??ref--1-2!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(37)(undefined);
// imports


// module
exports.push([module.i, ":root {\n\n  /* Colors */\n\n  /* Sizes */\n}\n\n@-webkit-keyframes breathe {\n  50% { -webkit-transform: translateZ(8rem) scale(0.95); transform: translateZ(8rem) scale(0.95); }\n}\n\n@keyframes breathe {\n  50% { -webkit-transform: translateZ(8rem) scale(0.95); transform: translateZ(8rem) scale(0.95); }\n}\n\n@-webkit-keyframes player-bob {\n  50% { -webkit-transform: translateZ(14rem); transform: translateZ(14rem); }\n}\n\n@keyframes player-bob {\n  50% { -webkit-transform: translateZ(14rem); transform: translateZ(14rem); }\n}\n\n*,\n*::before,\n*::after {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  outline: none;\n}\n\nhtml, body {\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n}\n\nhtml {\n  /* Sets up font size so that 1rem = 10px. */\n  font-size: 62.5%;\n}\n\nbody {\n  background-color: #433C38;\n  background-image: radial-gradient(circle, #433C38, black);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  font-family: -apple-system, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  opacity: 1;\n  overflow: hidden;\n  padding: 0;\n  -webkit-transition: opacity 1s;\n  transition: opacity 1s;\n}\n\nbutton {\n  cursor: pointer;\n}\n\nheader {\n  background-color: #00B3C5;\n  border: 2px solid white;\n  border: 0.2rem solid white;\n  border-radius: 2rem;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  height: 20px;\n  height: 2rem;\n  margin: 0 auto;\n  margin-top: 20px;\n  margin-top: 2rem;\n  opacity: 0.95;\n  overflow: hidden;\n}\n\nfooter {\n  color: white;\n  display: block;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  font-size: 12px;\n  font-size: 1.2rem;\n  font-weight: 300;\n  margin-bottom: 20px;\n  margin-bottom: 2rem;\n  margin-top: auto;\n  opacity: 0.95;\n  text-align: center\n}\n\nfooter a { color: white; border-bottom: 2px solid transparent; border-bottom: 0.2rem solid transparent; font-weight: 500; text-decoration: none; -webkit-transition: border-bottom-color 0.1s; transition: border-bottom-color 0.1s;\n}\n\nfooter a:hover { border-bottom-color: white;\n}\n\nmain {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  position: relative;\n}\n\nnav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-bottom: 10px;\n  margin-bottom: 1rem;\n  margin-left: auto;\n  margin-right: auto;\n  opacity: 0.95;\n  text-align: center;\n}\n\n#game {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-transition: -webkit-filter 0.5s;\n  transition: -webkit-filter 0.5s;\n  transition: filter 0.5s;\n  transition: filter 0.5s, -webkit-filter 0.5s\n}\n\n#game.won { filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feGaussianBlur stdDeviation=\"4.8\" /></filter></svg>#filter'); -webkit-filter: blur(3px); filter: blur(3px); -webkit-filter: blur(0.3rem); filter: blur(0.3rem);\n}\n\n#game.lost { filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feGaussianBlur stdDeviation=\"4.8\" /><feColorMatrix type=\"matrix\" color-interpolation-filters=\"sRGB\" values=\"0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0\" /></filter></svg>#filter'); -webkit-filter: blur(3px) grayscale(100%); filter: blur(3px) grayscale(100%); -webkit-filter: blur(0.3rem) grayscale(100%); filter: blur(0.3rem) grayscale(100%);\n}\n\n.cell,\n.cell::after,\n.cell::before {\n  /* Helps hide the seams between the planes. */\n  -webkit-box-shadow: inset 0 0 0 0.2rem hsla(0, 0%, 100%, 1);\n          box-shadow: inset 0 0 0 0.2rem hsla(0, 0%, 100%, 1);\n  content: '';\n  height: 90px;\n  height: 9rem;\n  opacity: 0.95;\n  position: absolute;\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n  -webkit-transition: all 0.1s;\n  transition: all 0.1s;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  width: 90px;\n  width: 9rem;\n}\n\n.cell {\n  margin: 10px;\n  margin: 1rem;\n  -webkit-transform: translateZ(5rem);\n          transform: translateZ(5rem);\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d\n\n  /* Left */\n}\n\n.cell::after { -webkit-transform: rotateX(-90deg) translateY(9rem); transform: rotateX(-90deg) translateY(9rem); -webkit-transform-origin: 100% 100%; transform-origin: 100% 100%;\n}\n\n.cell {\n\n  /* Right */\n}\n\n.cell::before { -webkit-transform: rotateY(90deg) translateX(9rem); transform: rotateY(90deg) translateX(9rem); -webkit-transform-origin: 100% 0; transform-origin: 100% 0;\n}\n\n.cell.pressed { background-color: #00B3C5;\n}\n\n.cell.pressed::after { background-color: rgb(18, 184, 201);\n}\n\n.cell.pressed::before { background-color: rgb(36, 190, 205);\n}\n\n.cell.unpressed { -webkit-animation: breathe 2s ease-in-out infinite; animation: breathe 2s ease-in-out infinite; background-color: #D32D8F; -webkit-transform: translateZ(8rem); transform: translateZ(8rem);\n}\n\n.cell.unpressed::after { background-color: rgb(214, 60, 151);\n}\n\n.cell.unpressed::before { background-color: rgb(217, 74, 159);\n}\n\n.cell.broken { background-color: #CCB6A0;\n}\n\n.cell.broken::after { background-color: rgb(208, 187, 167);\n}\n\n.cell.broken::before { background-color: rgb(211, 192, 173);\n}\n\n.difficulty-buttons {\n  -webkit-animation: breathe 2s ease-in-out infinite;\n          animation: breathe 2s ease-in-out infinite;\n  margin: auto;\n  opacity: 0.95;\n  padding: 20px;\n  padding: 2rem;\n  text-align: center\n}\n\n.difficulty-buttons:hover { -webkit-animation-play-state: paused; animation-play-state: paused;\n}\n\n.difficulty-button {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  background-color: #00B3C5;\n  border: 2px solid white;\n  border: 0.2rem solid white;\n  border-radius: 2.5rem;\n  color: white;\n  display: block;\n  padding: 10px 60px;\n  padding: 1rem 6rem;\n  font-size: 20px;\n  font-size: 2rem;\n  font-weight: 500;\n  height: 50px;\n  height: 5rem;\n  margin-bottom: 10px;\n  margin-bottom: 1rem;\n  -webkit-transition: -webkit-transform 0.1s;\n  transition: -webkit-transform 0.1s;\n  transition: transform 0.1s;\n  transition: transform 0.1s, -webkit-transform 0.1s;\n  width: 100%\n}\n\n.difficulty-button:hover { -webkit-transform: scale(1.1); transform: scale(1.1);\n}\n\n.difficulty-button:nth-child(1) { background-color: #6EBD4B;\n}\n\n.difficulty-button:nth-child(2) { background-color: #00B3C5;\n}\n\n.difficulty-button:nth-child(3) { background-color: #D32D8F;\n}\n\n.difficulty-button:last-child { margin-bottom: 0;\n}\n\n.difficulty-row {\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  white-space: nowrap;\n}\n\n.difficulty-selector {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  background-color: transparent;\n  border: 2px solid white;\n  border: 0.2rem solid white;\n  border-radius: 1rem;\n  color: white;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  font-weight: 500;\n  height: 20px;\n  height: 2rem;\n  margin: 0 4px;\n  margin: 0 0.4rem;\n  margin-bottom: 10px;\n  margin-bottom: 1rem;\n  padding: 0 10px;\n  padding: 0 1rem;\n  -webkit-transition: -webkit-transform 0.1s;\n  transition: -webkit-transform 0.1s;\n  transition: transform 0.1s;\n  transition: transform 0.1s, -webkit-transform 0.1s\n}\n\n.difficulty-selector:hover { -webkit-transform: scale(1.1); transform: scale(1.1);\n}\n\n.level {\n  left: 50%;\n  margin: auto;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg);\n          transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg);\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  -webkit-transition: all 0.2s;\n  transition: all 0.2s;\n}\n\n.level-button {\n  background-color: transparent;\n  border: 2px solid white;\n  border: 0.2rem solid white;\n  border-radius: 50%;\n  cursor: default;\n  height: 20px;\n  height: 2rem;\n  padding: 0;\n  margin: 0 4px;\n  margin: 0 0.4rem;\n  margin-bottom: 10px;\n  margin-bottom: 1rem;\n  -webkit-transition: all 0.1s;\n  transition: all 0.1s;\n  width: 20px;\n  width: 2rem;\n\n  /* Hide text. */\n  text-indent: 100%;\n  overflow: hidden;\n  white-space: nowrap\n}\n\n.level-button.complete { background-color: #00B3C5;\n}\n\n.level-button.current { background-color: #D32D8F;\n}\n\n.level-button.complete,\n  .level-button.current { cursor: pointer;\n}\n\n.level-button.complete:hover, .level-button.current:hover { -webkit-transform: scale(1.2); transform: scale(1.2);\n}\n\n.player,\n.player::after,\n.player::before {\n  /* Helps hide the seams between the planes. */\n  -webkit-box-shadow: inset 0 0 0 0.2rem hsla(0, 0%, 100%, 1);\n          box-shadow: inset 0 0 0 0.2rem hsla(0, 0%, 100%, 1);\n  content: '';\n  height: 40px;\n  height: 4rem;\n  opacity: 0.95;\n  position: absolute;\n  -webkit-transition: all 0.1s;\n  transition: all 0.1s;\n  width: 40px;\n  width: 4rem;\n}\n\n.player {\n  -webkit-animation: player-bob 2s ease-in-out infinite;\n          animation: player-bob 2s ease-in-out infinite;\n  background-color: #6EBD4B;\n  margin: 35px;\n  margin: 3.5rem;\n  pointer-events: none;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  -webkit-transform: translateZ(12rem);\n          transform: translateZ(12rem);\n  -webkit-transition: all 0.2s;\n  transition: all 0.2s\n\n  /* Left */\n}\n\n.player::after { background-color: rgb(102, 176, 70); -webkit-transform: rotateX(-90deg) translateY(4rem); transform: rotateX(-90deg) translateY(4rem); -webkit-transform-origin: 100% 100%; transform-origin: 100% 100%;\n}\n\n.player {\n\n  /* Right */\n}\n\n.player::before { background-color: rgb(95, 163, 65); -webkit-transform: rotateY(90deg) translateX(4rem); transform: rotateY(90deg) translateX(4rem); -webkit-transform-origin: 100% 0; transform-origin: 100% 0;\n}\n\n.progress {\n  background-color: #D32D8F;\n  height: 100%;\n  -webkit-transition: width 0.1s;\n  transition: width 0.1s;\n}\n\n\n/* Media Queries */\n\n@media (max-height: 700px) {\n  /* After removing the footer, header + nav take up 80px. */\n  #game:not(.main-menu) + footer {\n    display: none;\n  }\n\n  .hard   .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.92, 0.92, 0.92); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.92, 0.92, 0.92); }\n}\n\n@media (max-width: 700px) {\n  .hard   .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.84, 0.84, 0.84); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.84, 0.84, 0.84); }\n}\n\n@media (max-height: 600px) {\n  .medium .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.88, 0.88, 0.88); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.88, 0.88, 0.88); }\n  .hard   .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.74, 0.74, 0.74); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.74, 0.74, 0.74); }\n}\n\n@media (max-width: 600px) {\n  .medium .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.88, 0.88, 0.88); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.88, 0.88, 0.88); }\n  .hard   .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.70, 0.70, 0.70); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.70, 0.70, 0.70); }\n}\n\n@media (max-height: 500px) {\n  .easy   .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.83, 0.83, 0.83); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.83, 0.83, 0.83); }\n  .medium .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.66, 0.66, 0.66); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.66, 0.66, 0.66); }\n  .hard   .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.55, 0.55, 0.55); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.55, 0.55, 0.55); }\n}\n\n@media (max-width: 500px) {\n  .easy   .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.94, 0.94, 0.94); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.94, 0.94, 0.94); }\n  .medium .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.70, 0.70, 0.70); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.70, 0.70, 0.70); }\n  .hard   .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.56, 0.56, 0.56); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.56, 0.56, 0.56); }\n}\n\n@media (max-width: 400px) {\n  .easy   .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.70, 0.70, 0.70); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.70, 0.70, 0.70); }\n  .medium .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.53, 0.53, 0.53); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.53, 0.53, 0.53); }\n  .hard   .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.42, 0.42, 0.42); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.42, 0.42, 0.42); }\n}\n\n@media (max-height: 400px) {\n  .easy   .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.55, 0.55, 0.55); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.55, 0.55, 0.55); }\n  .medium .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.44, 0.44, 0.44); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.44, 0.44, 0.44); }\n  .hard   .level { -webkit-transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.37, 0.37, 0.37); transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg) scale3d(0.37, 0.37, 0.37); }\n}\n", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(39);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 39 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (true) {

		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return FastClick;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = render;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_game__ = __webpack_require__(61);



var tree = null;
var rootNode = null;

// Attaches the virtual tree to the DOM.
function init(newTree) {
  rootNode = Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["create"])(newTree);
  document.body.insertBefore(rootNode, document.body.firstChild);
}

// Updates the DOM with the virtual tree changes.
function update(newTree) {
  var patches = Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["diff"])(tree, newTree);
  rootNode = Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["patch"])(rootNode, patches);
}

// Applies the game state to the DOM.
function render(props) {
  var newTree = Object(__WEBPACK_IMPORTED_MODULE_1__components_game__["a" /* default */])(props);

  if (!rootNode) {
    init(newTree);
  } else {
    update(newTree);
  }

  tree = newTree;
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var diff = __webpack_require__(43)

module.exports = diff


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(13)

var VPatch = __webpack_require__(17)
var isVNode = __webpack_require__(4)
var isVText = __webpack_require__(7)
var isWidget = __webpack_require__(1)
var isThunk = __webpack_require__(8)
var handleThunk = __webpack_require__(18)

var diffProps = __webpack_require__(44)

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index]
    var applyClear = false

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var orderedSet = reorder(aChildren, b.children)
    var bChildren = orderedSet.children

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ))
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index)
    destroyWidgets(vNode, patch, index)
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            )
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b)
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true
        }
    }

    return false
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(
                    VPatch.PROPS,
                    vNode,
                    undefinedKeys(vNode.hooks)
                )
            )
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                unhook(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

function undefinedKeys(obj) {
    var result = {}

    for (var key in obj) {
        result[key] = undefined
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren)
    var bKeys = bChildIndex.keys
    var bFree = bChildIndex.free

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren)
    var aKeys = aChildIndex.keys
    var aFree = aChildIndex.free

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(MAX(N, M)) memory
    var newChildren = []

    var freeIndex = 0
    var freeCount = bFree.length
    var deletedItems = 0

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0 ; i < aChildren.length; i++) {
        var aItem = aChildren[i]
        var itemIndex

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key]
                newChildren.push(bChildren[itemIndex])

            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++]
                newChildren.push(bChildren[itemIndex])
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ?
        bChildren.length :
        bFree[freeIndex]

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j]

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem)
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem)
        }
    }

    var simulate = newChildren.slice()
    var simulateIndex = 0
    var removes = []
    var inserts = []
    var simulateItem

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k]
        simulateItem = simulate[simulateIndex]

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null))
            simulateItem = simulate[simulateIndex]
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
                        simulateItem = simulate[simulateIndex]
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({key: wantedItem.key, to: k})
                        }
                        // items are matching, so skip ahead
                        else {
                            simulateIndex++
                        }
                    }
                    else {
                        inserts.push({key: wantedItem.key, to: k})
                    }
                }
                else {
                    inserts.push({key: wantedItem.key, to: k})
                }
                k++
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key))
            }
        }
        else {
            simulateIndex++
            k++
        }
    }

    // remove all the remaining nodes from simulate
    while(simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex]
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
        return {
            children: newChildren,
            moves: null
        }
    }

    return {
        children: newChildren,
        moves: {
            removes: removes,
            inserts: inserts
        }
    }
}

function remove(arr, index, key) {
    arr.splice(index, 1)

    return {
        from: index,
        key: key
    }
}

function keyIndex(children) {
    var keys = {}
    var free = []
    var length = children.length

    for (var i = 0; i < length; i++) {
        var child = children[i]

        if (child.key) {
            keys[child.key] = i
        } else {
            free.push(i)
        }
    }

    return {
        keys: keys,     // A hash of key name to index
        free: free      // An array of unkeyed item indices
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(19)
var isHook = __webpack_require__(9)

module.exports = diffProps

function diffProps(a, b) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (aValue === bValue) {
            continue
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {}
                diff[aKey] = bValue
            } else if (isHook(bValue)) {
                 diff = diff || {}
                 diff[aKey] = bValue
            } else {
                var objectDiff = diffProps(aValue, bValue)
                if (objectDiff) {
                    diff = diff || {}
                    diff[aKey] = objectDiff
                }
            }
        } else {
            diff = diff || {}
            diff[aKey] = bValue
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(value)
  } else if (value.__proto__) {
    return value.__proto__
  } else if (value.constructor) {
    return value.constructor.prototype
  }
}


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var patch = __webpack_require__(46)

module.exports = patch


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(20)
var isArray = __webpack_require__(13)

var render = __webpack_require__(21)
var domIndex = __webpack_require__(48)
var patchOp = __webpack_require__(49)
module.exports = patch

function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {}
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
        ? renderOptions.patch
        : patchRecursive
    renderOptions.render = renderOptions.render || render

    return renderOptions.patch(rootNode, patches, renderOptions)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions.document && ownerDocument !== document) {
        renderOptions.document = ownerDocument
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}


/***/ }),
/* 47 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 48 */
/***/ (function(module, exports) {

// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var applyProperties = __webpack_require__(22)

var isWidget = __webpack_require__(1)
var VPatch = __webpack_require__(17)

var updateWidget = __webpack_require__(50)

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = renderOptions.render(vText, renderOptions)

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = renderOptions.render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes
    var keyMap = {}
    var node
    var remove
    var insert

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i]
        node = childNodes[remove.from]
        if (remove.key) {
            keyMap[remove.key] = node
        }
        domNode.removeChild(node)
    }

    var length = childNodes.length
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j]
        node = keyMap[insert.key]
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var isWidget = __webpack_require__(1)

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var h = __webpack_require__(52)

module.exports = h


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(13);

var VNode = __webpack_require__(23);
var VText = __webpack_require__(24);
var isVNode = __webpack_require__(4);
var isVText = __webpack_require__(7);
var isWidget = __webpack_require__(1);
var isHook = __webpack_require__(9);
var isVThunk = __webpack_require__(8);

var parseTag = __webpack_require__(53);
var softSetHook = __webpack_require__(55);
var evHook = __webpack_require__(56);

module.exports = h;

function h(tagName, properties, children) {
    var childNodes = [];
    var tag, props, key, namespace;

    if (!children && isChildren(properties)) {
        children = properties;
        props = {};
    }

    props = props || properties || {};
    tag = parseTag(tagName, props);

    // support keys
    if (props.hasOwnProperty('key')) {
        key = props.key;
        props.key = undefined;
    }

    // support namespace
    if (props.hasOwnProperty('namespace')) {
        namespace = props.namespace;
        props.namespace = undefined;
    }

    // fix cursor bug
    if (tag === 'INPUT' &&
        !namespace &&
        props.hasOwnProperty('value') &&
        props.value !== undefined &&
        !isHook(props.value)
    ) {
        props.value = softSetHook(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }


    return new VNode(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new VText(c));
    } else if (typeof c === 'number') {
        childNodes.push(new VText(String(c)));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if (isArray(c)) {
        for (var i = 0; i < c.length; i++) {
            addChild(c[i], childNodes, tag, props);
        }
    } else if (c === null || c === undefined) {
        return;
    } else {
        throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
                tagName: tag,
                properties: props
            }
        });
    }
}

function transformProperties(props) {
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            var value = props[propName];

            if (isHook(value)) {
                continue;
            }

            if (propName.substr(0, 3) === 'ev-') {
                // add ev-foo support
                props[propName] = evHook(value);
            }
        }
    }
}

function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
}

function UnexpectedVirtualElement(data) {
    var err = new Error();

    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' +
        'Expected a VNode / Vthunk / VWidget / string but:\n' +
        'got:\n' +
        errorString(data.foreignObject) +
        '.\n' +
        'The parent vnode is:\n' +
        errorString(data.parentVnode)
        '\n' +
        'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;

    return err;
}

function errorString(obj) {
    try {
        return JSON.stringify(obj, null, '    ');
    } catch (e) {
        return String(obj);
    }
}


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var split = __webpack_require__(54);

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes, part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}


/***/ }),
/* 54 */
/***/ (function(module, exports) {

/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EvStore = __webpack_require__(57);

module.exports = EvHook;

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function(node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var OneVersionConstraint = __webpack_require__(58);

var MY_VERSION = '7';
OneVersionConstraint('ev-store', MY_VERSION);

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

module.exports = EvStore;

function EvStore(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Individual = __webpack_require__(59);

module.exports = OneVersion;

function OneVersion(moduleName, version, defaultValue) {
    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
    var enforceKey = key + '_ENFORCE_SINGLETON';

    var versionValue = Individual(enforceKey, version);

    if (versionValue !== version) {
        throw new Error('Can only have one copy of ' +
            moduleName + '.\n' +
            'You already have version ' + versionValue +
            ' installed.\n' +
            'This means you cannot install version ' + version);
    }

    return Individual(key, defaultValue);
}


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/*global window, global*/

var root = typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ?
    global : {};

module.exports = Individual;

function Individual(key, value) {
    if (key in root) {
        return root[key];
    }

    root[key] = value;

    return value;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var createElement = __webpack_require__(21)

module.exports = createElement


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_difficulty_buttons__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_level__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_level_navigator__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_progress__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_game_statuses__ = __webpack_require__(15);







function Game(props) {
  var currentDifficulty = props.currentDifficulty,
      status = props.status;


  var children = status === __WEBPACK_IMPORTED_MODULE_5__constants_game_statuses__["b" /* MAIN_MENU */] ? [Object(__WEBPACK_IMPORTED_MODULE_1__components_difficulty_buttons__["a" /* default */])(props)] : [Object(__WEBPACK_IMPORTED_MODULE_4__components_progress__["a" /* default */])(props), Object(__WEBPACK_IMPORTED_MODULE_2__components_level__["a" /* default */])(props), Object(__WEBPACK_IMPORTED_MODULE_3__components_level_navigator__["a" /* default */])(props)];

  return Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('div#game', {
    className: [currentDifficulty, status].join(' ').toLowerCase().replace('_', '-')
  }, children);
}

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = DifficultyButtons;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_difficulty_button__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_difficulty_levels__ = __webpack_require__(5);




function DifficultyButtons() {
  return Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('div.difficulty-buttons', [__WEBPACK_IMPORTED_MODULE_2__constants_difficulty_levels__["a" /* EASY */], __WEBPACK_IMPORTED_MODULE_2__constants_difficulty_levels__["c" /* MEDIUM */], __WEBPACK_IMPORTED_MODULE_2__constants_difficulty_levels__["b" /* HARD */]].map(function (difficulty) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__components_difficulty_button__["a" /* default */])({ difficulty: difficulty });
  }));
}

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = DifficultyButton;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_difficulty__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(2);




function DifficultyButton(_ref) {
  var difficulty = _ref.difficulty;

  return Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('button.difficulty-button', {
    key: difficulty,
    onclick: function onclick() {
      return Object(__WEBPACK_IMPORTED_MODULE_2__game__["a" /* loadLevel */])(__WEBPACK_IMPORTED_MODULE_1__constants_difficulty__["b" /* STARTING_LEVEL_NUMBERS */][difficulty]);
    }
  }, __WEBPACK_IMPORTED_MODULE_1__constants_difficulty__["a" /* DIFFICULTY_LABELS */][difficulty]);
}

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(30);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* unused harmony reexport bindActionCreators */
/* unused harmony reexport applyMiddleware */
/* unused harmony reexport compose */







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(26)))

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(69);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(67);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(10)))

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(29);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(71);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(74);


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(76);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(75)(module)))

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(30);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(26)))

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(31);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentDifficulty", function() { return currentDifficulty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentLevelNumber", function() { return currentLevelNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maxLevelReached", function() { return maxLevelReached; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maxMoves", function() { return maxMoves; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveCount", function() { return moveCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerPosition", function() { return playerPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "status", function() { return status; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tiles", function() { return tiles; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__levels__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_actions__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_difficulty__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_difficulty_levels__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_game_statuses__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_tile_codes__ = __webpack_require__(16);
var _createReducer5, _createReducer6, _createReducer7, _createReducer8;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var currentDifficulty = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* createReducer */])(__WEBPACK_IMPORTED_MODULE_4__constants_difficulty_levels__["a" /* EASY */], _defineProperty({}, __WEBPACK_IMPORTED_MODULE_2__constants_actions__["a" /* LOAD_LEVEL */], function (state, _ref) {
  var levelNumber = _ref.levelNumber;

  if (levelNumber < __WEBPACK_IMPORTED_MODULE_3__constants_difficulty__["b" /* STARTING_LEVEL_NUMBERS */][__WEBPACK_IMPORTED_MODULE_4__constants_difficulty_levels__["c" /* MEDIUM */]]) {
    state = __WEBPACK_IMPORTED_MODULE_4__constants_difficulty_levels__["a" /* EASY */];
  } else if (levelNumber < __WEBPACK_IMPORTED_MODULE_3__constants_difficulty__["b" /* STARTING_LEVEL_NUMBERS */][__WEBPACK_IMPORTED_MODULE_4__constants_difficulty_levels__["b" /* HARD */]]) {
    state = __WEBPACK_IMPORTED_MODULE_4__constants_difficulty_levels__["c" /* MEDIUM */];
  } else {
    state = __WEBPACK_IMPORTED_MODULE_4__constants_difficulty_levels__["b" /* HARD */];
  }

  return state;
}));

var currentLevelNumber = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* createReducer */])(0, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_2__constants_actions__["a" /* LOAD_LEVEL */], function (state, _ref2) {
  var levelNumber = _ref2.levelNumber;

  return levelNumber;
}));

var maxLevelReached = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* createReducer */])(0, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_2__constants_actions__["a" /* LOAD_LEVEL */], function (state, _ref3) {
  var levelNumber = _ref3.levelNumber;

  return Math.max(state, levelNumber);
}));

var maxMoves = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* createReducer */])(Infinity, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_2__constants_actions__["a" /* LOAD_LEVEL */], function (state, _ref4) {
  var levelNumber = _ref4.levelNumber;

  var level = __WEBPACK_IMPORTED_MODULE_0__levels__["a" /* default */][levelNumber];
  return level.maxMoves;
}));

var moveCount = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* createReducer */])(0, (_createReducer5 = {}, _defineProperty(_createReducer5, __WEBPACK_IMPORTED_MODULE_2__constants_actions__["a" /* LOAD_LEVEL */], function () {
  return 0;
}), _defineProperty(_createReducer5, __WEBPACK_IMPORTED_MODULE_2__constants_actions__["c" /* MOVE */], function (state) {
  return state + 1;
}), _createReducer5));

var playerPosition = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* createReducer */])({ row: 0, column: 0 }, (_createReducer6 = {}, _defineProperty(_createReducer6, __WEBPACK_IMPORTED_MODULE_2__constants_actions__["a" /* LOAD_LEVEL */], function (state, _ref5) {
  var levelNumber = _ref5.levelNumber;

  var level = __WEBPACK_IMPORTED_MODULE_0__levels__["a" /* default */][levelNumber];
  var _level$playerPosition = level.playerPosition,
      row = _level$playerPosition.row,
      column = _level$playerPosition.column;

  return { row: row, column: column };
}), _defineProperty(_createReducer6, __WEBPACK_IMPORTED_MODULE_2__constants_actions__["c" /* MOVE */], function (state, _ref6) {
  var row = _ref6.row,
      column = _ref6.column;

  return { row: row, column: column };
}), _createReducer6));

var status = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* createReducer */])(__WEBPACK_IMPORTED_MODULE_5__constants_game_statuses__["b" /* MAIN_MENU */], (_createReducer7 = {}, _defineProperty(_createReducer7, __WEBPACK_IMPORTED_MODULE_2__constants_actions__["a" /* LOAD_LEVEL */], function () {
  return __WEBPACK_IMPORTED_MODULE_5__constants_game_statuses__["c" /* PLAYING */];
}), _defineProperty(_createReducer7, __WEBPACK_IMPORTED_MODULE_2__constants_actions__["b" /* LOSE */], function () {
  return __WEBPACK_IMPORTED_MODULE_5__constants_game_statuses__["a" /* LOST */];
}), _defineProperty(_createReducer7, __WEBPACK_IMPORTED_MODULE_2__constants_actions__["d" /* WIN */], function () {
  return __WEBPACK_IMPORTED_MODULE_5__constants_game_statuses__["d" /* WON */];
}), _createReducer7));

var tiles = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* createReducer */])([[]], (_createReducer8 = {}, _defineProperty(_createReducer8, __WEBPACK_IMPORTED_MODULE_2__constants_actions__["a" /* LOAD_LEVEL */], function (state, _ref7) {
  var levelNumber = _ref7.levelNumber;

  var level = __WEBPACK_IMPORTED_MODULE_0__levels__["a" /* default */][levelNumber];
  return level.tiles.map(function (rowTiles) {
    return rowTiles.slice();
  });
}), _defineProperty(_createReducer8, __WEBPACK_IMPORTED_MODULE_2__constants_actions__["c" /* MOVE */], function (state, _ref8) {
  var row = _ref8.row,
      column = _ref8.column;

  // Toggle the tile at the new position.
  var currentTile = state[row][column];
  var newTile = currentTile === __WEBPACK_IMPORTED_MODULE_6__constants_tile_codes__["b" /* PRESSED */] ? __WEBPACK_IMPORTED_MODULE_6__constants_tile_codes__["c" /* UNPRESSED */] : __WEBPACK_IMPORTED_MODULE_6__constants_tile_codes__["b" /* PRESSED */];
  state = state.map(function (rowTiles) {
    return rowTiles.slice();
  });
  state[row][column] = newTile;
  return state;
}), _createReducer8));

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = canMoveTo;
/* harmony export (immutable) */ __webpack_exports__["b"] = distanceFromPlayer;
/* harmony export (immutable) */ __webpack_exports__["c"] = maxMovesMet;
/* harmony export (immutable) */ __webpack_exports__["d"] = winConditionsMet;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_tile_codes__ = __webpack_require__(16);



// Determines whether the player is allowed to move to the given coordinates.
function canMoveTo(state, row, column) {
  if (isPositionOutOfBounds(state, row, column)) {
    return false;
  }

  var tile = state.tiles[row][column];
  var canMove = tile === __WEBPACK_IMPORTED_MODULE_1__constants_tile_codes__["b" /* PRESSED */] || tile === __WEBPACK_IMPORTED_MODULE_1__constants_tile_codes__["c" /* UNPRESSED */];
  return canMove;
}

// Determines how far away the given row and column are from the player.
function distanceFromPlayer(state, row, column) {
  var distance = Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* findDistance */])(state.playerPosition, { row: row, column: column });
  return distance;
}

// Determines whether the user has hit the maximum allowed moves.
function maxMovesMet(state) {
  var maxMoves = state.maxMoves,
      moveCount = state.moveCount;

  var movesMet = moveCount >= maxMoves;
  return movesMet;
}

// Determines whether the win conditions have been met.
function winConditionsMet(state) {
  var offTilesRemain = state.tiles
  // Flatten.
  .reduce(function (tileArray, rowTiles) {
    return tileArray.concat(rowTiles);
  }, []).some(function (tile) {
    return tile === __WEBPACK_IMPORTED_MODULE_1__constants_tile_codes__["c" /* UNPRESSED */];
  });

  var conditionsMet = !offTilesRemain;
  return conditionsMet;
}

// Determines whether a given position is beyond the level's boundaries.
function isPositionOutOfBounds(state, row, column) {
  var tiles = state.tiles;

  var outOfBounds = row < 0 || column < 0 || row >= tiles.length || column >= tiles[0].length;
  return outOfBounds;
}

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LOSE_AUDIO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MOVE_AUDIO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return WIN_AUDIO; });
var LOSE_AUDIO = document.querySelector('audio.lose');
var MOVE_AUDIO = document.querySelector('audio.move');
var WIN_AUDIO = document.querySelector('audio.win');

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Level;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_misc__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_cell__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_player__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game__ = __webpack_require__(2);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }







function Level(_ref) {
  var playerPosition = _ref.playerPosition,
      tiles = _ref.tiles;

  var cells = tiles.reduce(function (cellArray, rowTiles, row) {
    var rowCells = rowTiles.map(function (tile, column) {
      return Object(__WEBPACK_IMPORTED_MODULE_2__components_cell__["a" /* default */])({ column: column, row: row, tile: tile });
    });

    return cellArray.concat(rowCells);
  }, []);

  return Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('main', Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('div.level', {
    style: {
      height: tiles.length * __WEBPACK_IMPORTED_MODULE_1__constants_misc__["c" /* SQUARE_SIZE */] + 'rem',
      width: tiles[0].length * __WEBPACK_IMPORTED_MODULE_1__constants_misc__["c" /* SQUARE_SIZE */] + 'rem'
    }
  }, [Object(__WEBPACK_IMPORTED_MODULE_3__components_player__["a" /* default */])(playerPosition)].concat(_toConsumableArray(cells))));
}

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Cell;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_misc__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_tile_codes__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game__ = __webpack_require__(2);
var _classNames;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var classNames = (_classNames = {}, _defineProperty(_classNames, __WEBPACK_IMPORTED_MODULE_2__constants_tile_codes__["a" /* BROKEN */], 'broken'), _defineProperty(_classNames, __WEBPACK_IMPORTED_MODULE_2__constants_tile_codes__["b" /* PRESSED */], 'pressed'), _defineProperty(_classNames, __WEBPACK_IMPORTED_MODULE_2__constants_tile_codes__["c" /* UNPRESSED */], 'unpressed'), _classNames);

function Cell(_ref) {
  var column = _ref.column,
      row = _ref.row,
      tile = _ref.tile;

  return Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('div.cell', {
    className: classNames[tile],
    key: row + ' ' + column,
    onclick: function onclick() {
      return Object(__WEBPACK_IMPORTED_MODULE_3__game__["c" /* moveTo */])(row, column);
    },
    style: {
      top: row * __WEBPACK_IMPORTED_MODULE_1__constants_misc__["c" /* SQUARE_SIZE */] + 'rem',
      left: column * __WEBPACK_IMPORTED_MODULE_1__constants_misc__["c" /* SQUARE_SIZE */] + 'rem'
    }
  });
}

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_misc__ = __webpack_require__(6);



function Player(_ref) {
  var column = _ref.column,
      row = _ref.row;

  var player = Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('div.player', {
    key: 'player',
    style: {
      top: row * __WEBPACK_IMPORTED_MODULE_1__constants_misc__["c" /* SQUARE_SIZE */] + 'rem',
      left: column * __WEBPACK_IMPORTED_MODULE_1__constants_misc__["c" /* SQUARE_SIZE */] + 'rem'
    }
  });

  return player;
}

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = LevelNavigator;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_difficulty_row__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_difficulty_selector__ = __webpack_require__(89);




function LevelNavigator(_ref) {
  var currentDifficulty = _ref.currentDifficulty,
      currentLevelNumber = _ref.currentLevelNumber,
      maxLevelReached = _ref.maxLevelReached;

  return Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('nav', [Object(__WEBPACK_IMPORTED_MODULE_2__components_difficulty_selector__["a" /* default */])({ currentDifficulty: currentDifficulty }), Object(__WEBPACK_IMPORTED_MODULE_1__components_difficulty_row__["a" /* default */])({ currentDifficulty: currentDifficulty, currentLevelNumber: currentLevelNumber, maxLevelReached: maxLevelReached })]);
}

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = DifficultyRow;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_level_button__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(12);




function DifficultyRow(_ref) {
  var currentDifficulty = _ref.currentDifficulty,
      currentLevelNumber = _ref.currentLevelNumber,
      maxLevelReached = _ref.maxLevelReached;

  var levelNumbers = Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* levelNumbersInDifficulty */])(currentDifficulty);

  return Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('div.difficulty-row', levelNumbers.map(function (levelNumber) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__components_level_button__["a" /* default */])({
      currentLevelNumber: currentLevelNumber,
      levelNumber: levelNumber,
      maxLevelReached: maxLevelReached
    });
  }));
}

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = LevelButton;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_prefs__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(2);




function getClassName(levelNumber, currentLevelNumber, maxLevelReached) {
  if (levelNumber === currentLevelNumber) {
    return 'current';
  } else if (levelNumber <= maxLevelReached) {
    return 'complete';
  } else {
    return '';
  }
}

function LevelButton(_ref) {
  var currentLevelNumber = _ref.currentLevelNumber,
      levelNumber = _ref.levelNumber,
      maxLevelReached = _ref.maxLevelReached;

  // Only allow jumping to completed levels (unless we're in dev mode).
  // Jumping to the current level effectively resets it.
  var isLevelAvailable = __WEBPACK_IMPORTED_MODULE_1__constants_prefs__["b" /* DEV_MODE_ENABLED */] || levelNumber <= maxLevelReached;

  return Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('button.level-button', {
    className: getClassName(levelNumber, currentLevelNumber, maxLevelReached),
    key: levelNumber,
    onclick: isLevelAvailable ? function () {
      return Object(__WEBPACK_IMPORTED_MODULE_2__game__["a" /* loadLevel */])(levelNumber);
    } : null,
    title: 'Level ' + levelNumber,
    type: 'button'
  }, levelNumber);
}

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = DifficultySelector;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_difficulty_option__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_difficulty_levels__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_difficulty__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game__ = __webpack_require__(2);






function DifficultySelector(_ref) {
  var currentDifficulty = _ref.currentDifficulty;

  return Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('select.difficulty-selector', {
    onchange: function onchange(evt) {
      var newDifficulty = evt.target.value;
      var newLevelNumber = __WEBPACK_IMPORTED_MODULE_3__constants_difficulty__["b" /* STARTING_LEVEL_NUMBERS */][newDifficulty];
      Object(__WEBPACK_IMPORTED_MODULE_4__game__["a" /* loadLevel */])(newLevelNumber);
    },
    title: 'Difficulty'
  }, [__WEBPACK_IMPORTED_MODULE_2__constants_difficulty_levels__["a" /* EASY */], __WEBPACK_IMPORTED_MODULE_2__constants_difficulty_levels__["c" /* MEDIUM */], __WEBPACK_IMPORTED_MODULE_2__constants_difficulty_levels__["b" /* HARD */]].map(function (difficulty) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__components_difficulty_option__["a" /* default */])({ currentDifficulty: currentDifficulty, difficulty: difficulty });
  }));
}

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = DifficultyOption;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_difficulty__ = __webpack_require__(11);



function DifficultyOption(_ref) {
  var currentDifficulty = _ref.currentDifficulty,
      difficulty = _ref.difficulty;

  return Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('option.difficulty-option', {
    key: difficulty,
    selected: currentDifficulty === difficulty,
    value: difficulty
  }, __WEBPACK_IMPORTED_MODULE_1__constants_difficulty__["a" /* DIFFICULTY_LABELS */][difficulty]);
}

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Progress;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_virtual_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_misc__ = __webpack_require__(6);



function Progress(_ref) {
  var maxMoves = _ref.maxMoves,
      moveCount = _ref.moveCount;

  return Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('header', {
    style: { width: maxMoves * __WEBPACK_IMPORTED_MODULE_1__constants_misc__["b" /* PROGRESS_STEP_SIZE */] + 'rem' },
    title: 'Move ' + moveCount + ' of ' + maxMoves
  }, [Object(__WEBPACK_IMPORTED_MODULE_0_virtual_dom__["h"])('div.progress', {
    style: { width: moveCount * __WEBPACK_IMPORTED_MODULE_1__constants_misc__["b" /* PROGRESS_STEP_SIZE */] + 'rem' }
  })]);
}

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return R; });
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var R = 82;

/***/ })
/******/ ]);