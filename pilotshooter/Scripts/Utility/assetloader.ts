module Utility {
    export class assetloader {
        //Class level variables
        static loader;
        static spriteSheet;

        static ssData = {
            "images": ["Assets/Images/gunshooting.png"],
            "frames": [

                [42, 37, 27, 20],
                [79, 31, 35, 24],
                [79, 2, 42, 27],
                [42, 2, 35, 33],
                [2, 2, 38, 38]
            ],
            "animations": {

                "gunshoot": [0,1,2,3,4]
            },
        }
        
        //The manifest of assets
        static manifest = [{ id: "background", src: "Assets/Images/bg.png" },
            { id: "cat_1", src: "Assets/Images/cat_head_1.png" },
            { id: "cat_2", src: "Assets/Images/cat_head_2.png" },
            { id: "nebula_1", src: "Assets/Images/nebula_1.png" },
            { id: "trex", src: "Assets/Images/trex.png" },
            { id: "planet_1", src: "Assets/Images/planet_1.png" },
            { id: "planet_2", src: "Assets/Images/planet_2.png" },
            { id: "gameOver", src: "Assets/Images/game_over.png" }];

        //On init
        static init() {
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(this.manifest);

            this.spriteSheet = new createjs.SpriteSheet(this.ssData);
        }
    }
} 