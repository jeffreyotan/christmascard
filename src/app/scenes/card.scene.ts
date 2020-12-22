import { GameObjects, Scene } from 'phaser';
import { IMG_BABYJESUS, IMG_BACKGROUND, IMG_JESUSFAMILY, IMG_THREEWISEMEN, IMG_SHEPHERDS, SCENE_CARD, IMG_ANGELGABRIEL, IMG_ANGELGABRIEL_BW, IMG_DONKEY, ANIMS_BONFIRE, IMG_BONFIRE, AUDIO_AWAY_IN_A_MANGER, Globals } from '../constants';
// import { GameService } from '../game.service';
import { ScreenMapper } from "./scene-mapper";

export class CardScene extends Scene {

    // private gameSvc: GameService;
    private gabrielBW: GameObjects.Image;

    constructor() {
        super(SCENE_CARD);

        // lookup GameService => commenting the injector portion out as it is causing a circular reference
        // this.gameSvc = Globals.injector.get(GameService);
    }

    preload() {
        // load background
        this.load.image(IMG_BACKGROUND, 'assets/nativity/background.png');
        this.load.image(IMG_BABYJESUS, 'assets/nativity/baby_jesus.png');
        this.load.image(IMG_JESUSFAMILY, 'assets/nativity/Mary-Joseph-and-Jesus---Nativity-Christmas-Story-French-Secondary.png');
        this.load.image(IMG_THREEWISEMEN, 'assets/nativity/Three-Wise-Men---Nativity-Christmas-Story-French-Secondary.png');
        this.load.image(IMG_SHEPHERDS, 'assets/nativity/Shepherds---Nativity-Christmas-Story-French-Secondary.png');
        this.load.image(IMG_DONKEY, 'assets/nativity/Donkey---Nativity-Christmas-Story-French-Secondary.png');
        this.load.image(IMG_ANGELGABRIEL, 'assets/nativity/Angel-Gabriel---Nativity-Christmas-Story-French-Secondary.png');
        this.load.image(IMG_ANGELGABRIEL_BW, 'assets/nativity/Angel-Gabriel---Nativity-Christmas-Story-French-Secondary-bw-RGB.png');
        this.load.spritesheet(IMG_BONFIRE, 'assets/bonfire.png', { frameWidth: 230, frameHeight: 312 });
        this.load.audio(AUDIO_AWAY_IN_A_MANGER, [
            'assets/audio/silent_night.mp3',
            'assets/audio/silent_night.ogg'
        ]);
    }

    create() {
        const mapper = new ScreenMapper({
            scene: this,
            columns: 11,
            rows:11
        });

        // const centerX = (this.game.config.width as number) / 2;
        // const centerY = (this.game.config.height as number) / 2;

        // const bkg = this.add.image(centerX, centerY, IMG_BACKGROUND);
        // bkg.scaleX = 1.3;
        // bkg.scaleY = 1.3;
        // bkg.rotation = Phaser.Math.DegToRad(45);
        // bkg.setOrigin(0, 0);

        // const baby = this.add.image(centerX, centerY, IMG_BABYJESUS);
        // baby.scaleX = 0.3;
        // baby.scaleY = 0.3;

        const bgImageScale = 1.3;
        const fgImageScale = 0.6;

        // let bkg = mapper.placeImageAt(5, 5, IMG_BACKGROUND, { scaleX: bgImageScale, scaleY: bgImageScale });
        let bkg = mapper.placeImageAt(5, 5, IMG_BACKGROUND, { scaleToWidth: bgImageScale });
        // mapper.drawGrids();

        this.anims.create({
            key: ANIMS_BONFIRE,
            frames: this.anims.generateFrameNumbers(IMG_BONFIRE, { start: 0 }),
            frameRate: 16,
            repeat: -1
        });
        let sprite = mapper.placeSpriteAt(9, 8, IMG_BONFIRE, { scaleToWidth: 0.2 });
        sprite.play(ANIMS_BONFIRE);

        let angel = mapper.placeImageAt(5, 6, IMG_ANGELGABRIEL, { scaleX: fgImageScale, scaleY: fgImageScale });
        this.gabrielBW = mapper.placeImageAt(5, 6, IMG_ANGELGABRIEL_BW, { scaleX: fgImageScale, scaleY: fgImageScale });
        let baby = mapper.placeImageAt(5, 7, IMG_JESUSFAMILY, { scaleX: fgImageScale, scaleY: fgImageScale });
        let wiseMen = mapper.placeImageAt(7, 7, IMG_THREEWISEMEN, { scaleX: fgImageScale, scaleY: fgImageScale });
        let shepherds = mapper.placeImageAt(3, 7, IMG_SHEPHERDS, { scaleX: fgImageScale, scaleY: fgImageScale });
        let donkey = mapper.placeImageAt(4, 8, IMG_DONKEY, { scaleX: fgImageScale/2, scaleY: fgImageScale/2 });

        this.gabrielBW.setInteractive();
        this.gabrielBW.on('pointerover', () => {
            this.add.tween({
                targets: this.gabrielBW,
                duration: 500,
                // attributes
                alpha: 0
            });
        });
        this.gabrielBW.on('pointerout', () => {
            this.add.tween({
                targets: this.gabrielBW,
                duration: 500,
                // attributes
                alpha: 1
            })
        });

        const music = this.sound.add(AUDIO_AWAY_IN_A_MANGER, { volume: 0.6, loop: true });
        music.play();

        let message = mapper.placeTextAt(0, 9, Globals.message);
    }

    update() {}

}