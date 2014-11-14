module Objects {
    //Nebula class
    export class nebula extends Objects.gameobject {
        constructor(game: createjs.Container) {
            super(game, "nebula");
            this.game.addChild(this);
            this.reset();
        }

        reset() {
            this.x = stage.canvas.width + this.width;
            this.y = Math.floor(Math.random() * stage.canvas.height);
        }

        update() {
            this.x -= 1;
            if (this.x + this.width <= 0) {
                this.game.removeChild(this);
            }
        }
    }
} 