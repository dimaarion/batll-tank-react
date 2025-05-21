import TitleHangar from "./TitleHangar";
import CloseBtn from "./CloseBtn";
import MusicIcon from "./MusicIcon";
import SoundIcon from "./SoundIcon";
import SettingsBtn from "./SettingsBtn";
import RestartBtn from "./RestartBtn";
import LevelBtn from "./LevelBtn";
import {useDispatch, useSelector} from "react-redux";
import {decrement} from "../redux/features/Pause";
import HangarBtn from "./HangarBtn";
import {setRestart} from "../redux/features/Restart";
import {gameOverClose} from "../redux/features/GameOver";
import {setMusic} from "../redux/features/Music";
import {setEffect} from "../redux/features/Effect";
import {increment} from "../redux/features/SettingsOpen";


export default function Pause() {
    const selectMusic = useSelector((state) => state.music)
    const selectEffect = useSelector((state) => state.effect)
    const dispatch = useDispatch();


    let s = true

    if (s){
        return <>
            <div className="flex-col relative z-30 justify-center">
                <div className="mt-12">
                    <TitleHangar title="Пауза" />
                </div>
                <div className="w-[402px] lg:w-[606px] relative  position-center-bg h-[769px] lg:h-[318px] bg-[url(https://game.fk-i-s.ru/asset/img/gui/settings-box-mob.png)] lg:bg-[url(https://game.fk-i-s.ru/asset/img/gui/pause-box-bg.png)]">
                   <div onClick={()=>dispatch(decrement())} className="absolute top-[-10px] right-[-10px]"> <CloseBtn/></div>
                    <div className="flex justify-center h-[80px] pt-5 mt-6">
                        <div className="self-center flex">
                            <MusicIcon/>
                        </div>
                        <div className="self-center flex ml-2 pointer">
                            <input onChange={(e)=>dispatch(setMusic(e.target.value))} value={selectMusic.value} step={"any"} min={0} max={1}  className="range pointer" type={"range"} />
                        </div>
                    </div>
                    <div className="flex justify-center h-[80px]">
                        <div className="self-center flex">
                            <SoundIcon/>
                        </div>
                        <div className="self-center flex ml-2 pointer">
                            <input onChange={(e)=>dispatch(setEffect(e.target.value))} value={selectEffect.value} step={"any"} min={0} max={1}  className="range pointer" type={"range"} />
                        </div>
                    </div>
                    <div className="flex justify-between px-10 mt-8">
                        <div onClick={()=> {
                            dispatch(increment())
                        }}>
                            <SettingsBtn />
                        </div>
                        <div>
                            <div onMouseDown={()=> {
                                dispatch(setRestart(true))
                            }} onMouseUp={()=> {
                                dispatch(setRestart(false))
                                dispatch(decrement())
                                dispatch(gameOverClose());
                            }} className="">
                                <RestartBtn />
                            </div>
                        </div>
                        <div>
                            <HangarBtn />
                        </div>
                        <div>
                            <LevelBtn />
                        </div>
                    </div>
                </div>
            </div>

        </>
    }else {
        return <>

            <div id={"tank-pause"} className={"margin-auto bottom-0 left-0 right-0 "}>
                <div className={"title-bg"}>
                    <div className={"absolute margin-auto top-0 right-0 left-0 bottom-0 title-text"}>Пауза</div>
                </div>
                <div className={"tank-pause-box-bg"}>

                </div>
                <div className={"tank-music-icon"}>
                    <div className={"absolute top-0 bottom-0 margin-auto"}>
                        <MusicIcon/>
                    </div>
                    <div>

                        <input onChange={(e)=>dispatch(setMusic(e.target.value))} value={selectMusic.value} step={"any"} min={0} max={1}  className={"tank-music-input absolute top-0 bottom-0 margin-auto range pointer"} type={"range"} />
                    </div>

                </div>
                <div className={"tank-sound-icon"}>
                    <SoundIcon/>
                    <div>

                        <input onChange={(e)=>dispatch(setEffect(e.target.value))} value={selectEffect.value} step={"any"} min={0} max={1} className={"tank-music-input absolute top-0 bottom-0 margin-auto range pointer"} type={"range"} />
                    </div>
                </div>
                <div onClick={()=>dispatch(decrement())} className={"pointer"} id={"tank-pause-close"}>
                    <CloseBtn/>
                </div>
                <div onClick={()=>dispatch(increment())} className={"absolute left-50 b-130 pointer"}>
                    <SettingsBtn />
                </div>
                <div className={"w-210 absolute b-130 h-50px right-0 left-0 margin-auto"} >
                    <div onMouseDown={()=> {
                        dispatch(setRestart(true))
                    }} onMouseUp={()=> {
                        dispatch(setRestart(false))
                        dispatch(decrement())
                        dispatch(gameOverClose());
                    }} className={"absolute left-0 margin-auto w-50px pointer tank-btn"}>
                        <RestartBtn />
                    </div>
                    <div className={"absolute right-0 margin-auto w-50px h-50px pointer tank-btn"}>
                        <HangarBtn />
                    </div>
                </div>

                <div className={"absolute b-130 r-70 margin-auto w-50px h-50px pointer"}>
                    <LevelBtn />
                </div>

            </div>
            <div className={"tank-pause-bg"} />

        </>
    }




}
