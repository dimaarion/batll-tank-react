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
import Settings from "./template/Settings";
import Loading from "./template/Loading";
import Dialog from "./template/Dialog";
import GuiCamera from "./template/GuiCamera";
import {updateLevels} from "./redux/features/Level";


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
    const load = useSelector((state) => state.load)
    const dispatch = useDispatch();
    let InitializeGameData = {
        money:selectMoney.value,
        music:selectMusic.value,
        effect:selectEffect.value,
        level:selectLevel.value,
        hangar:getHangar.value,
        levelCount:selectLevelCount.value
    }
    const [ysdk, setYsdk] = useState(null);
    const [data, setData] = useState(InitializeGameData);


    useEffect(() => {
console.log(InitializeGameData)

    }, []);



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
                   dispatch(updateLevels(d.level));
                   dispatch(getLevel(d.levelCount))

                }

            });
        })
    }

    function save() {
        initPlayer().then((result) => {
            result.setData(InitializeGameData, true)
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
                    result.setData({
                        money:selectMoney.value,
                        music:selectMusic.value,
                        effect:selectEffect.value,
                        level:selectLevel.value,
                        hangar:getHangar.value,
                        levelCount:selectLevelCount.value
                    }, true)
                })
            })
        }

    }, [selectMoney,selectMusic,selectEffect,selectLevel,getHangar,selectLevelCount])






   if(selectMenu.value === "Ангар"){
        return <>
            <Hangar/>
            <Dialog/>
        </>
    }else if(selectMenu.value === "Магазин"){
        return <>
            <Shop/>
            <Dialog/>
        </>
    }else if(selectMenu.value === "К бою"){
        return <>
            {selectSettingsOpen.value?<Settings/>:""}
            <Battle/>
            <Dialog/>
        </>
    }else if(selectMenu.value === "Уровни"){
        return <>
            <Levels/>
            <Dialog/>
        </>
    }else{
        return <>

            <TopPanel/>
            {load.value < 1?<Loading/>:""}
            {selectPause.value? <Pause/>:""}
            {selectGameOver.value.active?<GameOver/>:""}
            {selectSettingsOpen.value ?<Settings/>:""}
            {!selectRestart.value?<GamePhaser/>:""}
            <Dialog/>
            <GuiCamera/>
        </>
    }

}

export default App;
