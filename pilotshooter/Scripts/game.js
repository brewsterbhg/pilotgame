/// <reference path="Utility/assetloader.ts" />
/// <reference path="Objects/gameobject.ts" />
/// <reference path="constants.ts" />
/// <reference path="Objects/background.ts" />
/// <reference path="Objects/nebula.ts" />
/// <reference path="Objects/trex.ts" />
/// <reference path="Objects/cathead.ts" />
//Variables
var stage;
var game;

//Objects
var background;
var background2;
var trex;
var nebula;
var catHead;

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

    //changeState(gameState);
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
            break;
        case constants.PLAY_STATE:
            startGame();
            break;
        case constants.END_STATE:
            break;
        case constants.INSTRUCTION_STATE:
            break;
    }
}

/*
* This function begins the game
*
*/
function startGame() {
    game = new createjs.Container();

    background = new Objects.background(game);
    background2 = new Objects.background(game);
    background2.x = 0;
    game.addChild(background);
    game.addChild(background2);
    trex = new Objects.trex(game);
    catHead = new Objects.cathead(game);
    nebula = new Objects.nebula(game);
    game.addChild(trex);
    game.addChild(catHead);
    game.addChild(nebula);
    stage.addChild(game);
}

/*
* This function updates the stage
*
*/
function gameLoop() {
    background.update();
    background2.update();
    catHead.update();
    nebula.update();
    stage.update();
}
//# sourceMappingURL=game.js.map
