module Objects {
    //Cathead class
    export class cathead extends Objects.gameobject {
        velocity: number;
        health: number = 10;
        hpBar: createjs.Text;
        constructor(game: createjs.Container) {
            super(game, "cat_1");
            this.game.addChild(this);
            this.reset();
        }

        reset() {
            this.health = 10;
            this.x = stage.canvas.width + this.width;
            this.y = Math.floor(Math.random() * stage.canvas.height);
            this.velocity = Math.floor(Math.random() * 5 + 5);
        }

        hit() {
            this.health--;
            if (this.game.getChildByName("hpBar") != null) {
                this.game.removeChild(this.hpBar);
            }
            this.hpBar = new createjs.Text(this.health + "/10", "bold 18px Monotype Corsiva", "#FFFFFF");
            this.game.addChild(this.hpBar);
            this.hpBar.name = "hpBar";
            if (this.health == 0) {
                this.destroy();
            }
        }

        destroy() {
            this.update();
        }

        update() {
            this.x -= this.velocity;
            if (this.x + this.width <= 0) {
                this.reset();
            }
            if (this.game.getChildByName("hpBar") != null) {
                this.hpBar.x = this.x;
                this.hpBar.y = this.y + this.height;
            }
        }
    }
}