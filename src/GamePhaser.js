import Phaser from "phaser"
import {useEffect, useRef, useState} from "react";
import store from "./redux/store";
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";
import SliderPlugin from "phaser3-rex-plugins/plugins/slider-plugin";
import Preload from "./scene/Preload";
import StartScene from "./scene/StartScene";
import Scene_1 from "./scene/Scene_1";
import {useDispatch, useSelector} from "react-redux";
import {seconds} from "./redux/features/Sec";
import {minute} from "./redux/features/Minutes";
import {count} from "./redux/features/CountPlayer";
import {countBot} from "./redux/features/CounterBot";
import {live} from "./redux/features/LibeBasePlayer";
import {liveBot} from "./redux/features/LiveBaseBot";
import {setHp} from "./redux/features/Hangar";


export default function GamePhaser() {
    const dispatch = useDispatch();
    const phaserRef = useRef(null);
    const [countPlayer, setCountPlayer] = useState(0);
    const [countB, setCountB] = useState(0);
    const [liveBasePlayer, setLiveBasePlayer] = useState(100);
    const [liveBaseBot, setLiveBaseBot] = useState(100);
    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(0);
    const [pause, setPause] = useState(false);
    const battle = useSelector((state) => state.battle)
    const selectPause = useSelector((state) => state.pause)
    const [hps, setHps] = useState({hp:100,id:0})

    const props = {
        setSec: setSec,
        setMin: setMin,
        setCountPlayer:setCountPlayer,
        setCountBot:setCountB,
        setLiveBasePlayer:setLiveBasePlayer,
        setLiveBaseBot:setLiveBaseBot,
        battle:battle,
        setHp:setHps,

    }
  //  window.tankBattle = []

    useEffect(() => {
        console.log(hps)
    }, [hps])



    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "#000",
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
                new Scene_1(props)
            ],
        };

        const game = new Phaser.Game(config);
        game.registry.set('store', store);
        window.addEventListener('resize', event => {
            game.scale.resize(window.innerWidth, window.innerHeight);
        }, false);
        if (game.sound.context.state !== "closed") {
            game.sound.context.resume().catch(err => console.error(err));
        }


        return () => {
            game.destroy(true);
        };

    }, []);


    return <div ref={phaserRef}/>;

}