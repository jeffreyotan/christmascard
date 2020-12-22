import { Injectable } from "@angular/core";

import { Game } from 'phaser';
import { CardScene } from "./scenes/card.scene";

@Injectable()
export class GameService {

    isCreated: boolean = false;
    game: Game;

    message: string = "";

    constructor() {}

    createGame(width = 800, height = 600) {
        if(this.isCreated) {
            return;
        }

        // create the game
        this.game = new Game({
            width, height,
            type: Phaser.AUTO, // type of canvas to use, AUTO allows Phaser to decide (whether WebGL or Canvas)
            parent: 'card', // need <div id='card'></div> so Phaser knows where to place the canvas
            scene: [ CardScene ]
        });
    }
}