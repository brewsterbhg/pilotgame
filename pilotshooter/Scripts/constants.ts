﻿/*********************************
Author: Keith Brewster
File: constants.ts
Last Updated: 11/15/2014
Description: This typscript file holds all
of the games constants
*********************************/
module constants {
    //State constants
    export var MENU_STATE: number = 0;
    export var PLAY_STATE: number = 1;
    export var END_STATE: number = 2;
    export var INSTRUCTION_STATE: number = 3;
    export var MOVE_UP: number = 38;
    export var MOVE_DOWN: number = 40;
    export var MOVE_LEFT: number = 37;
    export var MOVE_RIGHT: number = 39;
    export var FIRE: number = 32;
    export var RESTART: number = 82;
    export var PLAYER_LIVES: number = 3;
    export var GAME_FONT: string = "bold 18px Verdana"
    export var GAME_COLOUR: string = "#FFFFFF";
    export var EXPLOSION_TIMER: number = 50;
}  