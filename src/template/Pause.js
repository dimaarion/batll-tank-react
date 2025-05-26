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

        return <>
            <div className="flex-col relative z-30 justify-center">
                <div className="mt-12">
                    <TitleHangar title="Пауза" />
                </div>
                <div className="relative  position-center-bg pause-box-bg ">
                   <div onClick={()=>dispatch(decrement())} className="absolute top-[-10px] right-[-10px]"> <CloseBtn/></div>
                    <div className="flex justify-center h-[80px] pt-5 mt-6">
                        <div className="self-center flex">
                            <MusicIcon/>
                        </div>
                        <div className="self-center flex ml-2 pointer w-[200px] lg:w-[470px]">
                            <input onChange={(e)=>dispatch(setMusic(e.target.value))} value={selectMusic.value} step={"any"} min={0} max={1}  className="range pointer" type={"range"} />
                        </div>
                    </div>
                    <div className="flex justify-center h-[80px] ">
                        <div className="self-center flex">
                            <SoundIcon/>
                        </div>
                        <div className="self-center flex ml-2 pointer w-[200px] lg:w-[470px]">
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


}
