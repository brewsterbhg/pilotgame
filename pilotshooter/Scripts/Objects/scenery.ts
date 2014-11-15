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
            this.x = stage.canvas.width + this.width;
            this.y = Math.floor(Math.random() * stage.canvas.height);
        }

        isActive() {
            if (this.game.getNumChildren() == 0) {
                return true;
            }
            else {
                return false;
            }
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