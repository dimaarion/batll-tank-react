import TitleHangar from "./TitleHangar";
import CloseBtn from "./CloseBtn";
import MusicIcon from "./MusicIcon";
import SoundIcon from "./SoundIcon";
import SettingsBtn from "./SettingsBtn";
import RestartBtn from "./RestartBtn";
import LevelBtn from "./LevelBtn";
import {useDispatch} from "react-redux";
import {decrement} from "../redux/features/Pause";
import HangarBtn from "./HangarBtn";


export default function Pause() {
    const dispatch = useDispatch();
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
                       <input className={"tank-music-input absolute top-0 bottom-0 margin-auto range pointer"} type={"range"} />
                   </div>

                </div>
                <div className={"tank-sound-icon"}>
                    <SoundIcon/>
                    <div>
                        <input className={"tank-music-input absolute top-0 bottom-0 margin-auto range pointer"} type={"range"} />
                    </div>
                </div>
                <div onClick={()=>dispatch(decrement())} className={"pointer"} id={"tank-pause-close"}>
                    <CloseBtn/>
                </div>
                <div className={"absolute left-50 b-130 pointer"}>
                    <SettingsBtn />
                </div>
                <div className={"w-210 absolute b-130 h-50px right-0 left-0 margin-auto"} >
                    <div className={"absolute left-0 margin-auto w-50px pointer tank-btn"}>
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
