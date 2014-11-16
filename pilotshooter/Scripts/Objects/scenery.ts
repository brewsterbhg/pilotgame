﻿/*********************************
Author: Keith Brewster
File: scenery.ts
Last Updated: 11/15/2014
Description: This typscript file holds all
of the functions for the background scenery
*********************************/
module Objects {
    //Scenery class
    export class scenery extends Objects.gameobject {
        sceneryType: string;
        constructor(game: createjs.Container, sceneryType: string) {
            super(game, sceneryType);
            this.sceneryType = sceneryType;
            this.game.addChild(this);
            this.name = this.sceneryType;
            this.reset();
        }

        reset() {
            this.x = stage.canvas.width + this.width * 0.5;
            this.y = Math.floor(Math.random() * stage.canvas.height);
        }

        update() {
            switch(this.sceneryType){
                case "nebula_1":
                    this.x -= 1;
                    break;
                case "planet_1":
                    this.x -= 0.4;
                    break;
                case "planet_2":
                    this.x -= 0.4;
                    break;
            }
            if (this.x + this.width <= 0) {
                this.game.removeChild(this);
            }
        }
    }
} 