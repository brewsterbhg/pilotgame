module Objects {
    //Cathead class
    export class cathead extends Objects.gameobject {
        //Variables
        velocity: number;
        health: number;
        hpBar: createjs.Text;
        constructor(game: createjs.Container) {
            super(game, "cat_1");
            this.game.addChild(this);
            this.reset();
        }

        //Reset to original
        reset() {
            if (this.game.getChildByName("hpBar") != null) {
                this.game.removeChild(this.hpBar);
            }
            this.health = 75;
            this.x = stage.canvas.width + this.width;
            this.y = Math.floor(Math.random() * stage.canvas.height);
            this.velocity = Math.floor(Math.random() * 5 + 5);
        }

        //Run when the cat is being shot
        hit() {
            this.health--;
            if (this.game.getChildByName("hpBar") != null) {
                this.game.removeChild(this.hpBar);
            }
            //Display cats hp
            this.hpBar = new createjs.Text(this.health + "/75", constants.GAME_FONT, constants.GAME_COLOUR);
            this.game.addChild(this.hpBar);
            this.hpBar.name = "hpBar";
            //On zero health, run destroy
            if (this.health == 0) {
                this.destroy();
            }
        }

        //Dispatch event to update user score
        destroy() {
            this.dispatchEvent('addScore');
            this.game.removeChild(this.hpBar);
            this.reset();
        }

        //Update the cat head position and hp
        update() {
            this.x -= this.velocity;
            if (this.x + this.width <= 0) {
                this.reset();
            }
            if (this.game.getChildByName("hpBar") != null) {
                this.hpBar.x = this.x;
                this.hpBar.y = this.y + this.height * 0.8;
            }
        }
    }
}