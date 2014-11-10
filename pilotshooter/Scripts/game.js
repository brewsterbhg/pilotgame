/// <reference path="constants.ts" />
//Variables
var stage;
var gameState;

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

function changeState(state) {
    switch (state) {
        case constants.MENU_STATE:
            break;
        case constants.PLAY_STATE:
            break;
        case constants.END_STATE:
            break;
        case constants.INSTRUCTION_STATE:
            break;
    }
}

function startGame() {
}

function gameLoop() {
    stage.update();
}
//# sourceMappingURL=game.js.map
