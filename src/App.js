import GamePhaser from "./GamePhaser";
import TopPanel from "./template/TopPanel";
import Hangar from "./template/Hangar";
import Shop from "./template/Shop";
import {useDispatch, useSelector} from "react-redux";
import Battle from "./template/Battle";
import Pause from "./template/Pause";
import GameOver from "./template/GameOver";
import Levels from "./template/Levels";
import {useEffect, useState} from "react";
import defaultHangar from "./json/hangar.json"
import {selectHangar} from "./redux/features/Hangar";
import {setMoney} from "./redux/features/Money";
import {setMusic} from "./redux/features/Music";
import {setEffect} from "./redux/features/Effect";
import {getLevel} from "./redux/features/LevelCount";


function App() {

    const selectMenu = useSelector((state) => state.selectMenu)
    const selectPause = useSelector((state) => state.pause)
    const selectGameOver = useSelector((state) => state.gameOver)
    const selectRestart = useSelector((state) => state.restart)
    const getHangar = useSelector((state) => state.hangar)
    const selectMoney = useSelector((state) => state.money)
    const selectMusic = useSelector((state) => state.music)
    const selectEffect = useSelector((state) => state.effect)
    const selectLevelCount = useSelector((state) => state.levelCount);

    const dispatch = useDispatch();
    const [ysdk, setYsdk] = useState(null);


    function initPlayer() {
        return window.ysdk?.getPlayer().then(player => {
            return player;
        });
    }

    function create() {
        initPlayer().then((res) => {
            if (res.getMode() === 'lite') {
                //console.log("Игрок не авторизован.")
            } else {
                //console.log("Игрок авторизован.")
            }
            res.getData().then((d) => {
                if (!d) {
                    save()
                } else {
                    console.log(d)
                    dispatch(selectHangar(d.hangar));
                    dispatch(setMoney(d.money));
                    dispatch(setMusic(d.music));
                    dispatch(setEffect(d.effect));
                    dispatch(getLevel(d.level));
                }

            });
        })
    }

    function save() {
        initPlayer().then((result) => {
            let dataDefault = {money: 1000, hangar: defaultHangar.slice(0, 1), music: 0.5, effect: 0.5,level:{id:1,name:"map",tiles:"tiles"}}
            result.setData(dataDefault, true)
        })
    }

    useEffect(() => {
        // Проверка на наличие YaGames в глобальном объекте window
        if (window.YaGames) {
            window.YaGames.init().then((ysdkInstance) => {
                console.log('Yandex SDK initialized');
                setYsdk(ysdkInstance);
                window.ysdk = ysdkInstance;
                initPlayer()
                create()
            }).catch((error) => {
                console.error('Yandex SDK init error:', error);
            });
        }
    }, []);

    useEffect(() => {
        if (initPlayer()) {
            initPlayer().then((result) => {
                result.getData().then((d) => {
                    let data = {...d, hangar: getHangar.value}
                    result.setData(data, true)
                })
            })
        }

    }, [getHangar])

    useEffect(() => {
        if (initPlayer()) {
            initPlayer().then((result) => {
                result.getData().then((d) => {
                    let data = {...d, money: selectMoney.value}
                    result.setData(data, true)
                })
            })
        }

    }, [selectMoney])

    useEffect(() => {
        if (initPlayer()) {
            initPlayer().then((result) => {
                result.getData().then((d) => {
                    let data = {...d, music: selectMusic.value}
                    result.setData(data, true)
                })
            })
        }

    }, [selectMusic])

    useEffect(() => {
        if (initPlayer()) {
            initPlayer().then((result) => {
                result.getData().then((d) => {
                    let data = {...d, effect: selectEffect.value}
                    result.setData(data, true)
                })
            })
        }

    }, [selectEffect])

    useEffect(() => {
        if (initPlayer()) {
            initPlayer().then((result) => {
                result.getData().then((d) => {
                    let data = {...d, level: selectLevelCount.value}
                    result.setData(data, true)
                })
            })
        }

    }, [selectLevelCount])


    return (
        <div className="App">
            <header>
                <TopPanel/>
            </header>

            {selectGameOver.value.active ? <GameOver/> : ""}
            {selectPause.value ? <Pause/> : ""}
            {
                selectMenu.value === "Ангар" ?
                    <Hangar/> : selectMenu.value === "Магазин" ?
                    <Shop/> : selectMenu.value === "К бою" ?
                        <Battle/> : selectMenu.value === "Уровни" ?
                            <Levels/> : !selectRestart.value ? <GamePhaser/> : ""
            }

        </div>

    );
}

export default App;
