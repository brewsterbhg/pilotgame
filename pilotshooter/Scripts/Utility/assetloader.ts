﻿module Utility {
    export class assetloader {
        //Class level variables
        static loader;
        
        //The manifest of assets
        static manifest = [{ id: "background", src: "Assets/Images/bg.png" },
            { id: "cat_1", src: "Assets/Images/cat_head_1.png" },
            { id: "cat_2", src: "Assets/Images/cat_head_2.png" }];

        //On init
        static init() {
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(this.manifest);
        }
    }
} 