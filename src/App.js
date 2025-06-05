import React, {useEffect, Suspense} from "react";
import {useDispatch, useSelector} from "react-redux";
import Shop from "./template/Shop";
import Pause from "./template/Pause";
import GameOver from "./template/GameOver";
import Levels from "./template/Levels";
import Hangar from "./template/Hangar";
import {selectHangar} from "./redux/features/Hangar";
import {setMoney} from "./redux/features/Money";
import {setMusic} from "./redux/features/Music";
import {setEffect} from "./redux/features/Effect";
import {getLevel} from "./redux/features/LevelCount";
import {updateLevels} from "./redux/features/Level";
import {getSdk} from "./redux/features/Ysdk";
import InitializeGameData from "./json/InitializeGameData.json"
import {setZoom} from "./redux/features/Zoom";
import levels from "./json/level.json"
const Battle = React.lazy(() => import("./template/Battle"));
const GamePhaser = React.lazy(() => import("./GamePhaser"));
const Settings = React.lazy(() => import("./template/Settings"));
const TopPanel = React.lazy(() => import("./template/TopPanel"));
const GuiCamera = React.lazy(() => import("./template/GuiCamera"));
const Dialog = React.lazy(() => import("./template/Dialog"));
const Loading = React.lazy(() => import("./template/Loading"));

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
    const selectSettingsOpen = useSelector((state) => state.settingsOpen);
    const selectLevel = useSelector((state) => state.level);
    const selectZoom = useSelector((state) => state.zoom);
    const load = useSelector((state) => state.load)


    const dispatch = useDispatch();
    InitializeGameData.level = levels
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });





    function initPlayer() {
        return window.ysdk?.getPlayer().then(player => {
            return player;
        });
    }





    useEffect(() => {
        // Проверка на наличие YaGames в глобальном объекте window
        if (window.YaGames) {
            window.YaGames.init().then((ysdkInstance) => {
                console.log('Yandex SDK initialized');
                window.ysdk = ysdkInstance;
                dispatch(getSdk(ysdkInstance))
                initPlayer().then((res) => {
                    if (res.getMode() === 'lite') {
                        //console.log("Игрок не авторизован.")
                    } else {
                        //console.log("Игрок авторизован.")
                    }
                    res.getData().then((d) => {

                        if (!d.levelCount.id) {
                            initPlayer().then((result) => {
                                result.setData(InitializeGameData, true)
                            })
                        } else {
                            dispatch(selectHangar(d.hangar));
                            dispatch(setMoney(d.money));
                            dispatch(setMusic(d.music));
                            dispatch(setEffect(d.effect));
                            dispatch(updateLevels(d.level));
                            dispatch(getLevel(d.levelCount));
                            dispatch(setZoom(d.zoom))

                        }

                    });
                })

            }).catch((error) => {
                console.error('Yandex SDK init error:', error);
            });
        }
    }, [dispatch]);

    useEffect(() => {
        if (initPlayer()) {
            initPlayer().then((result) => {
                result.getData().then((d) => {
                    result.setData({
                        money: selectMoney.value,
                        music: selectMusic.value,
                        effect: selectEffect.value,
                        level: selectLevel.value,
                        hangar: getHangar.value,
                        levelCount: selectLevelCount.value,
                        zoom:selectZoom.value
                    }, true)
                })
            })
        }

    }, [selectMoney, selectMusic, selectEffect, selectLevel, getHangar, selectLevelCount,selectZoom])




    if (selectMenu.value === "Ангар") {
        return <Suspense>
            <Hangar/>
            <Dialog/>
        </Suspense>
    } else if (selectMenu.value === "Магазин") {
        return <Suspense>
            <Shop/>
            <Dialog/>
        </Suspense>
    } else if (selectMenu.value === "К бою") {
        return <Suspense>
            {selectSettingsOpen.value ? <Settings/> : ""}
            <Battle/>
            <Dialog/>

        </Suspense>
    } else if (selectMenu.value === "Уровни") {
        return <Suspense>
            <Levels/>
            <Dialog/>
        </Suspense>
    } else {
        return <Suspense>

            <TopPanel/>
            {load.value < 1 ? <Loading/> : ""}
            {selectPause.value ? <Pause/> : ""}
            {selectGameOver.value.active ? <GameOver/> : ""}
            {selectSettingsOpen.value ? <Settings/> : ""}
            {!selectRestart.value ? <div>
                <GamePhaser/>
                {load.value === 1 ? <GuiCamera/> : ""}
            </div> : ""}
            <Dialog/>
        </Suspense>
    }

}

export default App;
