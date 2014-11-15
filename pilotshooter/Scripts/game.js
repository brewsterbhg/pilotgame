/// <reference path="Utility/assetloader.ts" />
/// <reference path="Objects/gameobject.ts" />
/// <reference path="objects/scenery.ts" />
/// <reference path="constants.ts" />
/// <reference path="Objects/background.ts" />
/// <reference path="Objects/trex.ts" />
/// <reference path="Objects/cathead.ts" />
//Variables
var stage;
var game;

//Objects
var background;
var background2;
var trex;
var catHead;

var sceneryObject;
var numGen;
var keysPressed = {};

var gameState;

//Preload
function preload() {
    Utility.assetloader.init();
    Utility.assetloader.loader.addEventListener("complete", initGame);
}

function initGame() {
    //Set up canvas and ticker
    stage = new createjs.Stage(document.getElementById("mainDisplay"));
    stage.enableMouseOver();
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    //Set initial game state
    gameState = constants.MENU_STATE;
    changeState(gameState);

    //Start the game
    startGame();
}

/**
* This function changes the current state of the game
*
**/
function changeState(state) {
    switch (state) {
        case constants.MENU_STATE:
            gameMenu();
            break;
        case constants.PLAY_STATE:
            startGame();
            break;
        case constants.END_STATE:
            gameOver();
            break;
        case constants.INSTRUCTION_STATE:
            break;
    }
}

/**
* This function handles the game menu state
*
**/
function gameMenu() {
    //Create main game container
    game = new createjs.Container();

    //Add backgrounds
    background = new Objects.background(game);
    background2 = new Objects.background(game);
    background2.x = 0;
    game.addChild(background);
    game.addChild(background2);
}

/**
* This function handles the instruction menu
*
**/
function instructionMenu() {
}

/**
* This function begins the game play state
*
**/
function startGame() {
    //Add player and enemies
    trex = new Objects.trex(game);
    window.addEventListener('keydown', moveTrex);
    window.addEventListener('keyup', deleteKeys);
    catHead = new Objects.cathead(game);
    game.addChild(trex);
    game.addChild(catHead);
    stage.addChild(game);
}

/**
* This function takes two points, and calculates the distance
*
**/
function distance(point1, point2) {
    var p1;
    var p2;
    var itemX;
    var itemY;
    var result;

    p1 = new createjs.Point();
    p2 = new createjs.Point();

    p1.x = point1.x;
    p1.y = point1.y;
    p2.x = point2.x;
    p2.y = point2.y;

    itemX = p2.x - p1.x;
    itemY = p2.y - p1.y;

    itemX = itemX * itemX;
    itemY = itemY * itemY;

    result = Math.sqrt(itemX + itemY);

    return result;
}

/**
* This function determines if there's been a collision
*
**/
function collisionCheck() {
    var p1 = new createjs.Point();
    var p2 = new createjs.Point();

    p1.x = trex.x;
    p1.y = trex.y;
    p2.x = catHead.x;
    p2.y = catHead.y;

    if (distance(p1, p2) <= ((trex.width * 0.5) + (catHead.width * 0.5))) {
        catHead.reset();
    }
}

/**
* This function takes a randomly generated number and creates a background
* scenery object if there isn't one currently on the screen
*
**/
function randomSceneryUpdate() {
    //Draw nebula 1
    if ((numGen >= 0 && numGen <= 19) && game.getChildByName("bgObj") == null) {
        sceneryObject = new Objects.scenery(game, "nebula_1");
        sceneryObject.name = "bgObj";
    } else if ((numGen >= 20 && numGen <= 39) && game.getChildByName("bgObj") == null) {
        sceneryObject = new Objects.scenery(game, "planet_1");
        sceneryObject.name = "bgObj";
    } else if ((numGen >= 40 && numGen <= 59) && game.getChildByName("bgObj") == null) {
        sceneryObject = new Objects.scenery(game, "planet_2");
        sceneryObject.name = "bgObj";
    }

    //Set index of scenery object to be above the backgrounds, below everything else
    game.setChildIndex(sceneryObject, 2);
}

function moveTrex(event) {
    var d = 10;
    keysPressed[event.keyCode] = true;
    if (38 in keysPressed) {
        trex.y -= d;
    }
    if (40 in keysPressed) {
        trex.y += d;
    }
    if (37 in keysPressed) {
        trex.x -= d;
    }
    if (39 in keysPressed) {
        trex.x += d;
    }
}

function deleteKeys(event) {
    delete keysPressed[event.keyCode];
}

/*
* This function updates the stage
*
*/
function gameLoop() {
    //Check if theres a scenery object. If not, generate a random number
    if (game.getChildByName("bgObj") == null) {
        console.log("hit");
        numGen = Math.floor(Math.random() * 100);
        randomSceneryUpdate();
    }

    //If there is a scenery object, update it
    if (game.getChildByName("bgObj") != null) {
        sceneryObject.update();
    }
    background.update();
    background2.update();
    catHead.update();
    collisionCheck();
    stage.update();
}

/**
* This function handles the game over state
*
**/
function gameOver() {
    game.removeChild(trex);
    game.removeChild(catHead);
    var gameOver = Utility.assetloader.loader.getResult("gameOver");
}
//# sourceMappingURL=game.js.map
