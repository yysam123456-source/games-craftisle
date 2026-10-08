/*!
 * Descensus 2 v1.0.2
 * Copyright (c) Tom W Hall 2017
 */
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const materials = {
    ball: new p2.Material(),
    wood: new p2.Material(),
    brick: new p2.Material(),
    saw: new p2.Material()
};
exports.default = materials;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function updateBodyPosition(body, position, angle = 0) {
    resetBody(body);
    const bodyPosition = body.position;
    bodyPosition[0] = position[0];
    bodyPosition[1] = position[1];
    body.angle = angle;
    body.updateAABB();
    body.updateBoundingRadius();
}
function resetBody(body) {
    body.setZeroForce();
    body.velocity[0] = 0;
    body.velocity[1] = 0;
    body.angularVelocity = 0;
}
function limitVelocity(world) {
    const maxVelocity = 14;
    const maxAngularVelocity = 250;
    const bodies = world.bodies;
    for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        const velocity = body.velocity;
        const absVelocityX = Math.abs(velocity[0]);
        const absVelocityY = Math.abs(velocity[1]);
        if (absVelocityX > maxVelocity || absVelocityY > maxVelocity) {
            const ratio = Math.min(maxVelocity / absVelocityX, maxVelocity / absVelocityY);
            velocity[0] *= ratio;
            velocity[1] *= ratio;
        }
        if (body.angularVelocity > maxAngularVelocity) {
            body.angularVelocity = maxAngularVelocity;
        }
        else if (body.angularVelocity < -maxAngularVelocity) {
            body.angularVelocity = -maxAngularVelocity;
        }
    }
}
exports.default = { updateBodyPosition, resetBody, limitVelocity };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TerrainObjectType;
(function (TerrainObjectType) {
    TerrainObjectType[TerrainObjectType["Girder"] = 1] = "Girder";
    TerrainObjectType[TerrainObjectType["Brick"] = 2] = "Brick";
    TerrainObjectType[TerrainObjectType["Seesaw"] = 3] = "Seesaw";
    TerrainObjectType[TerrainObjectType["Spinner"] = 4] = "Spinner";
    TerrainObjectType[TerrainObjectType["Snake"] = 5] = "Snake";
    TerrainObjectType[TerrainObjectType["FreeSaw"] = 6] = "FreeSaw";
    TerrainObjectType[TerrainObjectType["Saw"] = 7] = "Saw";
    TerrainObjectType[TerrainObjectType["SawSpinner"] = 8] = "SawSpinner";
    TerrainObjectType[TerrainObjectType["SawSnake"] = 9] = "SawSnake";
    TerrainObjectType[TerrainObjectType["Plus1Life"] = 10] = "Plus1Life";
})(TerrainObjectType || (TerrainObjectType = {}));
exports.default = TerrainObjectType;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const p2Util_1 = __webpack_require__(1);
class TerrainObject {
    constructor(type, world, pixiGraph) {
        this.active = false;
        this.suspended = false;
        this.type = type;
        this.world = world;
        this.pixiGraph = pixiGraph;
        this.bodies = []; // p2 physics bodies, each with its corresponding PIXI Sprite stored on it
        this.constraints = []; // p2 constraints
    }
    addBody(body, sprite, container) {
        sprite.anchor = new PIXI.ObservablePoint(null, null, 0.5, 0.5);
        sprite.visible = false;
        body.sprite = sprite;
        container.addChild(sprite);
        body.terrainObject = this;
        this.bodies.push(body);
    }
    addBodyHidden(body) {
        body.terrainObject = this;
        this.bodies.push(body);
    }
    addShape(body, shape, options) {
        options = options || {};
        const offset = options.offset || [0, 0];
        const angle = options.angle || 0;
        shape.collisionGroup = (options.collisionOptions && options.collisionOptions.collisionGroup) || 1;
        shape.collisionMask = (options.collisionOptions && options.collisionOptions.collisionMask) || 1;
        body.addShape(shape, offset, angle);
    }
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }
    getAABB() {
        const aabb = new p2.AABB();
        for (let i = 0; i < this.bodies.length; i++) {
            let body = this.bodies[i];
            if (body.aabbNeedsUpdate) {
                body.updateAABB();
            }
            if (i === 0) {
                aabb.copy(body.aabb);
            }
            else {
                aabb.extend(body.aabb);
            }
        }
        return aabb;
    }
    activate(...args) {
        const world = this.world;
        // Add bodies to the world and show Pixi sprites
        const bodies = this.bodies;
        for (let i = 0; i < bodies.length; i++) {
            let body = bodies[i];
            world.addBody(body);
            const sprite = body.sprite;
            if (!sprite)
                continue;
            sprite.visible = true;
        }
        // Add p2 constraints to the world
        const constraints = this.constraints;
        for (let j = 0; j < constraints.length; j++) {
            world.addConstraint(constraints[j]);
        }
        this.resume();
        this.active = true;
    }
    deactivate() {
        const world = this.world;
        // Remove p2 constraints from the world
        const constraints = this.constraints;
        for (let i = 0; i < constraints.length; i++) {
            world.removeConstraint(constraints[i]);
        }
        // Remove p2 bodies from the world and hide Pixi Sprites
        const bodies = this.bodies;
        for (let j = 0; j < bodies.length; j++) {
            let body = bodies[j];
            body.setZeroForce();
            body.velocity[0] = 0;
            body.velocity[1] = 0;
            body.angularVelocity = 0;
            world.removeBody(body);
            const sprite = body.sprite;
            if (sprite) {
                sprite.visible = false;
            }
        }
        this.active = false;
    }
    suspend() {
        const bodies = this.bodies;
        for (let i = 0; i < bodies.length; i++) {
            let body = bodies[i];
            if (body.allowSleep) {
                body.sleep();
            }
            body.collisionResponse = false;
        }
        this.suspended = true;
    }
    resume() {
        const bodies = this.bodies;
        for (let i = 0; i < bodies.length; i++) {
            let body = bodies[i];
            if (body.allowSleep) {
                body.wakeUp();
                p2Util_1.default.resetBody(body);
            }
            body.collisionResponse = true;
        }
        this.suspended = false;
    }
}
exports.default = TerrainObject;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const topics = {};
function subscribe(topic, subscriber) {
    if (!topics[topic]) {
        topics[topic] = [];
    }
    if (topics[topic].indexOf(subscriber) === -1) {
        topics[topic].push(subscriber);
    }
}
function unsubscribe(topic, subscriber) {
    if (!topics[topic])
        return;
    var index = topics[topic].indexOf(subscriber);
    if (index !== -1) {
        topics[topic].splice(index, 1);
    }
}
function publish(topic, data) {
    var subscribers = topics[topic];
    if (subscribers) {
        for (var i = 0; i < subscribers.length; i++) {
            var subscriber = subscribers[i];
            subscriber(data);
        }
    }
}
exports.default = { subscribe, unsubscribe, publish };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getAnchor(body) {
    const anchorBody = new p2.Body({
        mass: 100
    });
    anchorBody.gravityScale = 0;
    // Circle shape is to cater for body AABB logic which sums shape AABBs
    const circleShape = new p2.Circle({ radius: 0.1 });
    circleShape.sensor = true;
    anchorBody.addShape(circleShape);
    anchorBody.terrainObject = body.terrainObject;
    return anchorBody;
}
function getAnchorConstraint(body, anchor, offset, enableMotor = false) {
    offset = offset || [0, 0];
    const revoluteConstraint = new p2.RevoluteConstraint(body, anchor, { localPivotA: offset, localPivotB: [0, 0] });
    revoluteConstraint.collideConnected = false;
    if (enableMotor) {
        revoluteConstraint.enableMotor();
    }
    return revoluteConstraint;
}
exports.default = { getAnchor, getAnchorConstraint };


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const seed = 1;
const mersenneTwister = new MersenneTwister(seed);
/**
 * Reseeds the random number generator
 */
function reseed() {
    mersenneTwister.seed(seed);
}
/**
 * Returns a random number between 0 and 1
 */
function random0To1() {
    return mersenneTwister.rnd();
}
/**
 * Returns a random number between -1 and 1
 */
function randomNeg1ToPos1() {
    return (mersenneTwister.rnd() - 0.5) * 2;
}
/**
 * Returns 1 or -1
 */
function randomSign() {
    return randomInt(1, 2) === 1 ? -1 : 1;
}
/**
 * Returns a random integer between min and max
 */
function randomInt(min, max) {
    const r = mersenneTwister.rnd();
    return Math.floor(r * (max - min + 1)) + min;
}
/**
 * Returns a random boolean
 */
