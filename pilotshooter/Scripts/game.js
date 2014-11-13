/// <reference path="constants.ts" />
/// <reference path="objects/cathead.ts" />
//Variables
var stage;
var game;

var gameState;

var cathead;

//Preload
function preload() {
}

function init() {
    //Set up canvas and ticker
    stage = new createjs.Stage(document.getElementById("canvas"));
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

    cathead = new Objects.cathead();
    stage.addChild(cathead);
}

/*
* This function updates the stage
*
*/
function gameLoop() {
    stage.update();
}
//# sourceMappingURL=game.js.map
