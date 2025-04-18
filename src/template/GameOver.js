import MusicIcon from "./MusicIcon";
import SoundIcon from "./SoundIcon";
import {decrement} from "../redux/features/Pause";
import CloseBtn from "./CloseBtn";
import SettingsBtn from "./SettingsBtn";
import RestartBtn from "./RestartBtn";
import HangarBtn from "./HangarBtn";
import LevelBtn from "./LevelBtn";
import {useDispatch, useSelector} from "react-redux";
import PlayBtn from "./PlayBtn";
import HpStarIcon from "./HpStarIcon";
import Ok from "./Ok";
import None from "./None";
import {gameOverClose} from "../redux/features/GameOver";
import {setMenu} from "../redux/features/SelectMenu";
import StarGameOver from "./StarGameOver";
import {setRestart} from "../redux/features/Restart";

export default function GameOver() {
    const selectGameOver = useSelector((state) => state.gameOver)
    const selectStar = useSelector((state) => state.star)
    const dispatch = useDispatch();

    return <>
        <div id={"tank-pause"} className={"margin-auto bottom-0 left-0 right-0 "}>
            <div className={"title-bg"}>
                <div className={"absolute margin-auto top-0 right-0 left-0 bottom-0 title-text"}>{selectGameOver.value.title}</div>
            </div>
            <div className={"tank-pause-box-bg"}>
                <div className={"absolute right-0 margin-auto top-50 left-0 text-center w-200 h-50px"}>
                    <StarGameOver count={selectStar.value} size={100} />
                </div>
                <div  className={"tank-pause-star-box"}>
                    <div className={"absolute left-0 w-200 h-30"}>
                        <div className={"tank-coin-icon"}>
                            <HpStarIcon/>
                        </div>
                        <div id={"tank-coin-text"}>
                            <div id={"tank-coin-text-bg"}/>
                            <div id={"tank-coin-text-item"}>{selectGameOver.value.hp}</div>
                        </div>
                    </div>
                    <div  className={"absolute right-0 w-175 h-30"}>
                        <div className={"tank-coin-icon"}>
                            <div className={"tank-icon absolute w-25 h-25"}/>
                        </div>
                        <div id={"tank-coin-text"}>
                            <div id={"tank-coin-text-bg"}/>
                            <div id={"tank-coin-text-item"}>{selectGameOver.value.bot}</div>
                        </div>
                    </div>
                </div>
                <div style={{width: "508px"}} className={"absolute left-50 top-100"}>
                    <div className={"absolute left-0 w-25 h-25"}>
                        <div className={"absolute left-0 w-25 h-25"}>
                            <Ok/>
                        </div>
                        <div className={"absolute left-30 h-25 w-200"}>Уничтожь все танки противника</div>
                    </div>
                    <div className={"absolute left-0 top-30 w-25 h-25"}>
                        <div className={"absolute left-0 w-25 h-25"}>
                            <None/>
                        </div>
                        <div className={"absolute left-30 h-25 w-200"}>Уничтожь все танки противника</div>
                    </div>
                </div>
            </div>
            <div onClick={() => {
                dispatch(gameOverClose());
                dispatch(setMenu("К бою"));
            }} className={"pointer"} id={"tank-pause-close"}>
                <CloseBtn/>
            </div>
            <div onMouseDown={()=> {
                dispatch(setRestart(true))
            }} onMouseUp={()=> {
                dispatch(setRestart(false))
                dispatch(decrement())
                dispatch(gameOverClose());
            }} className={"absolute left-50 b-130 pointer"}>
                <RestartBtn/>
            </div>
            <div  className={"absolute b-130 h-50px right-0 left-0 margin-auto w-210"}>
                <div className={"absolute left-0 margin-auto w-50px pointer tank-btn"}>
                    <LevelBtn/>
                </div>
                <div className={"absolute right-0 margin-auto w-50px h-50px pointer tank-btn"}>
                    <HangarBtn/>
                </div>
            </div>

            <div className={"absolute b-130 r-70 margin-auto w-50px h-50px pointer"}>
                <PlayBtn/>
            </div>

        </div>
        <div className={"tank-pause-bg"}/>
    </>
}