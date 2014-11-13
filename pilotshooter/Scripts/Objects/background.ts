module Objects {
    export class background extends createjs.Bitmap {
        width: number;
        height: number;
        game: createjs.Container;

        constructor(game: createjs.Container) {
            super(Utility.assetloader.loader.getResult("background"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.game = game;
            this.game.addChild(this);
            this.reset();
        }

        reset() {
            this.x = -this.width + stage.canvas.width;
        }

        update() {
            this.x -= 5;
            if (this.x + this.width <= 0) {
                this.reset();
            }
        }
    }
} 