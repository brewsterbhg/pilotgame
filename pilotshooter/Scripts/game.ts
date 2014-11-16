/// <reference path="Utility/assetloader.ts" />
/// <reference path="Objects/gameobject.ts" />
/// <reference path="Objects/scenery.ts" />
/// <reference path="constants.ts" />
/// <reference path="Objects/background.ts" />
/// <reference path="Objects/trex.ts" />
/// <reference path="Objects/scoreboard.ts" />
/// <reference path="Objects/cathead.ts" />

﻿/*********************************
Author: Keith Brewster
Project: Pilot Game
Last Updated: 11/15/2014
Description: This typescript file handles the 
main game loop for the pilot shooter
*********************************/

//Variables
var stage: createjs.Stage;
var bgContainer: createjs.Container;
var game: createjs.Container;
var playerLives: number;
var instructions;

//Objects
var background: Objects.background;
var background2: Objects.background;
var trex: Objects.trex;
var catHead: Objects.cathead;
var scoreBoard: Objects.scoreboard;
var sceneryObject: Objects.scenery;

//Game variables
var numGen: number;
var keysPressed = {};
var shooting: boolean;
var gunShots: createjs.Sprite;
var heartsplosion: createjs.Sprite;
var gameState;
var exploding = false;
var timer = 0;

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
    //Add event listeners for key presses
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', deleteKeys);
    createjs.Sound.play("bgMusic", "none", 0, 0, -1);

    //Set initial game state
    gameState = constants.MENU_STATE;
    changeState(gameState);
}

/**
* This function changes the current state of the game
*
**/
function changeState(state) {
    gameState = state;
    switch (state) {
        //Display game menu
        case constants.MENU_STATE:
            gameMenu();
            break;
        //Start game
        case constants.PLAY_STATE:
            startGame();
            break;
        //Game over screen
        case constants.END_STATE:
            gameOver();
            break;
        //Instructions menu
        case constants.INSTRUCTION_STATE:
            instructionMenu();
            break;
    }
}

/**
* This function handles the game menu state
*
**/
function gameMenu() {
    //Create background container
    bgContainer = new createjs.Container();
    //Add backgrounds
    background = new Objects.background(bgContainer);
    background2 = new Objects.background(bgContainer);
    background2.x = 0;
    bgContainer.addChild(background);
    bgContainer.addChild(background2);
    //Create play and instruction buttons
    var playButton = new createjs.Bitmap(Utility.assetloader.loader.getResult("play"));
    var instructionsButton = new createjs.Bitmap(Utility.assetloader.loader.getResult("instructions"));
    playButton.x = (stage.canvas.width - playButton.image.width) * 0.5;
    playButton.y = stage.canvas.height * 0.3;
    instructionsButton.x = (stage.canvas.width - instructionsButton.image.width) * 0.5;
    instructionsButton.y = playButton.y + playButton.image.height + stage.canvas.height * 0.1;
    bgContainer.addChild(playButton);
    bgContainer.addChild(instructionsButton);
    //Add play button event listeners
    playButton.addEventListener("click", function () {
        bgContainer.removeChild(playButton); bgContainer.removeChild
            (instructionsButton); changeState(constants.PLAY_STATE)
    });
    playButton.addEventListener("mouseover", mousePointer);
    playButton.addEventListener("mouseout", mouseDefault);
    //Add instruction button event listeners
    instructionsButton.addEventListener("click", function () {
        bgContainer.removeChild(playButton); bgContainer.removeChild
            (instructionsButton); changeState(constants.INSTRUCTION_STATE)
    });
    instructionsButton.addEventListener("mouseover", mousePointer);
    instructionsButton.addEventListener("mouseout", mouseDefault);
    stage.addChild(bgContainer);
}

/**
* This function handles the instruction menu
*
**/
function instructionMenu() {
    //Display instructions menu
    instructions = new createjs.Bitmap(Utility.assetloader.loader.getResult("instructMenu"));
    instructions.x = (stage.canvas.width - instructions.image.width) * 0.5;
    instructions.y = (stage.canvas.height - instructions.image.height) * 0.5;
    bgContainer.addChild(instructions);
}

/**
* This function begins the game play state
*
**/
function startGame() {
    //Set player lives
    playerLives = constants.PLAYER_LIVES;
    game = new createjs.Container();
    //Add player, enemies, and scoreboard
    trex = new Objects.trex(game);
    catHead = new Objects.cathead(game);
    catHead.addEventListener("addScore", addScore);
    scoreBoard = new Objects.scoreboard(game);
    game.addChild(scoreBoard);
    game.addChild(trex);
    game.addChild(catHead);
    stage.addChild(game);
}

/**
* This function takes two points, and calculates the distance
*
**/
function distance(point1: createjs.Point, point2: createjs.Point): number {
    //Get points
    var p1: createjs.Point;
    var p2: createjs.Point;
    var itemX: number;
    var itemY: number;
    var result: number;

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

    //Return the distance result
    result = Math.sqrt(itemX + itemY);
    return result;
}

/**
* This function determines if there's been a collision
*
**/
function collisionCheck() {
    //Create points
    var p1: createjs.Point = new createjs.Point();
    var p2: createjs.Point = new createjs.Point();
    p1.x = trex.x;
    p1.y = trex.y;
    p2.x = catHead.x;
    p2.y = catHead.y;

    if (distance(p1, p2) <= ((trex.width * 0.5) + (catHead.width * 0.5))) {
        //Lose a life
        createjs.Sound.play("player_death");
        playerLives--;
        scoreBoard.lives--;
        if (playerLives == 0) {
            //Call game over on zero lives
            changeState(constants.END_STATE);
        }
        //Remove cat head
        catHead.reset();
    }
}

