import {decrement} from "../redux/features/Pause";
import CloseBtn from "./CloseBtn";
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
import TitleHangar from "./TitleHangar";

export default function GameOver() {
    const selectGameOver = useSelector((state) => state.gameOver)
    const selectStar = useSelector((state) => state.star)
    const selectLevelCount = useSelector((state) => state.levelCount);
    const dispatch = useDispatch();


    let s = true

    if (s) {
        return <>
            <div className="flex relative z-30 justify-center ">
                <div className="w-[403px] lg:w-[608px] relative mt-12">
                    <div className="">
                        <TitleHangar title={selectGameOver.value.title}/>
                    </div>
                    <div style={{backgroundSize:"cover"}}
                        className="mt-6 bg-no-repeat w-[403px] h-[769px] lg:w-[608px]  lg:h-[320px] bg-[url(https://game.fk-i-s.ru/asset/img/gui/settings-box-mob.png)] lg:bg-[url(https://game.fk-i-s.ru/asset/img/gui/pause-box-bg.png)]">
                       <div className="hidden lg:!block">
                           <div className="flex  justify-between py-6 px-8">
                               <div className="flex mt-12">
                                   <div className="w-[30px] flex justify-center h-[30px] bg-black">
                                       <div className="flex self-center"><HpStarIcon/></div>
                                   </div>
                                   <div className="w-[130px] flex justify-start ml-2 h-[30px] bg-black">
                                       <div className="flex self-center px-2">{selectGameOver.value.hp}</div>
                                   </div>
                               </div>
                               <div className="flex mt-12">
                                   <StarGameOver count={selectStar.value} size={100}/>
                               </div>
                               <div className="flex mt-12">
                                   <div className="w-[30px] flex justify-center h-[30px] bg-black">
                                       <div
                                           className="flex position-center-bg w-[25px] h-[25px]  self-center bg-no-repeat bg-[url(https://game.fk-i-s.ru/asset/img/gui/list/Hull_01.png)]"/>
                                   </div>
                                   <div className="w-[130px] flex justify-start ml-2 h-[30px] bg-black">
                                       <div className="flex self-center px-2">{selectGameOver.value.bot}</div>
                                   </div>
                               </div>
                           </div>
                       </div>

                        <div className="lg:flex  lg:hidden lg:justify-between py-6 px-8">
                            <div className="flex ">
                                <div className="w-[30px] flex justify-center h-[30px] bg-black">
                                    <div className="flex self-center"><HpStarIcon/></div>
                                </div>
                                <div className="w-[130px] flex justify-start ml-2 h-[30px] bg-black">
                                    <div className="flex self-center px-2">{selectGameOver.value.hp}</div>
                                </div>
                            </div>
                            <div className="flex mt-2">
                                <div className="w-[30px] flex justify-center h-[30px] bg-black">
                                    <div
                                        className="flex position-center-bg w-[25px] h-[25px]  self-center bg-no-repeat bg-[url(https://game.fk-i-s.ru/asset/img/gui/list/Hull_01.png)]"/>
                                </div>
                                <div className="w-[130px] flex justify-start ml-2 h-[30px] bg-black">
                                    <div className="flex self-center px-2">{selectGameOver.value.bot}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex  lg:hidden justify-center  h-[100px]">
                            <StarGameOver count={selectStar.value} size={100}/>
                        </div>
                        <div className="px-10">
                            <div className="flex">
                                <div>{selectLevelCount.value.quest.tanks ? <Ok/> : <None/>}</div>
                                <div>Уничтожь все танки противника</div>
                            </div>
                            <div className="flex">
                                <div>{selectLevelCount.value.quest.base ? <Ok/> : <None/>}</div>
                                <div>Уничтожь базу противника</div>
                            </div>
                            <div className="flex">
                                <div>{selectLevelCount.value.quest.completed ? <Ok/> : <None/>}</div>
                                <div>{selectLevelCount.value.quest.content.text}</div>
                            </div>
                        </div>
                        <div className="px-10 mt-8 flex justify-between">
                            <div onMouseDown={() => {
                                dispatch(setRestart(true))
                            }} onMouseUp={() => {
                                dispatch(setRestart(false))
                                dispatch(decrement())
                                dispatch(gameOverClose());
                            }} className={"pointer"}>
                                <RestartBtn/>
                            </div>
                            <div className="">
                                <LevelBtn/>
                            </div>
                            <div className="">
                                <HangarBtn/>
                            </div>
                        </div>
                        <div onClick={() => {
                            dispatch(gameOverClose());
                            dispatch(setMenu("К бою"));
                        }} className={"pointer absolute top-[80px] right-[-10px]"} >
                            <CloseBtn/>
                        </div>
                    </div>

                </div>

            </div>

        </>
    } else {
        return <>
            <div id={"tank-pause"} className={"margin-auto bottom-0 left-0 right-0 "}>
                <div className={"title-bg"}>
                    <div
                        className={"absolute margin-auto top-0 right-0 left-0 bottom-0 title-text"}>{selectGameOver.value.title}</div>
                </div>
                <div className={"tank-pause-box-bg"}>
                    <div className={"absolute right-0 margin-auto top-50 left-0 text-center w-200 h-50px"}>
                        <StarGameOver count={selectStar.value} size={100}/>
                    </div>
                    <div className={"tank-pause-star-box"}>
                        <div className={"absolute left-0 w-200 h-30"}>
                            <div className={"tank-coin-icon"}>
                                <HpStarIcon/>
                            </div>
                            <div id={"tank-coin-text"}>
                                <div id={"tank-coin-text-bg"}/>
                                <div id={"tank-coin-text-item"}>{selectGameOver.value.hp}</div>
                            </div>
                        </div>
                        <div className={"absolute right-0 w-175 h-30"}>
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
                                {selectLevelCount.value.quest.tanks ? <Ok/> : <None/>}
                            </div>
                        </div>
                        <div className={"absolute left-0 top-30 w-25 h-25"}>
                            <div className={"absolute left-0 w-25 h-25"}>
                                {selectLevelCount.value.quest.base ? <Ok/> : <None/>}
                            </div>
                        </div>

                        <div className={"absolute left-0 top-60 w-25 h-25"}>
                            <div className={"absolute left-0 w-25 h-25"}>
                                {selectLevelCount.value.quest.completed ? <Ok/> : <None/>}
                            </div>

                        </div>
                        <div className={"absolute left-30 top-0 h-25 w-250"}>Уничтожь все танки противника</div>
                        <div className={"absolute left-30 top-30 h-25 w-250"}>Уничтожь базу противника</div>
                        <div
                            className={"absolute left-30 top-60 h-25 w-250"}>{selectLevelCount.value.quest.content.text}</div>
                    </div>
                </div>
                <div onClick={() => {
                    dispatch(gameOverClose());
                    dispatch(setMenu("К бою"));
                }} className={"pointer"} id={"tank-pause-close"}>
                    <CloseBtn/>
                </div>
                <div onMouseDown={() => {
                    dispatch(setRestart(true))
                }} onMouseUp={() => {
                    dispatch(setRestart(false))
                    dispatch(decrement())
                    dispatch(gameOverClose());
                }} className={"absolute left-50 b-130 pointer"}>
                    <RestartBtn/>
                </div>
                <div className={"absolute b-130 h-50px right-0 left-0 margin-auto w-210"}>
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


}