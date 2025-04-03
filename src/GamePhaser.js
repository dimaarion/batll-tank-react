import Phaser from "phaser"
import {useEffect, useRef, useState} from "react";
import store from "./redux/store";
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import ScaleOuterPlugin from 'phaser3-rex-plugins/plugins/scaleouter-plugin.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";
import SliderPlugin from "phaser3-rex-plugins/plugins/slider-plugin";
import Preload from "./scene/Preload";
import StartScene from "./scene/StartScene";
import Scene_1 from "./scene/Scene_1";
import {useDispatch, useSelector} from "react-redux";



export default function GamePhaser() {
    const dispatch = useDispatch();
    const phaserRef = useRef(null);
    const battle = useSelector((state) => state.battle)


    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "#000",
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.NONE,
                width: 1920,    // Default game window width
                height: 900,
            },
            plugins: {
                global: [{
                    key: 'rexvirtualjoystickplugin',
                    plugin: VirtualJoystickPlugin,
                    start: true
                }, {
                    key: 'rexSlider',
                    plugin: SliderPlugin,
                    start: true
                }
                ],
                scene: [
                    {
                        key: 'rexUI',
                        plugin: UIPlugin,
                        mapping: 'rexUI'
                    }, {
                        key: 'rexBoard',
                        plugin: BoardPlugin,
                        mapping: 'rexBoard'
                    }, {
                        key: 'rexSlider',
                        plugin: SliderPlugin,
                        mapping: 'rexSlider',
                        start: true
                    }, {
                        key: 'rexvirtualjoystickplugin',
                        plugin: VirtualJoystickPlugin,
                        mapping: 'rexvirtualjoystickplugin',
                        start: true
                    },{
                        key: 'rexScaleOuter',
                        plugin: ScaleOuterPlugin,
                        mapping: 'rexScaleOuter'
                    }
                ]
            },
            physics: {
                default: 'matter',
                matter: {
                    enabled: true,
                    positionIterations: 6,
                    velocityIterations: 4,
                    constraintIterations: 2,
                    enableSleeping: false,
                    gravity: {
                        x: 0,
                        y: 0
                    },
                    setBounds: {
                        x: 0,
                        y: 0,
                        thickness: 64,
                        left: true,
                        right: true,
                        top: true,
                        bottom: true,
                    },
                    timing: {
                        timestamp: 0,
                        timeScale: 1,
                    },
                    correction: 1,
                    getDelta: (function () {
                        return 1000 / 60;
                    }),
                    autoUpdate: true,
                    debug: {
                        //  hullColor: '#ffffff'
                    }
                }
            },
            audio: {
                disableWebAudio: false
            },
            scene: [
                Preload,
                StartScene,
                Scene_1
            ],
        };

        const game = new Phaser.Game(config);
        game.registry.set('store', store);

        if (game.sound.context.state !== "closed") {
            game.sound.context.resume().catch(err => console.error(err));
        }


        return () => {
            game.destroy(true);
        };

    }, []);


    return <div ref={phaserRef}/>;

}