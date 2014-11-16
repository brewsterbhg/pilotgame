﻿/*********************************
Author: Keith Brewster
File: trex.ts
Last Updated: 11/15/2014
Description: This typscript file holds all
the functions for the players avatar
*********************************/
module Objects {
    //Trex class
    export class trex extends Objects.gameobject {
        constructor(game: createjs.Container) {
            super(game, "trex");
            this.game.addChild(this);
            this.reset();
        }

        reset() {
            this.x = this.image.width * 0.5;
            this.y = stage.canvas.height * 0.5;
        }

    }
}  