﻿/*********************************
Author: Keith Brewster
File: scoreboard.ts
Last Updated: 11/15/2014
Description: This typscript file keeps
track and displays the users current lives
and score
*********************************/
module Objects {
    //Scoreboard Class
    export class scoreboard extends createjs.DisplayObject{
        //Variables
        label: createjs.Text;
        labelString: string = "";
        game: createjs.Container;
        lives: number = constants.PLAYER_LIVES;
        score: number = 0;
        width: number;
        height: number;
        constructor(game: createjs.Container) {
            super();
            //Write current score
            this.label = new createjs.Text(this.labelString, constants.GAME_FONT, constants.GAME_COLOUR);
            this.update();
            this.width = this.label.getBounds().width;
            this.height = this.label.getBounds().height;
            this.game = game;

            this.game.addChild(this.label);
        }

        //Update current information
        update() {
            this.labelString = "Lives: " + this.lives.toString() + " Score: " + this.score.toString();
            this.label.text = this.labelString;
        }
    }
}  