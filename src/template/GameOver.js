import {decrement} from "../redux/features/Pause";
import CloseBtn from "./CloseBtn";
import RestartBtn from "./RestartBtn";
import HangarBtn from "./HangarBtn";
import LevelBtn from "./LevelBtn";
import {useDispatch, useSelector} from "react-redux";
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

        return <>
            <div className="flex relative z-30 justify-center ">
                <div className="w-[339px] lg:w-[608px] relative mt-12">
                    <div className="">
                        <TitleHangar title={selectGameOver.value.title}/>
                    </div>
                    <div style={{backgroundSize:"cover"}}
                        className="mt-6 bg-no-repeat pause-box-bg">
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
                                           className="flex position-center-bg w-[25px] h-[25px]  self-center bg-no-repeat Hull_01"/>
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
                                        className="flex position-center-bg w-[25px] h-[25px]  self-center bg-no-repeat Hull_01"/>
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
                                <div>Уничтожь всю технику противника</div>
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



}