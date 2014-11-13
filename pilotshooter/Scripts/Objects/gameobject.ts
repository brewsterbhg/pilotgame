module Objects {
    export class gameobject extends createjs.Bitmap{
        width: number;
        height: number;
        game: createjs.Container;

        constructor(game: createjs.Container, objectName: string) {
            super(Utility.assetloader.loader.getResult(objectName));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
        }
    }
} 