module Utility {
    export class assetloader {
        //Class level variables
        static loader;
        static gunSpriteSheet;
        static explosionSpriteSheet;

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

        static explosionData = {
            "images": ["Assets/Images/heartsplosion.png"],
            "frames": [

                [314, 94, 18, 18],
                [125, 99, 27, 25],
                [314, 57, 32, 35],
                [270, 72, 42, 42],
                [218, 72, 50, 46],
                [286, 2, 57, 53],
                [218, 2, 66, 68],
                [125, 2, 91, 95],
                [2, 2, 121, 124]
            ],
            "animations": {

                bang: [0,1,2,3,4,5,6,7,8, false]
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
            { id: "gameOver", src: "Assets/Images/game_over.png" },
            { id: "play", src: "Assets/Images/playButton.png" },
            { id: "instructions", src: "Assets/Images/instructionsButton.png" },
            { id: "instructMenu", src: "Assets/Images/instructions.png" }];

        //On init
        static init() {
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(this.manifest);

            this.gunSpriteSheet = new createjs.SpriteSheet(this.ssData);
            this.explosionSpriteSheet = new createjs.SpriteSheet(this.explosionData);
        }
    }
} 