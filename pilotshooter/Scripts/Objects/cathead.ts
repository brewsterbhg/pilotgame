﻿module Objects {
    //Cathead class
    export class cathead extends Objects.gameobject {
        velocity: number;
        constructor(game: createjs.Container) {
            super(game, "cat_1");
            this.game.addChild(this);
            this.reset();
        }

        reset() {
            this.x = stage.canvas.width + this.width;
            this.y = Math.floor(Math.random() * stage.canvas.height);
            this.velocity = Math.floor(Math.random() * 5 + 5);
        }

        update() {
            this.x -= this.velocity;
            if (this.x + this.width <= 0) {
                this.reset();
            }
        }
    }
}