function randomBoolean() {
    return randomInt(1, 2) === 1;
}
exports.default = { reseed, random0To1, randomNeg1ToPos1, randomSign, randomInt, randomBoolean };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color;
(function (Color) {
    Color[Color["blue"] = 6724095] = "blue";
    Color[Color["yellow"] = 16108847] = "yellow";
    Color[Color["orange"] = 16607755] = "orange";
    Color[Color["red"] = 16729156] = "red";
})(Color || (Color = {}));
exports.default = Color;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Bus_1 = __webpack_require__(4);
let sounds = null;
let soundSupported = false;
let soundOn = false;
Bus_1.default.subscribe('Sound.Toggle', () => {
    toggle();
});
function initialize(snds) {
    sounds = snds;
    soundSupported = true;
    soundOn = true;
    for (let name in sounds) {
        const audio = sounds[name];
        audio.hackPlaying = false;
        audio.hackPaused = true;
        audio.onplaying = () => {
            audio.hackPlaying = true;
            audio.hackPaused = false;
        };
        audio.onpause = () => {
            audio.hackPlaying = false;
            audio.hackPaused = true;
        };
    }
}
function play(name, resuming = false) {
    if (!soundSupported || !soundOn)
        return;
    const audio = sounds[name];
    if (!resuming) {
        audio.currentTime = 0; // Restart if already playing, no overlaps
    }
    if (audio.hackPaused) {
        if (audio === sounds.clock) {
            audio.loop = true;
        }
        audio.play();
    }
}
function pause(name) {
    if (!soundSupported)
        return;
    const audio = sounds[name];
    if (!audio.hackPaused) {
        audio.pause();
    }
    ;
}
function stop(name) {
    if (!soundSupported)
        return;
    const audio = sounds[name];
    audio.pause();
    audio.currentTime = 0;
}
function pauseAll() {
    for (let name in sounds) {
        pause(name);
    }
}
function resumeAll() {
    for (let name in sounds) {
        const audio = sounds[name];
        if (audio.paused && audio.currentTime > 0 && !audio.ended) {
            play(name, true);
        }
    }
}
function stopAll() {
    for (let name in sounds) {
        stop(name);
    }
}
function toggle() {
    if (!soundSupported)
        return;
    soundOn = !soundOn;
    Bus_1.default.publish('Sound.Enable', soundOn);
}
exports.default = { initialize, play, pause, stop, pauseAll, resumeAll, stopAll, toggle };


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TerrainObjectType_1 = __webpack_require__(2);
const randomUtil_1 = __webpack_require__(6);
const terrainUtil_1 = __webpack_require__(32);
const p2Util_1 = __webpack_require__(1);
const Girder_1 = __webpack_require__(26);
const Brick_1 = __webpack_require__(24);
const Seesaw_1 = __webpack_require__(31);
const Spinner_1 = __webpack_require__(13);
const Snake_1 = __webpack_require__(12);
const FreeSaw_1 = __webpack_require__(25);
const Saw_1 = __webpack_require__(28);
const SawSpinner_1 = __webpack_require__(30);
const SawSnake_1 = __webpack_require__(29);
const Plus1Life_1 = __webpack_require__(27);
const ground_1 = __webpack_require__(35);
let world;
let pixiGraph;
let girders;
let bricks;
let seesaws;
let spinners;
let freeSaws;
let saws;
let sawSpinners;
let snakes;
let sawSnakes;
let plus1Lifes;
let allSnakes = [];
const terrainObjectPoolMap = {};
const terrainObjectPools = [];
let groundBody;
let purgeCheckPoolIndex = 0;
let purgeCheckObjectIndex = 0;
const windZones = [
    { startY: 600, endY: 575, strength: 1.5 },
    { startY: 500, endY: 475, strength: -1.75 },
    { startY: 350, endY: 325, strength: 2 },
    { startY: 275, endY: 250, strength: -2.25 },
    { startY: 100, endY: 75, strength: 2.5 },
    { startY: 75, endY: 50, strength: -2.75 }
];
function createTerrainObjects(factory, count) {
    const pool = [];
    for (let i = 0; i < count; i++) {
        pool.push(factory());
    }
    return pool;
}
function getActiveCount(terrainObjects) {
    let count = 0;
    for (let i = 0; i < terrainObjects.length; i++) {
        if (terrainObjects[i].active)
            count++;
    }
    return count;
}
function initialize(wld, pxGraph, textures) {
    world = wld;
    pixiGraph = pxGraph;
    girders = createTerrainObjects(() => new Girder_1.default(world, pxGraph, textures), 20);
    bricks = createTerrainObjects(() => new Brick_1.default(world, pxGraph, textures), 6);
    seesaws = createTerrainObjects(() => new Seesaw_1.default(world, pxGraph, textures), 8);
    spinners = createTerrainObjects(() => new Spinner_1.default(world, pxGraph, textures), 8);
    freeSaws = createTerrainObjects(() => new FreeSaw_1.default(world, pxGraph, textures), 4);
    saws = createTerrainObjects(() => new Saw_1.default(world, pxGraph, textures), 20);
    sawSpinners = createTerrainObjects(() => new SawSpinner_1.default(world, pxGraph, textures), 8);
    plus1Lifes = createTerrainObjects(() => new Plus1Life_1.default(world, pxGraph, textures), 2);
    snakes = createTerrainObjects(() => {
        const speed = 0.5 + randomUtil_1.default.random0To1();
        const agitateTime = (1 + randomUtil_1.default.random0To1()) * 1000;
        return new Snake_1.default(world, pxGraph, textures, speed, agitateTime);
    }, 8);
    sawSnakes = createTerrainObjects(() => {
        const speed = 0.5 + randomUtil_1.default.random0To1();
        const agitateTime = (1 + randomUtil_1.default.random0To1()) * 1000;
        return new SawSnake_1.default(world, pxGraph, textures, speed, agitateTime);
    }, 6);
    allSnakes = snakes.concat(sawSnakes);
    terrainObjectPoolMap[TerrainObjectType_1.default.Girder] = girders;
    terrainObjectPoolMap[TerrainObjectType_1.default.Brick] = bricks;
    terrainObjectPoolMap[TerrainObjectType_1.default.Seesaw] = seesaws;
    terrainObjectPoolMap[TerrainObjectType_1.default.Spinner] = spinners;
    terrainObjectPoolMap[TerrainObjectType_1.default.FreeSaw] = freeSaws;
    terrainObjectPoolMap[TerrainObjectType_1.default.Saw] = saws;
    terrainObjectPoolMap[TerrainObjectType_1.default.SawSpinner] = sawSpinners;
    terrainObjectPoolMap[TerrainObjectType_1.default.Snake] = snakes;
    terrainObjectPoolMap[TerrainObjectType_1.default.SawSnake] = sawSnakes;
    terrainObjectPoolMap[TerrainObjectType_1.default.Plus1Life] = plus1Lifes;
    terrainObjectPools.push.apply(terrainObjectPools, [girders, bricks, seesaws, spinners, snakes, freeSaws, saws, sawSpinners, sawSnakes, plus1Lifes]);
    groundBody = ground_1.default.initialize(world, pixiGraph, textures);
}
function update(ballBody, screenAABB) {
    const activeBufferUnits = 16;
    const activeAABB = new p2.AABB();
    activeAABB.lowerBound[0] = screenAABB.lowerBound[0] - activeBufferUnits;
    activeAABB.lowerBound[1] = screenAABB.lowerBound[1] - activeBufferUnits;
    activeAABB.upperBound[0] = screenAABB.upperBound[0] + activeBufferUnits;
    activeAABB.upperBound[1] = screenAABB.upperBound[1] + activeBufferUnits;
    setObjectStates(screenAABB, activeAABB);
    terrainUtil_1.default.updateAABBs(world);
    const leftInner = screenAABB.lowerBound[0];
    const rightInner = screenAABB.upperBound[0];
    const topInner = screenAABB.upperBound[1];
    const bottomInner = screenAABB.lowerBound[1];
    const leftOuter = activeAABB.lowerBound[0];
    const rightOuter = activeAABB.upperBound[0];
    const topOuter = activeAABB.upperBound[1];
    const bottomOuter = activeAABB.lowerBound[1];
    const topArea = new p2.AABB({ lowerBound: [leftOuter, topInner], upperBound: [rightOuter, topOuter] });
    const bottomArea = new p2.AABB({ lowerBound: [leftOuter, bottomOuter], upperBound: [rightOuter, bottomInner] });
    const leftArea = new p2.AABB({ lowerBound: [leftOuter, bottomInner], upperBound: [leftInner, topInner] });
    const rightArea = new p2.AABB({ lowerBound: [rightInner, bottomInner], upperBound: [rightOuter, topInner] });
    populateArea(topArea);
    populateArea(bottomArea);
    populateArea(leftArea);
    populateArea(rightArea);
    dropBricks(topArea);
    throwSaws(leftArea, rightArea, bottomArea);
    applyWind(ballBody);
    agitateSnakes();
    positionGround(ballBody);
}
function positionGround(ballBody) {
    const groundPositionX = (Math.round(ballBody.position[0] / 16) * 16);
    const groundPosition = [groundPositionX, -10];
    p2Util_1.default.updateBodyPosition(groundBody, groundPosition);
}
function deployTerrainObject(type, targetActiveCount, aabb, width, height, buffer, ...args) {
    const terrainObjects = terrainObjectPoolMap[type];
    if (getActiveCount(terrainObjects) < targetActiveCount) {
        for (let i = 0; i < terrainObjects.length; i++) {
            const terrainObject = terrainObjects[i];
            if (!terrainObject.active) {
                const position = terrainUtil_1.default.getRandomPosition(world, aabb, width, height, buffer);
                if (position !== null) {
                    const activationArgs = [position].concat(args);
                    terrainObject.activate.apply(terrainObject, activationArgs);
                }
                return;
            }
        }
        throw new Error('TerrainObjectPool of type ' + type + ' empty');
    }
}
function deployGirder(aabb, targetActiveCount, buffer) {
    const angle = randomUtil_1.default.random0To1() * (Math.PI * 2);
    deployTerrainObject(TerrainObjectType_1.default.Girder, targetActiveCount, aabb, 5, 5, buffer, angle);
}
function deployBrick(aabb, targetActiveCount, buffer) {
    const angle = randomUtil_1.default.random0To1() * (Math.PI * 2);
    deployTerrainObject(TerrainObjectType_1.default.Brick, targetActiveCount, aabb, 5, 5, buffer, angle);
}
function deploySeesaw(aabb, targetActiveCount, buffer) {
    const isUpright = randomUtil_1.default.randomBoolean();
    const width = isUpright ? 1 : 6;
    const height = isUpright ? 6 : 1;
    deployTerrainObject(TerrainObjectType_1.default.Seesaw, targetActiveCount, aabb, width, height, buffer, isUpright);
}
function deploySpinner(aabb, targetActiveCount, buffer) {
    const speed = randomUtil_1.default.randomInt(200, 250) * randomUtil_1.default.randomSign();
    deployTerrainObject(TerrainObjectType_1.default.Spinner, targetActiveCount, aabb, 7, 7, buffer, speed);
}
function deploySnake(aabb, targetActiveCount, buffer) {
    const speed = randomUtil_1.default.randomInt(40, 60) * randomUtil_1.default.randomSign();
    const agitateTime = randomUtil_1.default.randomInt(2500, 5000);
    deployTerrainObject(TerrainObjectType_1.default.Snake, targetActiveCount, aabb, 0.5, 14.5, buffer, speed, agitateTime);
}
function deployFreeSaw(aabb, targetActiveCount, buffer, velocity) {
    deployTerrainObject(TerrainObjectType_1.default.FreeSaw, targetActiveCount, aabb, 1, 1, buffer, velocity);
}
function deploySaw(aabb, targetActiveCount, buffer) {
    deployTerrainObject(TerrainObjectType_1.default.Saw, targetActiveCount, aabb, 2, 2, buffer);
}
function deploySawSpinner(aabb, targetActiveCount, buffer) {
    const speed = randomUtil_1.default.randomInt(200, 250) * randomUtil_1.default.randomSign();
    deployTerrainObject(TerrainObjectType_1.default.SawSpinner, targetActiveCount, aabb, 9, 9, buffer, speed);
}
function deploySawSnake(aabb, targetActiveCount, buffer) {
    const speed = randomUtil_1.default.randomInt(40, 60) * randomUtil_1.default.randomSign();
    const agitateTime = randomUtil_1.default.randomInt(2500, 5000);
    deployTerrainObject(TerrainObjectType_1.default.SawSnake, targetActiveCount, aabb, 2, 14.5, buffer, speed, agitateTime);
}
function deployPlus1Life(aabb, targetActiveCount, buffer) {
    deployTerrainObject(TerrainObjectType_1.default.Plus1Life, targetActiveCount, aabb, 2, 2, buffer);
}
function populateArea(aabb) {
    const height = terrainUtil_1.default.getMidHeight(aabb);
    const buffer = terrainUtil_1.default.getCountLessAsDescends(height, 4, 6, 1000);
    deploySawSnake(aabb, terrainUtil_1.default.getCountMoreAsDescends(height, 3, 6, 250), buffer);
    deploySawSpinner(aabb, terrainUtil_1.default.getCountLessAsDescends(height, 2, 8, 500), buffer);
    deploySnake(aabb, terrainUtil_1.default.getCountLessAsDescends(height, 1, 8, 600), buffer);
    deploySpinner(aabb, terrainUtil_1.default.getCountLessAsDescends(height, 1, 8, 800), buffer);
    deploySeesaw(aabb, terrainUtil_1.default.getCountLessAsDescends(height, 1, 8, 900), buffer);
    deployGirder(aabb, terrainUtil_1.default.getCountLessAsDescends(height, 1, 20, 1000), buffer);
    deploySaw(aabb, terrainUtil_1.default.getCountLessAsDescends(height, 20, 2, 1000), buffer);
    deployPlus1Life(aabb, terrainUtil_1.default.getCountMoreAsDescends(height, 1, 2, 500), buffer);
}
function dropBricks(topAABB) {
    const height = terrainUtil_1.default.getMidHeight(topAABB);
    const targetActiveCount = terrainUtil_1.default.getCountMoreAsDescends(height, 2, 6, 975);
    if (targetActiveCount === 0)
        return;
    const topAABBCopy = new p2.AABB();
    topAABBCopy.copy(topAABB);
    topAABBCopy.upperBound[1] -= 12;
    topAABBCopy.lowerBound[0] += 4;
    topAABBCopy.upperBound[0] -= 4;
    deployBrick(topAABB, targetActiveCount, 1);
}
function throwSaws(leftAABB, rightAABB, bottomAABB) {
    const height = terrainUtil_1.default.getMidHeight(leftAABB);
    const targetActiveCount = terrainUtil_1.default.getCountMoreAsDescends(height, 2, 4, 975);
    if (targetActiveCount === 0)
        return;
    // Throw from sides
    {
        const isFromLeft = randomUtil_1.default.randomBoolean();
        const aabb = new p2.AABB();
        aabb.copy(isFromLeft ? leftAABB : rightAABB);
        aabb.lowerBound[1] += 14;
        if (isFromLeft) {
            aabb.lowerBound[0] += 13;
        }
        else {
            aabb.upperBound[0] -= 13;
        }
        const horizontalVelocity = 10;
        const verticalVelocity = randomUtil_1.default.random0To1();
        const velocity = isFromLeft ? [horizontalVelocity, verticalVelocity] : [-horizontalVelocity, verticalVelocity];
        deployFreeSaw(aabb, targetActiveCount, 1, velocity);
    }
    // Throw from below
    {
        const bottomAABBCopy = new p2.AABB();
        bottomAABBCopy.copy(bottomAABB);
        bottomAABBCopy.lowerBound[1] += 25;
        bottomAABBCopy.lowerBound[0] += 4;
        bottomAABBCopy.upperBound[0] -= 4;
        const verticalVelocity = 20;
        const horizontalVelocity = randomUtil_1.default.random0To1();
        const velocity = [horizontalVelocity, verticalVelocity];
        deployFreeSaw(bottomAABB, targetActiveCount, 1, velocity);
    }
}
function applyWind(ballBody) {
    let bodiesToBlow = [];
    const bodies = world.bodies;
    for (let j = 0; j < bodies.length; j++) {
        const body = bodies[j];
        if (body.sprite && body.sprite.visible) {
            bodiesToBlow.push(body);
        }
    }
    pixiGraph.windLeft.visible = false;
    pixiGraph.windRight.visible = false;
    const ballBodyPositionY = ballBody.position[1];
    for (let i = 0; i < windZones.length; i++) {
        const windZone = windZones[i];
        if (ballBodyPositionY <= windZone.startY && ballBodyPositionY >= windZone.endY) {
            for (let k = 0; k < bodiesToBlow.length; k++) {
                const body = bodiesToBlow[k];
                body.applyForce([windZone.strength, 0], [0, 0]);
            }
            if (windZone.strength < 0) {
                pixiGraph.windRight.visible = true;
            }
            else {
                pixiGraph.windLeft.visible = true;
            }
            break;
        }
    }
}
function agitateSnakes() {
    for (let i = 0; i < allSnakes.length; i++) {
        const snake = allSnakes[i];
        if (snake.active) {
            snake.agitate();
        }
    }
}
function setObjectStates(screenAABB, activeAABB) {
    for (let i = 0; i < terrainObjectPools.length; i++) {
        const terrainObjectPool = terrainObjectPools[i];
        for (let j = 0; j < terrainObjectPool.length; j++) {
            const terrainObject = terrainObjectPool[j];
            if (terrainObject.active) {
                const aabb = terrainObject.getAABB();
                if (aabb.upperBound[0] < activeAABB.lowerBound[0] ||
                    aabb.lowerBound[0] > activeAABB.upperBound[0] ||
                    aabb.lowerBound[1] > activeAABB.upperBound[1] ||
                    aabb.upperBound[1] < activeAABB.lowerBound[1]) {
                    // Object is outside active area
                    terrainObject.deactivate();
                }
                else if (aabb.upperBound[0] < screenAABB.lowerBound[0] ||
                    aabb.lowerBound[0] > screenAABB.upperBound[0] ||
                    aabb.lowerBound[1] > screenAABB.upperBound[1] ||
                    aabb.upperBound[1] < screenAABB.lowerBound[1]) {
                    // Object is inside active area but off screen
                    terrainObject.suspend();
                }
                else {
                    // Object is on-screen
                    if (terrainObject.suspended) {
                        terrainObject.resume();
                    }
                }
            }
        }
    }
}
function deactivateAll() {
    for (let i = 0; i < terrainObjectPools.length; i++) {
        const terrainObjectPool = terrainObjectPools[i];
        for (let j = 0; j < terrainObjectPool.length; j++) {
            const terrainObject = terrainObjectPool[j];
            if (terrainObject.active) {
                terrainObject.deactivate();
            }
        }
    }
}
exports.default = { initialize, update, deactivateAll };


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const materials_1 = __webpack_require__(0);
const p2Util_1 = __webpack_require__(1);
const Bus_1 = __webpack_require__(4);
let stage;
let container;
let barContainer;
let worldPointA;
let worldPointB;
let pixiPointB;
let body;
let box;
let sprite;
let finalized;
let isActiveState = false;
function initialize(world, pixiGraph, textures) {
    stage = pixiGraph.stage;
    container = pixiGraph.container;
    barContainer = pixiGraph.barContainer;
    body = new p2.Body({
        mass: 20000,
        position: [-999999, 0]
    });
    body.gravityScale = 0;
    body.allowSleep = false;
    box = new p2.Box({ width: 0.25, height: 0.25 });
    box.material = materials_1.default.wood;
    body.addShape(box);
    sprite = new PIXI.Sprite(textures.bar);
    sprite.width = box.width * 64;
    sprite.height = box.height * 64;
    sprite.anchor = new PIXI.ObservablePoint(null, null, 0.5, 0.5);
    pixiGraph.barContainer.addChild(sprite);
    body.sprite = sprite;
    finalized = true;
    world.addBody(body);
    world.on('beginContact', beginContact, this);
    addTouchHandlers();
}
function click(e) {
    if (!finalized)
        return;
    finalized = false;
    box.sensor = true;
    const point = e.data.getLocalPosition(stage);
    worldPointA = getWorldPosition(point);
    worldPointB = [worldPointA[0], worldPointA[1]];
    pixiPointB = new PIXI.Point(point.x, point.y);
    update();
}
function drag(e) {
    if (finalized)
        return;
    const point = e.data.getLocalPosition(stage);
    pixiPointB.x = point.x;
    pixiPointB.y = point.y;
    box.sensor = false;
}
function update() {
    if (finalized)
        return;
    const newWorldPointB = getWorldPosition(pixiPointB);
    if (newWorldPointB[0] === worldPointB[0] && newWorldPointB[1] === worldPointB[1])
        return;
    worldPointB[0] = newWorldPointB[0];
    worldPointB[1] = newWorldPointB[1];
    const x1 = worldPointA[0];
    const y1 = worldPointA[1];
    const x2 = worldPointB[0];
    const y2 = worldPointB[1];
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    body.position[0] = ((x1 + x2) / 2);
    body.position[1] = ((y1 + y2) / 2);
    body.angle = Math.atan2(yDiff, xDiff);
    const width = Math.max(0.25, Math.sqrt((xDiff * xDiff) + (yDiff * yDiff)));
    box.width = width;
    const convex = box;
    convex.vertices[0][0] = -width / 2;
    convex.vertices[0][1] = -0.125;
    convex.vertices[1][0] = width / 2;
    convex.vertices[1][1] = -0.125;
    convex.vertices[2][0] = width / 2;
    convex.vertices[2][1] = 0.125;
    convex.vertices[3][0] = -width / 2;
    convex.vertices[3][1] = 0.125;
    convex.updateTriangles();
    convex.updateCenterOfMass();
    convex.updateBoundingRadius();
    convex.updateArea();
    body.updateAABB();
    body.updateBoundingRadius();
    sprite.position.x = body.position[0] * 64;
    sprite.position.y = -body.position[1] * 64;
    sprite.width = width * 64;
}
function finalize() {
    if (finalized)
        return;
    update();
    // Delay seems necessary to bring bar to a stop, doesn't work in post-step phase.
    // TODO: Replace this hideous timeout with a delay managed by the game loop
    window.setTimeout(() => { p2Util_1.default.resetBody(body); }, 50);
    finalized = true;
}
function hide() {
    p2Util_1.default.updateBodyPosition(body, [-999999, 0]);
}
function getWorldPosition(point) {
    const pixiRendererContainerPosition = container.position;
    return [(point.x - pixiRendererContainerPosition.x) / 64, (pixiRendererContainerPosition.y - point.y) / 64];
}
function addTouchHandlers() {
    function onTouch(e) {
        if (!isActiveState)
            return;
        click(e);
    }
    function onDrag(e) {
        if (!isActiveState)
            return;
        drag(e);
    }
    function onRelease(e) {
        if (!isActiveState)
            return;
        finalize();
    }
    barContainer.on('touchstart', onTouch);
    barContainer.on('touchmove', onDrag);
    barContainer.on('touchend', onRelease);
    barContainer.on('touchendoutside', onRelease);
    barContainer.on('mousedown', onTouch);
    barContainer.on('mousemove', onDrag);
    barContainer.on('mouseup', onRelease);
    barContainer.on('mouseupoutside', onRelease);
}
function beginContact(contactEvent) {
    if (finalized)
        return;
    const bodyA = contactEvent.bodyA;
    const bodyB = contactEvent.bodyB;
    const barBody = body;
    if (!(bodyA === barBody || bodyB === barBody))
        return;
    if (box.sensor) {
        hide();
        return;
    }
    finalize();
}
Bus_1.default.subscribe('State.IsActive', (isActive) => {
    isActiveState = isActive;
});
exports.default = { initialize, update, finalize, hide };


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const widthUnits = 16;
const heightUnits = 28;
const pixelsPerUnit = 64;
const width = widthUnits * pixelsPerUnit;
const height = heightUnits * pixelsPerUnit;
const rendererOptions = { transparent: false, backgroundColor: 0x000000 };
const renderer = new PIXI.WebGLRenderer(width, height, rendererOptions);
const view = renderer.view;
view.id = 'viewport';
view.style.display = 'none';
view.style.marginLeft = 'auto';
view.style.marginRight = 'auto';
document.body.appendChild(view);
function resizeView() { resize(renderer); }
window.addEventListener('resize', () => { resizeView(); });
window.addEventListener('orientationchange', () => { resizeView(); });
resizeView();
function resize(renderer) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const view = renderer.view;
    const windowRatio = windowWidth / windowHeight;
    const pixiRatio = renderer.width / renderer.height;
    if (windowRatio > pixiRatio) {
        // Screen is wider than the renderer
        view.style.width = Math.floor(windowHeight * pixiRatio) + 'px';
        view.style.height = windowHeight + 'px';
    }
    else {
        // Screen is narrower
        view.style.width = windowWidth + 'px';
        view.style.height = Math.floor(windowWidth / pixiRatio) + 'px';
    }
}
exports.default = renderer;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TerrainObject_1 = __webpack_require__(3);
const TerrainObjectType_1 = __webpack_require__(2);
const materials_1 = __webpack_require__(0);
const terrainObjectKit_1 = __webpack_require__(5);
const p2Util_1 = __webpack_require__(1);
class Snake extends TerrainObject_1.default {
    constructor(world, pixiGraph, textures, speed, agitateCycle) {
        super(TerrainObjectType_1.default.Snake, world, pixiGraph);
        this.segmentCount = 4;
        this.segments = [];
        this.agitateCycle = agitateCycle;
        let previousSegment = null;
        for (let i = 0; i < this.segmentCount; i++) {
            let twoByFourBody = new p2.Body({
                mass: 0.5
            });
            twoByFourBody.gravityScale = 0;
            const twoByFourSprite = new PIXI.Sprite(textures.twoByFour);
            this.addBody(twoByFourBody, twoByFourSprite, pixiGraph.twoByFourContainer);
            this.segments.push(twoByFourBody);
            const boxShape = new p2.Box({ width: 0.5, height: 4 });
            boxShape.material = materials_1.default.wood;
            this.addShape(twoByFourBody, boxShape);
            if (previousSegment === null) {
                const anchorBody = this.anchorBody = terrainObjectKit_1.default.getAnchor(twoByFourBody);
                this.addBodyHidden(anchorBody);
                const anchorConstraint = this.anchorConstraint = terrainObjectKit_1.default.getAnchorConstraint(twoByFourBody, anchorBody, [1.75, 0], true);
                this.addConstraint(anchorConstraint);
            }
            else {
                const revoluteConstraint = new p2.RevoluteConstraint(twoByFourBody, previousSegment, { localPivotA: [0, 1.75], localPivotB: [0, -1.75] });
                revoluteConstraint.collideConnected = false;
                const maxAngle = Math.PI / 4;
                revoluteConstraint.setLimits(-maxAngle, maxAngle);
                this.addConstraint(revoluteConstraint);
            }
            previousSegment = twoByFourBody;
        }
    }
    scheduleAgitate() {
        this.nextAgitateTime = performance.now() + this.agitateCycle;
    }
    agitate() {
        if (!this.active || performance.now() < this.nextAgitateTime)
            return;
        this.anchorConstraint.setMotorSpeed(-this.anchorConstraint.getMotorSpeed());
        this.scheduleAgitate();
    }
    activate(position, speed, agitateCycle) {
        super.activate();
        // Position is the centre of the entire snake
        const snakeHeight = (this.segmentCount * 3.5) + 0.5;
        const tailBodyPosition = [position[0], (position[1] + (snakeHeight / 2)) - 2];
        p2Util_1.default.updateBodyPosition(this.anchorBody, [tailBodyPosition[0], tailBodyPosition[1] + 1.75]);
        const segments = this.segments;
        for (let i = 0; i < segments.length; i++) {
            p2Util_1.default.updateBodyPosition(segments[i], [tailBodyPosition[0], tailBodyPosition[1] - (i * 3.5)]);
        }
        this.anchorConstraint.setMotorSpeed(speed);
        this.agitateCycle = agitateCycle;
        this.scheduleAgitate();
    }
}
exports.default = Snake;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TerrainObject_1 = __webpack_require__(3);
const TerrainObjectType_1 = __webpack_require__(2);
const materials_1 = __webpack_require__(0);
const terrainObjectKit_1 = __webpack_require__(5);
const p2Util_1 = __webpack_require__(1);
class Spinner extends TerrainObject_1.default {
    constructor(world, pixiGraph, textures) {
        super(TerrainObjectType_1.default.Spinner, world, pixiGraph);
        const spinnerBody = new p2.Body({
            mass: 6
        });
        spinnerBody.gravityScale = 0;
        const spinnerSprite = new PIXI.Sprite(textures.spinner);
        spinnerSprite.isSpinner = true;
        this.addBody(spinnerBody, spinnerSprite, pixiGraph.spinnerContainer);
        this.spinnerBody = spinnerBody;
        const horizontalBoxShape = new p2.Box({ width: 6, height: 1 });
        horizontalBoxShape.material = materials_1.default.wood;
        this.addShape(spinnerBody, horizontalBoxShape);
        const verticalBoxShape = new p2.Box({ width: 6, height: 1 });
        verticalBoxShape.material = materials_1.default.wood;
        this.addShape(spinnerBody, verticalBoxShape, { angle: -Math.PI / 2 });
        const anchorBody = this.anchorBody = terrainObjectKit_1.default.getAnchor(spinnerBody);
        this.addBodyHidden(anchorBody);
        const revoluteConstraint = this.anchorConstraint = terrainObjectKit_1.default.getAnchorConstraint(spinnerBody, anchorBody, null, true);
        this.addConstraint(revoluteConstraint);
    }
    activate(position, speed) {
        super.activate();
        p2Util_1.default.updateBodyPosition(this.spinnerBody, position);
        p2Util_1.default.updateBodyPosition(this.anchorBody, position);
        this.anchorConstraint.setMotorSpeed(speed);
    }
}
exports.default = Spinner;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fontsPromise = new Promise((resolve, reject) => {
    const loader = new PIXI.loaders.Loader();
    loader.add('Constantia', 'fonts/Constantia/Constantia.fnt');
    loader.load((loader, resources) => {
        resolve();
    });
});
exports.default = fontsPromise;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var soundsPromise = new Promise((resolve, reject) => {
    if (!window.cordova) {
        reject('Web context, no sound');
        return;
    }
    const audio = document.createElement('audio');
    const supportsMp3 = !!(audio.canPlayType && audio.canPlayType('audio/mpeg;').replace(/no/, ''));
    const supportsOgg = !!(audio.canPlayType && audio.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
    if (!supportsMp3 && !supportsOgg) {
        reject('Neither MP3 nor OGG supported');
        return;
    }
    const soundsCount = 1;
    let soundsLoadedCount = 0;
    const extension = supportsMp3 ? '.mp3' : '.ogg';
    const sounds = {
        saw: loadSound('saw'),
        checkpoint: loadSound('checkpoint'),
        lostLife: loadSound('lost-life'),
        gainedLife: loadSound('gained-life'),
        clock: loadSound('clock'),
        alarm: loadSound('alarm'),
        won: loadSound('won'),
        lost: loadSound('lost')
    };
    function loadSound(fileName) {
        const audio = new Audio();
        audio.src = 'sound/' + fileName + extension;
        audio.addEventListener('canplaythrough', function () {
            soundsLoadedCount++;
            if (soundsLoadedCount === soundsCount) {
                resolve(sounds);
            }
        });
        audio.load();
        return audio;
    }
});
exports.default = soundsPromise;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var texturesPromise = new Promise((resolve, reject) => {
    const loader = new PIXI.loaders.Loader();
    loader.add('ball', 'img/ball.png');
    loader.add('ballReflections', 'img/ball-reflections.png');
    loader.add('girder', 'img/girder.png');
    loader.add('brick', 'img/brick.png');
    loader.add('seesaw', 'img/seesaw.png');
    loader.add('spinner', 'img/spinner.png');
    loader.add('saw', 'img/saw.png');
    loader.add('sawSmall', 'img/saw-small.png');
    loader.add('twoByFour', 'img/two-by-four.png');
    loader.add('clouds', 'img/clouds.jpg');
    loader.add('bar', 'img/bar.png');
    loader.add('helpHand', 'img/help-hand.png');
    loader.add('plus1Life', 'img/plus-1-life.png');
    loader.add('windLeft', 'img/wind-left.png');
    loader.add('windRight', 'img/wind-right.png');
    loader.add('timeBar', 'img/time-bar.png');
    loader.add('timeBarTime', 'img/time-bar-time.png');
    loader.add('ground', 'img/ground.png');
    loader.add('paper', 'img/paper.jpg');
    loader.load((loader, resources) => {
        const textures = {};
        for (var resourceKey in resources) {
            textures[resourceKey] = resources[resourceKey].texture;
        }
        resolve(textures);
    });
});
exports.default = texturesPromise;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameState_1 = __webpack_require__(22);
const randomUtil_1 = __webpack_require__(6);
const soundPlayer_1 = __webpack_require__(8);
const pixiRenderer_1 = __webpack_require__(11);
const bar_1 = __webpack_require__(10);
const terrainBuilder_1 = __webpack_require__(9);
const Color_1 = __webpack_require__(7);
const tintUtil_1 = __webpack_require__(34);
const p2Util_1 = __webpack_require__(1);
const Bus_1 = __webpack_require__(4);
const startingHeight = 1000;
const startingLives = 5;
let height = startingHeight;
let lives = startingLives;
let timeElapsed = null;
let timeSinceLastCheckpoint = null;
let nextCheckpointHeight = null;
let clockTicking;
let isInvincible = false;
let timeSinceInvincible = null;
let fatalTerrainObject;
let tintedSprites = [];
let world = null;
let pixiGraph = null;
let ballBody;
let screenAABB = new p2.AABB();
let lastAnimateTime;
let state;
let preNavState;
let prePageHiddenState;
function initialize(wld, pxGraph, ballBdy) {
    world = wld;
    pixiGraph = pxGraph;
    ballBody = ballBdy;
    document.addEventListener('visibilitychange', handleVisibilityChange, false);
    pixiGraph.terrainContainer.visible = false;
    preNavState = GameState_1.default.Active;
    setState(GameState_1.default.Intro);
    soundPlayer_1.default.play('saw');
    requestAnimationFrame(animate);
}
function handleVisibilityChange(e) {
    const document = e.target;
    const visibilityState = document.visibilityState;
    if (visibilityState === 'visible') {
        lastAnimateTime = performance.now();
        soundPlayer_1.default.resumeAll();
        setState(prePageHiddenState);
    }
    else {
        prePageHiddenState = state;
        soundPlayer_1.default.pauseAll();
        setState(GameState_1.default.PageHidden);
    }
}
function animate(time) {
    requestAnimationFrame(animate);
    if (state === GameState_1.default.PageHidden)
        return;
    const fixedTimeStep = 1 / 60;
    let deltaTime = time - (lastAnimateTime || time);
    lastAnimateTime = time;
    switch (state) {
        case GameState_1.default.Active:
            const containerPosition = pixiGraph.container.position;
            const ballBodyPositionX = ballBody.position[0];
            const ballBodyPositionY = ballBody.position[1];
            processInvincibility(deltaTime);
            updateScreenAABB();
            bar_1.default.update();
            terrainBuilder_1.default.update(ballBody, screenAABB);
            world.step(fixedTimeStep, deltaTime / 1000, 5);
            p2Util_1.default.limitVelocity(world);
            processHeightChange(ballBodyPositionY);
            processCheckpoints(ballBodyPositionY, deltaTime);
            setScroll(ballBodyPositionX, ballBodyPositionY, containerPosition);
            updateTransforms();
            timeElapsed += deltaTime;
            break;
        case GameState_1.default.Dying:
            processLifeLostAnimation(deltaTime);
            break;
        case GameState_1.default.Won:
            processGameWonAnimation(deltaTime);
            break;
        case GameState_1.default.Lost:
            processGameLostAnimation(deltaTime);
            break;
    }
    pixiRenderer_1.default.render(pixiGraph.stage);
}
function processHeightChange(ballBodyPositionY) {
    if (ballBodyPositionY <= 0)
        return;
    const currentHeight = Math.round(ballBodyPositionY);
    if (currentHeight !== height) {
        height = currentHeight;
        Bus_1.default.publish('Height.Set', height);
    }
}
function processCheckpoints(ballBodyPositionY, deltaTime) {
    if (ballBodyPositionY <= 0)
        return;
    if (nextCheckpointHeight === null || ballBodyPositionY <= nextCheckpointHeight) {
        nextCheckpointHeight = (Math.floor(ballBodyPositionY / 100) * 100);
        if (nextCheckpointHeight === ballBodyPositionY) {
            nextCheckpointHeight -= 100;
        }
        timeSinceLastCheckpoint = 0;
        Bus_1.default.publish('NextCheckpointHeight.Set', nextCheckpointHeight);
        soundPlayer_1.default.stop('clock');
        clockTicking = false;
        soundPlayer_1.default.play('checkpoint');
    }
    else {
        timeSinceLastCheckpoint += deltaTime;
    }
    let timeRemainingQuotient = 1 - (timeSinceLastCheckpoint / (30000));
    if (timeRemainingQuotient <= 0) {
        timeSinceLastCheckpoint = 0;
        timeRemainingQuotient = 0;
        soundPlayer_1.default.stop('clock');
        clockTicking = false;
        lostLife(null);
    }
    else if (timeRemainingQuotient <= (1 / 3) && !clockTicking) {
        soundPlayer_1.default.play('clock');
        clockTicking = true;
    }
    Bus_1.default.publish('TimeRemainingQuotient.Set', timeRemainingQuotient);
}
function processInvincibility(deltaTime) {
    if (isInvincible) {
        timeSinceInvincible += deltaTime;
        if (timeSinceInvincible > (3000)) {
            timeSinceInvincible = 0;
            isInvincible = false;
            Bus_1.default.publish('IsInvincible.Set', isInvincible);
        }
    }
}
function setScroll(ballBodyPositionX, ballBodyPositionY, containerPosition) {
    // Focus on the ball
    containerPosition.x = (pixiRenderer_1.default.width / 2) - (ballBodyPositionX * 64);
    containerPosition.y = 640 + (ballBodyPositionY * 64);
    // Position parallax background
    const backgroundPosition = pixiGraph.background.position;
    backgroundPosition.x = (((containerPosition.x + 10000000) / 2) % 1024);
    backgroundPosition.y = (((containerPosition.y + 10000000) / 2) % 1024);
}
function updateTransforms() {
    const pixelsPerUnit = 64;
    const bodies = world.bodies;
    for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        if (body.aabbNeedsUpdate) {
            body.updateAABB();
        }
        const aabb = body.aabb;
        const interpolatedPosition = body.interpolatedPosition;
        const isOnScreen = !(aabb.lowerBound[1] > screenAABB.upperBound[1] ||
            aabb.upperBound[1] < screenAABB.lowerBound[1] ||
            aabb.upperBound[0] < screenAABB.lowerBound[0] ||
            aabb.lowerBound[0] > screenAABB.upperBound[0]);
        const displayObject = body.sprite;
        if (displayObject) {
            const position = displayObject.position;
            position.x = interpolatedPosition[0] * pixelsPerUnit;
            position.y = -interpolatedPosition[1] * pixelsPerUnit;
            displayObject.rotation = -body.interpolatedAngle;
            displayObject.visible = isOnScreen;
        }
        const displayObjectReflection = body.spriteReflection;
        if (displayObjectReflection) {
            const position = displayObjectReflection.position;
            position.x = interpolatedPosition[0] * pixelsPerUnit;
            position.y = -interpolatedPosition[1] * pixelsPerUnit;
            displayObjectReflection.visible = isOnScreen;
        }
    }
}
function processLifeLostAnimation(deltaTime) {
    const increments = (1000 / deltaTime) * 1.5;
    const alphaDelta = 1 / increments;
    pixiGraph.playerBallContainer.alpha -= alphaDelta;
    if (pixiGraph.playerBallContainer.alpha <= 0) {
        tintUtil_1.default.untintSprite(ballBody.sprite);
        tintUtil_1.default.untintSprite(ballBody.spriteReflection);
        if (fatalTerrainObject) {
            fatalTerrainObject.deactivate();
            tintUtil_1.default.untintTerrainObject(fatalTerrainObject);
            fatalTerrainObject = null;
        }
        pixiGraph.playerBallContainer.alpha = 1;
        p2Util_1.default.resetBody(ballBody);
        if (lives <= 0) {
            gameLost();
            return;
        }
        setState(GameState_1.default.Active);
        isInvincible = true;
        Bus_1.default.publish('IsInvincible.Set', isInvincible);
        soundPlayer_1.default.resumeAll();
    }
}
function getVisibleSprites() {
    const visibleSprites = pixiGraph.terrainContainer.children.map((displayObject) => displayObject instanceof PIXI.Sprite
        ? [displayObject]
        : displayObject.children.filter((sprite) => sprite.visible));
    return [pixiGraph.background]
        .concat(pixiGraph.barContainer.children[0])
        .concat(...visibleSprites);
}
function lostLife(fatalBody) {
    lives--;
    Bus_1.default.publish('Lives.Set', lives);
    bar_1.default.finalize();
    setState(GameState_1.default.Dying);
    soundPlayer_1.default.pauseAll();
    if (fatalBody) {
        soundPlayer_1.default.play('lostLife');
    }
    else {
        soundPlayer_1.default.play('alarm');
    }
}
function gameLost() {
    setState(GameState_1.default.Lost);
    soundPlayer_1.default.stopAll();
    soundPlayer_1.default.play('lost');
    tintedSprites = getVisibleSprites();
    for (let i = 0; i < tintedSprites.length; i++) {
        tintUtil_1.default.tintSprite(tintedSprites[i], Color_1.default.red);
    }
}
function processGameLostAnimation(deltaTime) {
    const increments = (1000 / deltaTime) * 3;
    const alphaDelta = 1 / increments;
    pixiGraph.background.alpha -= alphaDelta;
    pixiGraph.container.alpha -= alphaDelta;
    if (pixiGraph.container.alpha <= 0) {
        startNewGame();
    }
}
function gameWon() {
    setState(GameState_1.default.Won);
    soundPlayer_1.default.stopAll();
    soundPlayer_1.default.play('won');
    Bus_1.default.publish('Menu.RequestGameWonPanel', { time: timeElapsed, lives: lives });
}
function processGameWonAnimation(deltaTime) {
    Bus_1.default.publish('Menu.IncrementGameWonPanelAlpha', deltaTime);
}
function updateScreenAABB() {
    const ballBodyPosition = ballBody.position;
    const ballBodyPositionX = ballBodyPosition[0];
    const ballBodyPositionY = ballBodyPosition[1];
    screenAABB.lowerBound[0] = ballBodyPositionX - 8;
    screenAABB.lowerBound[1] = ballBodyPositionY - 18;
    screenAABB.upperBound[0] = ballBodyPositionX + 8;
    screenAABB.upperBound[1] = ballBodyPositionY + 10;
}
function startNewGame() {
    randomUtil_1.default.reseed();
    terrainBuilder_1.default.deactivateAll();
    height = startingHeight;
    Bus_1.default.publish('Height.Set', height);
    lives = startingLives;
    Bus_1.default.publish('Lives.Set', lives);
    isInvincible = false;
    timeSinceLastCheckpoint = 0;
    nextCheckpointHeight = startingHeight - 100;
    Bus_1.default.publish('NextCheckpointHeight.Set', nextCheckpointHeight);
    timeElapsed = 0;
    p2Util_1.default.updateBodyPosition(ballBody, [0, height]);
    tintUtil_1.default.untintSprite(ballBody.sprite);
    tintUtil_1.default.untintSprite(ballBody.spriteReflection);
    for (let i = 0; i < tintedSprites.length; i++) {
        tintUtil_1.default.untintSprite(tintedSprites[i]);
    }
    pixiGraph.background.alpha = 1;
    pixiGraph.container.alpha = 1;
    if (fatalTerrainObject) {
        tintUtil_1.default.untintTerrainObject(fatalTerrainObject);
        fatalTerrainObject = null;
    }
    pixiGraph.playerBallContainer.alpha = 1;
    pixiGraph.sawContainer.alpha = 1;
    pixiGraph.freeSawContainer.alpha = 1;
    soundPlayer_1.default.stopAll();
    bar_1.default.hide();
    setState(GameState_1.default.Active);
}
function setState(newState) {
    state = newState;
    const isActive = (state === GameState_1.default.Active);
    pixiRenderer_1.default.view.className = isActive ? 'playing-field' : '';
    Bus_1.default.publish('State.IsActive', isActive);
}
Bus_1.default.subscribe('Menu.Shown', () => {
    pixiGraph.background.visible = false;
    pixiGraph.container.visible = false;
    pixiGraph.windLeft.visible = false;
    pixiGraph.windRight.visible = false;
    soundPlayer_1.default.pauseAll();
    preNavState = state;
    setState(GameState_1.default.Menu);
});
Bus_1.default.subscribe('Menu.Hidden', () => {
    pixiGraph.background.visible = true;
    if (state === GameState_1.default.Intro) {
        pixiGraph.terrainContainer.visible = true;
        startNewGame();
    }
    else {
        pixiGraph.container.visible = true;
        soundPlayer_1.default.resumeAll();
        setState(preNavState);
    }
});
Bus_1.default.subscribe('Menu.RequestRestartGame', () => {
    pixiGraph.background.visible = true;
    pixiGraph.container.visible = true;
    startNewGame();
});
Bus_1.default.subscribe('Ball.CollisionWithFatal', (fatalBody) => {
    if (!isInvincible) {
        fatalTerrainObject = fatalBody.terrainObject;
        tintUtil_1.default.tintSprite(ballBody.sprite, Color_1.default.red);
        tintUtil_1.default.tintSprite(ballBody.spriteReflection, Color_1.default.red);
        tintUtil_1.default.tintTerrainObject(fatalTerrainObject, Color_1.default.red);
        lostLife(fatalBody);
    }
});
Bus_1.default.subscribe('Ball.CollisionWithPlusOne', () => {
    lives++;
    Bus_1.default.publish('Lives.Set', lives);
    soundPlayer_1.default.play('gainedLife');
});
Bus_1.default.subscribe('Ball.CollisionWithGround', () => {
    gameWon();
});
exports.default = { initialize };


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const buildNavContainer_1 = __webpack_require__(23);
const Bus_1 = __webpack_require__(4);
function buildPixiGraph(textures, soundSupported) {
    const stage = new PIXI.Container();
    const background = new PIXI.Sprite(textures.clouds);
    background.scale.x = background.scale.y = 2;
    background.anchor.x = background.anchor.y = 0.5;
    background.visible = false;
    const container = new PIXI.Container();
    const terrainContainer = new PIXI.Container();
    const girderContainer = new PIXI.Container();
    const brickContainer = new PIXI.Container();
    const seesawContainer = new PIXI.Container();
    const spinnerContainer = new PIXI.Container();
    const sawContainer = new PIXI.Container();
    const freeSawContainer = new PIXI.Container();
    const twoByFourContainer = new PIXI.Container();
    const playerBallContainer = new PIXI.Container();
    const ballContainer = new PIXI.Container();
    const ballReflectionsContainer = new PIXI.Container();
    const plus1LifeContainer = new PIXI.Container();
    const windAlpha = 0.75;
    const windLeft = new PIXI.Sprite(textures.windLeft);
    windLeft.anchor.x = windLeft.anchor.y = 0.5;
    windLeft.position.x = 256;
    windLeft.position.y = 567;
    windLeft.alpha = windAlpha;
    windLeft.visible = false;
    const windRight = new PIXI.Sprite(textures.windRight);
    windRight.anchor.x = windRight.anchor.y = 0.5;
    windRight.position.x = 768;
    windRight.position.y = 567;
    windRight.alpha = windAlpha;
    windRight.visible = false;
    const barContainer = new PIXI.Container();
    barContainer.interactive = true;
    barContainer.hitArea = new PIXI.Rectangle(-10000000, -10000000, 20000000, 20000000);
    terrainContainer.addChild(girderContainer);
    terrainContainer.addChild(brickContainer);
    terrainContainer.addChild(seesawContainer);
    terrainContainer.addChild(spinnerContainer);
    terrainContainer.addChild(twoByFourContainer);
    terrainContainer.addChild(ballContainer);
    terrainContainer.addChild(ballReflectionsContainer);
    terrainContainer.addChild(sawContainer);
    terrainContainer.addChild(freeSawContainer);
    terrainContainer.addChild(playerBallContainer);
    terrainContainer.addChild(plus1LifeContainer);
    container.addChild(terrainContainer);
    container.addChild(barContainer);
    const navContainer = buildNavContainer_1.default(textures, soundSupported);
    stage.addChild(background);
    stage.addChild(container);
    stage.addChild(windLeft);
    stage.addChild(windRight);
    stage.addChild(navContainer);
    Bus_1.default.subscribe('IsInvincible.Set', (isInvincible) => {
        sawContainer.alpha = isInvincible ? 0.5 : 1;
        freeSawContainer.alpha = isInvincible ? 0.5 : 1;
    });
    return {
        stage,
        container,
        terrainContainer,
        barContainer,
        girderContainer,
        brickContainer,
        seesawContainer,
        spinnerContainer,
        sawContainer,
        freeSawContainer,
        twoByFourContainer,
        playerBallContainer,
        ballContainer,
        ballReflectionsContainer,
        plus1LifeContainer,
        background,
        windLeft,
        windRight
    };
}
exports.default = buildPixiGraph;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TerrainObjectType_1 = __webpack_require__(2);
const materials_1 = __webpack_require__(0);
const Color_1 = __webpack_require__(7);
const Bus_1 = __webpack_require__(4);
let body;
function initialize(world, pixiGraph, textures) {
    body = new p2.Body({
        mass: 0.5
    });
    body.allowSleep = false;
    const circle = new p2.Circle({ radius: 1 });
    circle.material = materials_1.default.ball;
    body.addShape(circle);
    const ballSprite = new PIXI.Sprite(textures.ball);
    ballSprite.anchor = new PIXI.ObservablePoint(null, null, 0.5, 0.5);
    ballSprite.tint = ballSprite.originalTint = Color_1.default.blue;
    pixiGraph.playerBallContainer.addChild(ballSprite);
    body.sprite = ballSprite;
    const ballReflectionSprite = new PIXI.Sprite(textures.ballReflections);
    ballReflectionSprite.alpha = 0.5;
    ballReflectionSprite.anchor = new PIXI.ObservablePoint(null, null, 0.5, 0.5);
    pixiGraph.playerBallContainer.addChild(ballReflectionSprite);
    body.spriteReflection = ballReflectionSprite;
    world.addBody(body);
    world.on('beginContact', beginContact, this);
    return body;
}
function beginContact(contactEvent) {
    const bodyA = contactEvent.bodyA;
    const bodyB = contactEvent.bodyB;
    if (bodyA === body || bodyB === body) {
        const otherBody = bodyA === body ? bodyB : bodyA;
        if (otherBody.isFatal) {
            Bus_1.default.publish('Ball.CollisionWithFatal', otherBody);
            return;
        }
        else if (otherBody.isGround) {
            Bus_1.default.publish('Ball.CollisionWithGround');
            return;
        }
        else if (otherBody.terrainObject && otherBody.terrainObject.type === TerrainObjectType_1.default.Plus1Life) {
            otherBody.terrainObject.deactivate();
            Bus_1.default.publish('Ball.CollisionWithPlusOne');
        }
    }
}
exports.default = { initialize };


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var deviceReadyPromise = new Promise((resolve, reject) => {
    if (window.cordova) {
        document.addEventListener('deviceready', () => {
            resolve();
        }, false);
    }
    else {
        resolve();
    }
});
exports.default = deviceReadyPromise;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const materials_1 = __webpack_require__(0);
function createWorld() {
    const world = new p2.World({
        gravity: [0, -4.9]
    });
    world.solver = new p2.GSSolver({
        tolerance: 0.01,
        iterations: 10
    });
    world.sleepMode = p2.World.BODY_SLEEPING;
    addContactMaterials(world);
    return world;
}
function addContactMaterials(world) {
    // Wood
    world.addContactMaterial(new p2.ContactMaterial(materials_1.default.wood, materials_1.default.wood, {
        restitution: 0.1,
        stiffness: Number.MAX_VALUE,
        friction: 0.3,
        relaxation: undefined,
        frictionStiffness: undefined,
        frictionRelaxation: undefined,
        surfaceVelocity: undefined
    }));
    world.addContactMaterial(new p2.ContactMaterial(materials_1.default.wood, materials_1.default.saw, {
        restitution: 0.3,
        stiffness: Number.MAX_VALUE,
        friction: 0.6,
        relaxation: undefined,
        frictionStiffness: undefined,
        frictionRelaxation: undefined,
        surfaceVelocity: undefined
    }));
    world.addContactMaterial(new p2.ContactMaterial(materials_1.default.wood, materials_1.default.brick, {
        restitution: 0.1,
        stiffness: Number.MAX_VALUE,
        friction: 0.6,
        relaxation: undefined,
        frictionStiffness: undefined,
        frictionRelaxation: undefined,
        surfaceVelocity: undefined
    }));
    world.addContactMaterial(new p2.ContactMaterial(materials_1.default.wood, materials_1.default.ball, {
        restitution: 0.4,
        stiffness: Number.MAX_VALUE,
        friction: 0.3,
        relaxation: undefined,
        frictionStiffness: undefined,
        frictionRelaxation: undefined,
        surfaceVelocity: undefined
    }));
    // Brick
    world.addContactMaterial(new p2.ContactMaterial(materials_1.default.brick, materials_1.default.brick, {
        restitution: 0,
        stiffness: Number.MAX_VALUE,
        friction: 0.8,
        relaxation: undefined,
        frictionStiffness: undefined,
        frictionRelaxation: undefined,
        surfaceVelocity: undefined
    }));
    world.addContactMaterial(new p2.ContactMaterial(materials_1.default.brick, materials_1.default.ball, {
        restitution: 0.5,
        stiffness: Number.MAX_VALUE,
        friction: 0.4,
        relaxation: undefined,
        frictionStiffness: undefined,
        frictionRelaxation: undefined,
        surfaceVelocity: undefined
    }));
    world.addContactMaterial(new p2.ContactMaterial(materials_1.default.brick, materials_1.default.saw, {
        restitution: 0.3,
        stiffness: Number.MAX_VALUE,
        friction: 0.4,
        relaxation: undefined,
        frictionStiffness: undefined,
        frictionRelaxation: undefined,
        surfaceVelocity: undefined
    }));
    // Saw
    world.addContactMaterial(new p2.ContactMaterial(materials_1.default.saw, materials_1.default.saw, {
        restitution: 0.4,
        stiffness: Number.MAX_VALUE,
        friction: 0.8,
        relaxation: undefined,
        frictionStiffness: undefined,
        frictionRelaxation: undefined,
        surfaceVelocity: undefined
    }));
}
exports.default = createWorld;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameState;
(function (GameState) {
    GameState[GameState["PageHidden"] = 0] = "PageHidden";
    GameState[GameState["Intro"] = 1] = "Intro";
    GameState[GameState["Active"] = 2] = "Active";
    GameState[GameState["Dying"] = 3] = "Dying";
    GameState[GameState["Menu"] = 4] = "Menu";
    GameState[GameState["Won"] = 5] = "Won";
    GameState[GameState["Lost"] = 6] = "Lost";
})(GameState || (GameState = {}));
exports.default = GameState;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __webpack_require__(7);
const pixiRenderer_1 = __webpack_require__(11);
const blendColors_1 = __webpack_require__(33);
const Bus_1 = __webpack_require__(4);
const version = '1.0.0.0';
const width = pixiRenderer_1.default.width;
const height = pixiRenderer_1.default.height;
const xCenter = width / 2;
const tinyTextStyle = getTextStyle(0.5);
const smallTextStyle = getTextStyle(0.6);
const mediumTextStyle = getTextStyle(0.7);
const largeTextStyle = getTextStyle(0.8);
const hugeTextStyle = getTextStyle(1);
function buildNavContainer(textures, soundSupported) {
    const navContainer = new PIXI.Container;
    const navBackground = buildNavBackground(textures);
    const introPanel = buildIntroPanel(textures);
    const menuPanel = buildMenuPanel(soundSupported);
    const helpPanel = buildHelpPanel(textures);
    const aboutPanel = buildAboutPanel();
    const restartPanel = buildRestartPanel();
    const topMenu = buildTopMenu(textures);
    const gameWonPanel = buildGameWonPanel(textures);
    navContainer.addChild(navBackground);
    navContainer.addChild(topMenu);
    navContainer.addChild(menuPanel);
    navContainer.addChild(introPanel);
    navContainer.addChild(helpPanel);
    navContainer.addChild(aboutPanel);
    navContainer.addChild(restartPanel);
    navContainer.addChild(gameWonPanel);
    Bus_1.default.subscribe('Menu.IntroHidden', (data) => {
        navBackground.visible = false;
        topMenu.visible = true;
        Bus_1.default.publish('Menu.RequestHide');
    });
    Bus_1.default.subscribe('Menu.RequestShow', (data) => {
        topMenu.visible = false;
        navBackground.visible = true;
        menuPanel.visible = true;
        Bus_1.default.publish('Menu.Shown');
    });
    Bus_1.default.subscribe('Menu.RequestHide', (data) => {
        menuPanel.visible = false;
        navBackground.visible = false;
        topMenu.visible = true;
        Bus_1.default.publish('Menu.Hidden');
    });
    Bus_1.default.subscribe('Menu.RequestHelpPanel', (data) => {
        menuPanel.visible = false;
        helpPanel.visible = true;
    });
    Bus_1.default.subscribe('Menu.RequestAboutPanel', (data) => {
        menuPanel.visible = false;
        aboutPanel.visible = true;
    });
    Bus_1.default.subscribe('Menu.RequestRestartPanel', (data) => {
        menuPanel.visible = false;
        restartPanel.visible = true;
    });
    Bus_1.default.subscribe('Menu.PanelHidden', (data) => {
        menuPanel.visible = true;
    });
    Bus_1.default.subscribe('Menu.RequestRestartGame', (data) => {
        menuPanel.visible = false;
        navBackground.visible = false;
        topMenu.visible = true;
    });
    Bus_1.default.subscribe('Menu.RequestGameWonPanel', (gameWonStats) => {
        topMenu.visible = false;
        gameWonPanel.visible = true;
        gameWonPanel.alpha = 0;
    });
    return navContainer;
}
function getTextStyle(multiplier) {
    return {
        font: { name: 'Constantia', size: 128 * multiplier },
        tint: Color_1.default.yellow
    };
}
function buildText(text, options) {
    const style = options.style || smallTextStyle;
    const pixiText = new PIXI.extras.BitmapText(text, style);
    if (options.left) {
        pixiText.position.x = Math.round(options.left);
    }
    else if (options.right) {
        pixiText.position.x = Math.round(options.right - pixiText.width);
    }
    else if (options.xCenter) {
        pixiText.position.x = Math.round(options.xCenter - (pixiText.width / 2));
    }
    if (options.top) {
        pixiText.position.y = Math.round(options.top);
    }
    else if (options.bottom) {
        pixiText.position.y = Math.round(options.bottom - pixiText.height);
    }
    else if (options.yCenter) {
        pixiText.position.y = Math.round(options.yCenter - (pixiText.height / 2));
    }
    if (options.callback) {
        pixiText.interactive = true;
        pixiText.buttonMode = true;
        const highlight = (e) => {
            const text = e.currentTarget;
            text.tint = Color_1.default.orange;
        };
        const unhighlight = (e) => {
            const text = e.currentTarget;
            text.tint = Color_1.default.yellow;
        };
        pixiText
            .on('mousedown', (e) => {
            highlight(e);
        })
            .on('touchstart', (e) => {
            highlight(e);
        });
        pixiText
            .on('mouseup', (e) => {
            unhighlight(e);
            options.callback();
        })
            .on('mouseupoutside', (e) => {
            unhighlight(e);
        })
            .on('touchend', (e) => {
            unhighlight(e);
            options.callback();
        })
            .on('touchendoutside', (e) => {
            unhighlight(e);
        });
    }
    return pixiText;
}
function buildHelpContent(textures) {
    const container = new PIXI.Container;
    const textStyle = mediumTextStyle;
    const text1 = buildText('Guide the ball to the ground', { xCenter: xCenter, yCenter: 320, style: textStyle });
    container.addChild(text1);
    const text2 = buildText('by drawing bars, like this:', { xCenter: xCenter, yCenter: 420, style: textStyle });
    container.addChild(text2);
    const handSprite = new PIXI.Sprite(textures.helpHand);
    handSprite.anchor.x = handSprite.anchor.y = 0.5;
    handSprite.position.x = 512;
    handSprite.position.y = 665;
    container.addChild(handSprite);
    const text3 = buildText('Avoid saws:', { xCenter: xCenter, yCenter: 850, style: textStyle });
    container.addChild(text3);
    const sawSprite = new PIXI.Sprite(textures.saw);
    sawSprite.anchor.x = sawSprite.anchor.y = 0.5;
    sawSprite.position.x = 512;
    sawSprite.position.y = 1000;
    container.addChild(sawSprite);
    const text4 = buildText('Collect extra lives:', { xCenter: xCenter, yCenter: 1150, style: textStyle });
    container.addChild(text4);
    const plus1LifeSprite = new PIXI.Sprite(textures.plus1Life);
    plus1LifeSprite.anchor.x = plus1LifeSprite.anchor.y = 0.5;
    plus1LifeSprite.position.x = 512;
    plus1LifeSprite.position.y = 1280;
    container.addChild(plus1LifeSprite);
    const text5 = buildText('Beat the timer.', { xCenter: xCenter, yCenter: 1420, style: textStyle });
    container.addChild(text5);
    return container;
}
function buildNavBackground(textures) {
    const backgroundSprite = new PIXI.Sprite(textures.clouds);
    backgroundSprite.scale.x = backgroundSprite.scale.y = 2;
    backgroundSprite.anchor.x = backgroundSprite.anchor.y = 0.5;
    backgroundSprite.alpha = 0.8;
    return backgroundSprite;
}
function buildTopMenu(textures) {
    const topMenu = new PIXI.Container();
    topMenu.visible = false;
    const heightLabel = buildText('Height', {
        left: 32,
        top: 16
    });
    topMenu.addChild(heightLabel);
    const height = buildText(getHeightText(1000), {
        left: heightLabel.position.x + heightLabel.width + 16,
        top: 16
    });
    topMenu.addChild(height);
    Bus_1.default.subscribe('Height.Set', (data) => {
        height.text = getHeightText(data);
    });
    const livesDummy = buildText('Lives: 9:', { left: 0, top: 0 });
    const livesLabel = buildText('Lives:', {
        left: (width * 0.6) - (livesDummy.width / 2),
        top: 16
    });
    topMenu.addChild(livesLabel);
    const lives = buildText((10).toString(), {
        left: livesLabel.position.x + livesLabel.width + 16,
        top: 16
    });
    topMenu.addChild(lives);
    Bus_1.default.subscribe('Lives.Set', (data) => {
        lives.text = data.toString();
    });
    const menu = buildText('Menu', {
        right: width - 32,
        top: 16,
        callback: () => {
            Bus_1.default.publish('Menu.RequestShow');
        }
    });
    topMenu.addChild(menu);
    const timeRemainingLabel = buildText(getTimeRemainingText(900), {
        left: 32,
        top: 106,
        style: tinyTextStyle
    });
    topMenu.addChild(timeRemainingLabel);
    Bus_1.default.subscribe('NextCheckpointHeight.Set', (height) => {
        timeRemainingLabel.text = getTimeRemainingText(height);
    });
    const timeBar = new PIXI.Sprite(textures.timeBar);
    timeBar.position.x = 392;
    timeBar.position.y = 128;
    topMenu.addChild(timeBar);
    const timeBarTime = new PIXI.Sprite(textures.timeBarTime);
    timeBarTime.position.x = 394;
    timeBarTime.position.y = 130;
    timeBarTime.alpha = 0.85;
    topMenu.addChild(timeBarTime);
    Bus_1.default.subscribe('TimeRemainingQuotient.Set', (timeRemainingQuotient) => {
        timeBarTime.width = timeRemainingQuotient * 596;
        timeBarTime.tint = blendColors_1.default(Color_1.default.yellow, Color_1.default.red, timeRemainingQuotient);
        if (timeRemainingQuotient <= 0) {
            timeRemainingLabel.tint = Color_1.default.red;
        }
        else {
            timeRemainingLabel.tint = Color_1.default.yellow;
        }
    });
    return topMenu;
}
function buildIntroPanel(textures) {
    const introPanel = new PIXI.Container();
    introPanel.addChild(buildHelpContent(textures));
    introPanel.addChild(buildText('Start >', {
        xCenter: xCenter,
        yCenter: height * 0.92,
        style: hugeTextStyle,
        callback: () => {
            introPanel.visible = false;
            Bus_1.default.publish('Menu.IntroHidden');
        }
    }));
    return introPanel;
}
function getHeightText(height) {
    return height + 'm';
}
function getTimeRemainingText(height) {
    return 'Time to ' + height.toString() + 'm:';
}
function getSoundText(soundEnabled) {
    return 'Sound ' + (soundEnabled ? 'on' : 'off');
}
function buildMenuPanel(soundSupported) {
    const menuPanel = new PIXI.Container();
    const verticalSpace = height / 6;
    const textStyle = largeTextStyle;
    const soundStatus = buildText(getSoundText(soundSupported), {
        xCenter: xCenter,
        yCenter: verticalSpace,
        style: textStyle,
        callback: soundSupported
            ? () => { Bus_1.default.publish('Sound.Toggle'); }
            : null
    });
    if (soundSupported) {
        Bus_1.default.subscribe('Sound.Enable', (data) => {
            soundStatus.text = getSoundText(data);
        });
    }
    else {
        soundStatus.alpha = 0.5;
    }
    menuPanel.addChild(soundStatus);
    menuPanel.addChild(buildText('Help', {
        xCenter: xCenter,
        yCenter: verticalSpace * 2,
        style: textStyle,
        callback: () => {
            Bus_1.default.publish('Menu.RequestHelpPanel');
        }
    }));
    menuPanel.addChild(buildText('About', {
        xCenter: xCenter,
        yCenter: verticalSpace * 3,
        style: textStyle,
        callback: () => {
            Bus_1.default.publish('Menu.RequestAboutPanel');
        }
    }));
    menuPanel.addChild(buildText('Restart', {
        xCenter: xCenter,
        yCenter: verticalSpace * 4,
        style: textStyle,
        callback: () => {
            Bus_1.default.publish('Menu.RequestRestartPanel');
        }
    }));
    menuPanel.addChild(buildText('Return to game', {
        xCenter: xCenter,
        yCenter: verticalSpace * 5,
        style: textStyle,
        callback: () => {
            Bus_1.default.publish('Menu.RequestHide');
        }
    }));
    menuPanel.visible = false;
    return menuPanel;
}
function buildBackButton(panel) {
    return buildText('< Back', {
        xCenter: xCenter,
        yCenter: height * 0.92,
        style: hugeTextStyle,
        callback: () => {
            panel.visible = false;
            Bus_1.default.publish('Menu.PanelHidden');
        }
    });
}
function buildHelpPanel(textures) {
    const helpPanel = new PIXI.Container();
    helpPanel.addChild(buildHelpContent(textures));
    helpPanel.addChild(buildBackButton(helpPanel));
    helpPanel.visible = false;
    return helpPanel;
}
function buildAboutPanel() {
    const aboutPanel = new PIXI.Container();
    const text1 = buildText('Descensus 2', { xCenter: xCenter, yCenter: 600, style: largeTextStyle });
    aboutPanel.addChild(text1);
    const text2 = buildText('v1.0.2', { xCenter: xCenter, yCenter: 700, style: mediumTextStyle });
    aboutPanel.addChild(text2);
    const text3 = buildText('By Tom W Hall', { xCenter: xCenter, yCenter: 900 });
    aboutPanel.addChild(text3);
    const text4 = buildText('Boolean Operations Limited', { xCenter: xCenter, yCenter: 1000 });
    aboutPanel.addChild(text4);
    const text5 = buildText('http://booleanoperations.com', { xCenter: xCenter, yCenter: 1100 });
    aboutPanel.addChild(text5);
    aboutPanel.addChild(buildBackButton(aboutPanel));
    aboutPanel.visible = false;
    return aboutPanel;
}
function buildRestartPanel() {
    const textStyle = largeTextStyle;
    const restartPanel = new PIXI.Container();
    restartPanel.addChild(buildText('Restart game?', {
        xCenter: xCenter,
        yCenter: height * 0.45,
        style: textStyle
    }));
    restartPanel.addChild(buildText('No', {
        xCenter: (width / 3),
        yCenter: (height * 0.75),
        callback: () => {
            restartPanel.visible = false;
            Bus_1.default.publish('Menu.PanelHidden');
        },
        style: textStyle
    }));
    restartPanel.addChild(buildText('Yes', {
        xCenter: (width * (2 / 3)),
        yCenter: (height * 0.75),
        callback: () => {
            restartPanel.visible = false;
            Bus_1.default.publish('Menu.RequestRestartGame');
        },
        style: textStyle
    }));
    restartPanel.visible = false;
    return restartPanel;
}
function buildGameWonPanel(textures) {
    const gameWonPanel = new PIXI.Container();
    gameWonPanel.addChild(new PIXI.Sprite(textures.paper));
    function getTimeText(time) {
        const totalSeconds = time / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.round(totalSeconds % 60);
        return 'with a time of ' + minutes.toString() + ':' + (seconds < 10 ? '0' : '') + seconds.toString();
    }
    function getLivesText(lives) {
        return 'and with ' + lives.toString() + ' ' + (lives === 1 ? 'life' : 'lives') + ' remaining';
    }
    gameWonPanel.addChild(buildText('This certifies', { xCenter: xCenter, yCenter: 400, style: mediumTextStyle }));
    gameWonPanel.addChild(buildText('that you have completed', { xCenter: xCenter, yCenter: 500, style: mediumTextStyle }));
    gameWonPanel.addChild(buildText('Descensus 2', { xCenter: xCenter, yCenter: 700, style: hugeTextStyle }));
    const timeText = buildText(getTimeText(0), { xCenter: xCenter, yCenter: 900, style: mediumTextStyle });
    gameWonPanel.addChild(timeText);
    const livesText = buildText(getLivesText(10), { xCenter: xCenter, yCenter: 1000, style: mediumTextStyle });
    gameWonPanel.addChild(livesText);
    Bus_1.default.subscribe('Menu.RequestGameWonPanel', (gameWonStats) => {
        timeText.text = getTimeText(gameWonStats.time);
        timeText.position.x = Math.round(xCenter - (timeText.width / 2));
        livesText.text = getLivesText(gameWonStats.lives);
        livesText.position.x = Math.round(xCenter - (livesText.width / 2));
    });
    Bus_1.default.subscribe('Menu.IncrementGameWonPanelAlpha', (deltaTime) => {
        const increments = (1000 / deltaTime) * 5;
        const alphaDelta = 1 / increments;
        gameWonPanel.alpha = Math.min(1, gameWonPanel.alpha + alphaDelta);
    });
    gameWonPanel.addChild(buildText('New Game >', {
        xCenter: xCenter,
        yCenter: height * 0.92,
        style: largeTextStyle,
        callback: () => {
            gameWonPanel.visible = false;
            Bus_1.default.publish('Menu.RequestRestartGame');
        }
    }));
    gameWonPanel.visible = false;
    return gameWonPanel;
}
exports.default = buildNavContainer;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TerrainObjectType_1 = __webpack_require__(2);
const TerrainObject_1 = __webpack_require__(3);
const materials_1 = __webpack_require__(0);
const p2Util_1 = __webpack_require__(1);
class Brick extends TerrainObject_1.default {
    constructor(world, pixiGraph, textures) {
        super(TerrainObjectType_1.default.Brick, world, pixiGraph);
        const brickBody = new p2.Body({
            mass: 1
        });
        brickBody.allowSleep = false;
        const brickSprite = new PIXI.Sprite(textures.brick);
        this.addBody(brickBody, brickSprite, pixiGraph.brickContainer);
        const boxShape = new p2.Box({ width: 2, height: 0.625 });
        boxShape.material = materials_1.default.brick;
        this.addShape(brickBody, boxShape);
    }
    activate(position, angle) {
        super.activate();
        p2Util_1.default.updateBodyPosition(this.bodies[0], position, angle);
    }
}
exports.default = Brick;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TerrainObject_1 = __webpack_require__(3);
const TerrainObjectType_1 = __webpack_require__(2);
const materials_1 = __webpack_require__(0);
const p2Util_1 = __webpack_require__(1);
class FreeSaw extends TerrainObject_1.default {
    constructor(world, pixiGraph, textures) {
        super(TerrainObjectType_1.default.FreeSaw, world, pixiGraph);
        const sawBody = this.sawBody = new p2.Body({
            mass: 0.5
        });
        sawBody.damping = 0.5;
        sawBody.isFatal = true;
        sawBody.allowSleep = false;
        const sawSprite = new PIXI.Sprite(textures.sawSmall);
        this.addBody(sawBody, sawSprite, pixiGraph.freeSawContainer);
        const circleShape = new p2.Circle({ radius: 0.75 });
        circleShape.material = materials_1.default.saw;
        this.addShape(sawBody, circleShape);
    }
    activate(position, velocity) {
        super.activate();
        p2Util_1.default.updateBodyPosition(this.sawBody, position);
        this.sawBody.angularVelocity = -2;
        if (velocity) {
            this.sawBody.velocity = velocity;
        }
    }
}
exports.default = FreeSaw;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TerrainObjectType_1 = __webpack_require__(2);
const TerrainObject_1 = __webpack_require__(3);
const materials_1 = __webpack_require__(0);
const p2Util_1 = __webpack_require__(1);
class Girder extends TerrainObject_1.default {
    constructor(world, pixiGraph, textures) {
        super(TerrainObjectType_1.default.Girder, world, pixiGraph);
        const girderBody = new p2.Body({
            mass: 30
        });
        girderBody.gravityScale = 0;
        const girderSprite = new PIXI.Sprite(textures.girder);
        this.addBody(girderBody, girderSprite, pixiGraph.girderContainer);
        const boxShape = new p2.Box({ width: 4, height: 1 });
        boxShape.material = materials_1.default.wood;
        this.addShape(girderBody, boxShape);
    }
    activate(position, angle) {
        super.activate();
        p2Util_1.default.updateBodyPosition(this.bodies[0], position, angle);
    }
}
exports.default = Girder;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TerrainObject_1 = __webpack_require__(3);
const TerrainObjectType_1 = __webpack_require__(2);
const materials_1 = __webpack_require__(0);
const p2Util_1 = __webpack_require__(1);
class Plus1Life extends TerrainObject_1.default {
    constructor(world, pixiGraph, textures) {
        super(TerrainObjectType_1.default.Plus1Life, world, pixiGraph);
        const plus1LifeBody = this.plus1LifeBody = new p2.Body({
            mass: 0.5
        });
        plus1LifeBody.allowSleep = false;
        plus1LifeBody.damping = 0.8;
        const plus1LifeSprite = new PIXI.Sprite(textures.plus1Life);
        this.addBody(plus1LifeBody, plus1LifeSprite, pixiGraph.plus1LifeContainer);
        const boxShape = new p2.Box({ width: 2, height: 1.203125 });
        boxShape.material = materials_1.default.wood;
        this.addShape(plus1LifeBody, boxShape);
    }
    activate(position) {
        super.activate();
        p2Util_1.default.updateBodyPosition(this.plus1LifeBody, position);
    }
}
exports.default = Plus1Life;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TerrainObject_1 = __webpack_require__(3);
const TerrainObjectType_1 = __webpack_require__(2);
const materials_1 = __webpack_require__(0);
const terrainObjectKit_1 = __webpack_require__(5);
const p2Util_1 = __webpack_require__(1);
class Saw extends TerrainObject_1.default {
    constructor(world, pixiGraph, textures) {
        super(TerrainObjectType_1.default.Saw, world, pixiGraph);
        this.speed = -6;
        const sawBody = this.sawBody = new p2.Body({
            mass: 1
        });
        sawBody.gravityScale = 0;
        sawBody.isFatal = true;
        const sawSprite = new PIXI.Sprite(textures.saw);
        this.addBody(sawBody, sawSprite, pixiGraph.sawContainer);
        const circleShape = new p2.Circle({ radius: 1 });
        circleShape.material = materials_1.default.saw;
        this.addShape(sawBody, circleShape);
        const anchorBody = this.anchorBody = terrainObjectKit_1.default.getAnchor(sawBody);
        this.addBodyHidden(anchorBody);
        const anchorConstraint = terrainObjectKit_1.default.getAnchorConstraint(sawBody, anchorBody, null, true);
        anchorConstraint.setMotorSpeed(this.speed);
        this.addConstraint(anchorConstraint);
    }
    activate(position) {
        super.activate();
        p2Util_1.default.updateBodyPosition(this.sawBody, position);
        p2Util_1.default.updateBodyPosition(this.anchorBody, position);
    }
}
exports.default = Saw;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Snake_1 = __webpack_require__(12);
const TerrainObjectType_1 = __webpack_require__(2);
const randomUtil_1 = __webpack_require__(6);
const materials_1 = __webpack_require__(0);
const p2Util_1 = __webpack_require__(1);
class SawSnake extends Snake_1.default {
    constructor(world, pixiGraph, textures, speed, agitateTime) {
        super(world, pixiGraph, textures, speed, agitateTime);
        this.sawSpeed = -6;
        this.sawBodies = [];
        this.type = TerrainObjectType_1.default.SawSnake;
        const segments = this.segments;
        for (let i = 0; i < segments.length; i++) {
            const body = segments[i];
            this.addSaw(body, textures);
        }
    }
    addSaw(body, textures) {
        const sawBody = new p2.Body({
            mass: 1,
            position: [body.position[0], body.position[1]],
            angle: randomUtil_1.default.random0To1() * (2 * Math.PI)
        });
        sawBody.gravityScale = 0;
        sawBody.isFatal = true;
        const sawSprite = new PIXI.Sprite(textures.saw);
        this.addBody(sawBody, sawSprite, this.pixiGraph.sawContainer);
        this.sawBodies.push(sawBody);
        const circleShape = new p2.Circle({ radius: 1 });
        circleShape.material = materials_1.default.wood;
        this.addShape(sawBody, circleShape);
        const revoluteConstraint = new p2.RevoluteConstraint(sawBody, body, { localPivotA: [0, 0], localPivotB: [0, 0] });
        revoluteConstraint.enableMotor();
        revoluteConstraint.setMotorSpeed(this.sawSpeed);
        revoluteConstraint.collideConnected = false;
        this.addConstraint(revoluteConstraint);
    }
    activate(position, speed, agitateTime) {
        super.activate(position, speed, agitateTime);
        const segments = this.segments;
        const sawBodies = this.sawBodies;
        for (let i = 0; i < segments.length; i++) {
            const segmentPosition = segments[i].position;
            const sawBody = sawBodies[i];
            p2Util_1.default.updateBodyPosition(sawBody, [segmentPosition[0], segmentPosition[1]]);
        }
    }
}
exports.default = SawSnake;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Spinner_1 = __webpack_require__(13);
const TerrainObjectType_1 = __webpack_require__(2);
const materials_1 = __webpack_require__(0);
const p2Util_1 = __webpack_require__(1);
class SawSpinner extends Spinner_1.default {
    constructor(world, pixiGraph, textures) {
        super(world, pixiGraph, textures);
        this.sawSpeed = -6;
        this.sawOffsets = [[0, 2.5], [0, -2.5], [-2.5, 0], [2.5, 0]];
        this.sawBodies = [];
        this.type = TerrainObjectType_1.default.SawSpinner;
        const spinnerBody = this.spinnerBody;
        const sawOffsets = this.sawOffsets;
        for (let i = 0; i < sawOffsets.length; i++) {
            this.addSaw(spinnerBody, sawOffsets[i], textures);
        }
    }
    addSaw(spinner, offset, textures) {
        const spinnerBodyPosition = spinner.position;
        const sawBody = new p2.Body({
            mass: 1,
            position: [spinnerBodyPosition[0] + offset[0], spinnerBodyPosition[1] + offset[1]]
        });
        sawBody.gravityScale = 0;
        sawBody.isFatal = true;
        const sawSprite = new PIXI.Sprite(textures.saw);
        this.addBody(sawBody, sawSprite, this.pixiGraph.sawContainer);
        this.sawBodies.push(sawBody);
        const circleShape = new p2.Circle({ radius: 1 });
        circleShape.material = materials_1.default.wood;
        this.addShape(sawBody, circleShape);
        const revoluteConstraint = new p2.RevoluteConstraint(sawBody, spinner, { localPivotA: [0, 0], localPivotB: offset });
        revoluteConstraint.enableMotor();
        revoluteConstraint.setMotorSpeed(this.sawSpeed);
        revoluteConstraint.collideConnected = false;
        this.addConstraint(revoluteConstraint);
    }
    setSawPositions(spinnerPosition) {
        const sawBodies = this.sawBodies;
        const sawOffsets = this.sawOffsets;
        for (let i = 0; i < sawOffsets.length; i++) {
            const sawOffset = sawOffsets[i];
            p2Util_1.default.updateBodyPosition(sawBodies[i], [spinnerPosition[0] + sawOffset[0], spinnerPosition[1] + sawOffset[1]]);
        }
    }
    activate(position, speed) {
        super.activate(position, speed);
        this.setSawPositions(position);
    }
}
exports.default = SawSpinner;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TerrainObject_1 = __webpack_require__(3);
const TerrainObjectType_1 = __webpack_require__(2);
const materials_1 = __webpack_require__(0);
const terrainObjectKit_1 = __webpack_require__(5);
const p2Util_1 = __webpack_require__(1);
class Seesaw extends TerrainObject_1.default {
    constructor(world, pixiGraph, textures) {
        super(TerrainObjectType_1.default.Seesaw, world, pixiGraph);
        const seesawBody = new p2.Body({
            mass: 3
        });
        seesawBody.gravityScale = 0;
        const seesawSprite = new PIXI.Sprite(textures.seesaw);
        this.addBody(seesawBody, seesawSprite, pixiGraph.seesawContainer);
        const boxShape = new p2.Box({ width: 6, height: 1 });
        boxShape.material = materials_1.default.wood;
        this.addShape(seesawBody, boxShape);
        const anchorBody = terrainObjectKit_1.default.getAnchor(seesawBody);
        this.addBodyHidden(anchorBody);
        this.addConstraint(terrainObjectKit_1.default.getAnchorConstraint(seesawBody, anchorBody));
    }
    activate(position, upright = false) {
        super.activate();
        const bodies = this.bodies;
        for (let i = 0; i < bodies.length; i++) {
            const body = this.bodies[i];
            const angle = upright ? (-Math.PI / 2) : 0;
            p2Util_1.default.updateBodyPosition(body, position, angle);
        }
    }
}
exports.default = Seesaw;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const randomUtil_1 = __webpack_require__(6);
function getRandomPosition(world, aabb, width, height, buffer) {
    const maxAttempts = 10;
    let attempts = 0;
    const minX = aabb.lowerBound[0] + (width / 2);
    const maxX = aabb.upperBound[0] - (width / 2);
    const minY = aabb.lowerBound[1] + (height / 2);
    const maxY = aabb.upperBound[1] - (height / 2);
    while (attempts < maxAttempts) {
        attempts++;
        const x = randomUtil_1.default.randomInt(minX, maxX);
        const y = randomUtil_1.default.randomInt(minY, maxY);
        const position = [x, y];
        if (!isBlocked(world, position, width + buffer, height + buffer)) {
            return position;
        }
    }
    return null;
}
function getMidHeight(aabb) {
    return (aabb.lowerBound[1] + aabb.upperBound[1]) / 2;
}
function getCountMoreAsDescends(height, min, max, startingHeight) {
    if (height > startingHeight)
        return 0;
    const proportion = (startingHeight - height) / startingHeight;
    const count = Math.round(min + (proportion * (max - min)));
    return count;
}
function getCountLessAsDescends(height, min, max, startingHeight) {
    if (height > startingHeight)
        return 0;
    const proportion = (startingHeight - height) / startingHeight;
    const count = Math.round(min + ((1 - proportion) * (max - min)));
    return count;
}
function updateAABBs(world) {
    const bodies = world.bodies;
    for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        if (body.aabbNeedsUpdate) {
            body.updateAABB();
        }
    }
}
function isBlocked(world, position, width, height) {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const bodies = world.bodies;
    for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        const aabb = body.aabb;
        if (!(aabb.upperBound[0] < position[0] - halfWidth ||
            aabb.lowerBound[0] > position[0] + halfWidth ||
            aabb.upperBound[1] < position[1] - halfHeight ||
            aabb.lowerBound[1] > position[1] + halfHeight)) {
            return true;
        }
    }
    return false;
}
exports.default = { getRandomPosition, getMidHeight, getCountMoreAsDescends, getCountLessAsDescends, updateAABBs };


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function blendColors(color1, color2, ratio) {
    var hex = function (num) {
        const hexStr = num.toString(16);
        return (hexStr.length === 1) ? '0' + hexStr : hexStr;
    };
    const color1Hex = hex(color1);
    const color2Hex = hex(color2);
    const r = Math.ceil(parseInt(color1Hex.substring(0, 2), 16) * ratio + parseInt(color2Hex.substring(0, 2), 16) * (1 - ratio));
    const g = Math.ceil(parseInt(color1Hex.substring(2, 4), 16) * ratio + parseInt(color2Hex.substring(2, 4), 16) * (1 - ratio));
    const b = Math.ceil(parseInt(color1Hex.substring(4, 6), 16) * ratio + parseInt(color2Hex.substring(4, 6), 16) * (1 - ratio));
    const blended = hex(r) + hex(g) + hex(b);
    return parseInt(blended, 16);
}
exports.default = blendColors;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function tintTerrainObject(terrainObject, tint) {
    const bodies = terrainObject.bodies;
    for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        tintSprite(body.sprite, tint);
        tintSprite(body.spriteReflection, tint);
    }
}
function untintTerrainObject(terrainObject) {
    const bodies = terrainObject.bodies;
    for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        untintSprite(body.sprite);
        untintSprite(body.spriteReflection);
    }
}
function tintSprite(sprite, tint) {
    if (sprite) {
        sprite.tint = tint;
    }
}
function untintSprite(sprite) {
    if (sprite) {
        sprite.tint = sprite.originalTint || 0xffffff;
    }
}
exports.default = { tintTerrainObject, untintTerrainObject, tintSprite, untintSprite };


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const materials_1 = __webpack_require__(0);
let body;
function initialize(world, pixiGraph, textures) {
    body = new p2.Body();
    body.isGround = true;
    const groundShape = new p2.Box({ width: 32, height: 18 });
    groundShape.material = materials_1.default.wood;
    body.addShape(groundShape);
    const groundSprite = new PIXI.Sprite(textures.ground);
    groundSprite.scale.x = groundSprite.scale.y = 2;
    groundSprite.anchor = new PIXI.ObservablePoint(null, null, 0.5, 0.5);
    pixiGraph.terrainContainer.addChild(groundSprite);
    body.sprite = groundSprite;
    world.addBody(body);
    world.on('beginContact', beginContact, this);
    return body;
}
function beginContact(contactEvent) {
    const bodyA = contactEvent.bodyA;
    const bodyB = contactEvent.bodyB;
    if (!(bodyA === body || bodyB === body))
        return;
    const otherBody = (bodyA === body ? bodyB : bodyA);
    if (otherBody.terrainObject) {
        otherBody.terrainObject.deactivate();
    }
}
exports.default = { initialize };


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const deviceReady_1 = __webpack_require__(20);
const loadTextures_1 = __webpack_require__(16);
const loadSounds_1 = __webpack_require__(15);
const loadFonts_1 = __webpack_require__(14);
const createWorld_1 = __webpack_require__(21);
const buildPixiGraph_1 = __webpack_require__(18);
const terrainBuilder_1 = __webpack_require__(9);
const ball_1 = __webpack_require__(19);
const bar_1 = __webpack_require__(10);
const soundPlayer_1 = __webpack_require__(8);
const gameLoop_1 = __webpack_require__(17);
deviceReady_1.default
    .then(() => {
    let soundSupported = false;
    loadSounds_1.default.then((sounds) => {
        soundSupported = true;
        soundPlayer_1.default.initialize(sounds);
    }).catch((reason) => {
        // Proceed, sound will be disabled
    })
        .then(() => {
        Promise.all([loadTextures_1.default, loadFonts_1.default])
            .then((results) => {
            const textures = results[0];
            const world = createWorld_1.default();
            const pixiGraph = buildPixiGraph_1.default(textures, soundSupported);
            terrainBuilder_1.default.initialize(world, pixiGraph, textures);
            const ballBody = ball_1.default.initialize(world, pixiGraph, textures);
            bar_1.default.initialize(world, pixiGraph, textures);
            document.getElementById('loading').style.display = 'none';
            document.getElementById('viewport').style.display = 'block';
            gameLoop_1.default.initialize(world, pixiGraph, ballBody);
        });
    });
});


/***/ })
/******/ ]);