module Objects {
    //Cathead class
    export class cathead extends Objects.gameobject {
        constructor(game: createjs.Container) {
            super(game, "cat_1");
            this.game.addChild(this);
            this.reset();
        }

        reset() {
            
        }
    }
}