/**
* This function runs while the user is pressing the fire button
*
**/
function checkShooting() {
    createjs.Sound.play("shot");
    //Check if gun is level with cat head
    if (gunShots.y >= (catHead.y - catHead.height * 0.5) && gunShots.y <= (catHead.y - catHead.height * 0.5) + catHead.height) {
        catHead.hit();
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
    }
    //Draw planet 1
    else if ((numGen >= 20 && numGen <= 39) && game.getChildByName("bgObj") == null) {
        sceneryObject = new Objects.scenery(game, "planet_1");
        sceneryObject.name = "bgObj";
    }
    //Draw planet 2
    else if ((numGen >= 40 && numGen <= 59) && game.getChildByName("bgObj") == null) {
        sceneryObject = new Objects.scenery(game, "planet_2");
        sceneryObject.name = "bgObj";
    }
    //Set index of scenery object to be above the backgrounds, below everything else
    game.setChildIndex(sceneryObject, 2);
}

/**
* This function reads what keys the user is currently pressing
*
**/
function keyDown(event) {
    //The distance to move the character
    var d = 10;
    keysPressed[event.keyCode] = true;
    //If in instruction menu, any button will leave state
    if (gameState == constants.INSTRUCTION_STATE) {
        bgContainer.removeChild(instructions);
        changeState(constants.MENU_STATE);
    }
    //If in play state
    if (gameState == constants.PLAY_STATE) {
        //User presses up
        if (constants.MOVE_UP in keysPressed) {
            trex.y -= d;
        }
        //User presses down
        if (constants.MOVE_DOWN in keysPressed) {
            trex.y += d;
        }
        //User presses left
        if (constants.MOVE_LEFT in keysPressed) {
            trex.x -= d;
        }
        //User presses right
        if (constants.MOVE_RIGHT in keysPressed) {
            trex.x += d;
        }
        //User pushes space bar
        if (constants.FIRE in keysPressed) {
            //Set shooting flag to true
            shooting = true;
            //Set gun animation
            if (game.getChildByName("shooting") == null) {
                gunShots = new createjs.Sprite(Utility.assetloader.gunSpriteSheet);
                gunShots.play();
                gunShots.x = trex.x + trex.width * 0.45;
                gunShots.y = trex.y + trex.height * 0.03;
                game.addChild(gunShots);
                gunShots.name = "shooting";
            }
            //If user moves while shooting, animation follows them
            else if (game.getChildByName("shooting") != null) {
                if (gunShots.y != trex.y + trex.height * 0.05 || gunShots.x != trex.x + trex.width * 0.45) {
                    gunShots.y = trex.y + trex.height * 0.03;
                    gunShots.x = trex.x + trex.width * 0.45;
                }
            }
        }
    }
    //If on game over screen, pushing r will call the menu state
    if (gameState == constants.END_STATE) {
        if (constants.RESTART in keysPressed) {
            stage.removeAllChildren();
            changeState(constants.MENU_STATE);
        }
    }

}

/**
* This function removes keys from the dictionary on key release
*
**/
function deleteKeys(event) {
    //If space bar is released, set flag to false and remove animation
    if (event.keyCode == constants.FIRE) {
        game.removeChild(gunShots);
        shooting = false;
    }
    delete keysPressed[event.keyCode];
}

/*
* This function updates the stage
*
*/
function gameLoop() {
    //Only run these updates in play state
    if (gameState == constants.PLAY_STATE) {
        //Check if theres a scenery object. If not, generate a random number
        if (game.getChildByName("bgObj") == null) {
            numGen = Math.floor(Math.random() * 100);
            randomSceneryUpdate();
        }
        //If there is a scenery object, update it
        if (game.getChildByName("bgObj") != null) {
            sceneryObject.update();
        }
        catHead.update();
        scoreBoard.update();
        collisionCheck();
    }
    //Background update can always run
    background.update();
    background2.update();
    //If shooting flag is true, check shooting
    if (shooting) {
        checkShooting();
    }
    //If exploding, remove after time
    if (exploding) {
        timer++;
        if (timer > constants.EXPLOSION_TIMER) {
            game.removeChild(heartsplosion);
            timer = 0;
            exploding = false;
        }
    }
    stage.update();
}

/**
* This function adds score to the users total on enemy kills
*
**/
function addScore() {
    //Enemy death animation
    heartsplosion = new createjs.Sprite(Utility.assetloader.explosionSpriteSheet, "bang");
    game.addChild(heartsplosion);
    heartsplosion.x = catHead.x;
    heartsplosion.y = catHead.y;
    heartsplosion.play();
    exploding = true;
    //Add score
    scoreBoard.score += 100;
}

/**
* This function handles the game over state
*
**/
function gameOver() {
    //Add game over screen items
    var finalScore = scoreBoard.score;
    stage.removeChild(game);
    var gameOver = new createjs.Bitmap(Utility.assetloader.loader.getResult("gameOver"));
    gameOver.x = 100;
    gameOver.y = 100;
    stage.addChild(gameOver);
    var displayScore = new createjs.Text("Final Score: " + finalScore, constants.GAME_FONT, constants.GAME_COLOUR);
    displayScore.x = gameOver.x;
    displayScore.y = gameOver.y + gameOver.image.height + 30;
    var replayText = new createjs.Text("Press 'r' to replay.", constants.GAME_FONT, constants.GAME_COLOUR);
    replayText.x = gameOver.x;
    replayText.y = displayScore.y + 40;
    stage.addChild(displayScore);
    stage.addChild(replayText);
}

/**
* Changing the cursor to pointer for hoverable objects 
*
**/
function mousePointer(e) {
    document.body.style.cursor = 'pointer';
}

/**
* Changing the cursor back to default on mouse out 
*
**/
function mouseDefault(e) {
    document.body.style.cursor = 'default';
}