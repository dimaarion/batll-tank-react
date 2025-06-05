import {useDispatch, useSelector} from "react-redux";
import PauseBtn from "./PauseBtn";
import CoinIcon from "./CoinIcon";
import {cameraDialog, cameraStop} from "../redux/features/MovementCamera";
import QuestView from "./QuestView";

export default function TopPanel() {
    const seconds = useSelector((state) => state.sec)
    const minutes = useSelector((state) => state.min)
    const countPlayer = useSelector((state) => state.countPlayer)
    const countBot = useSelector((state) => state.countBot)
    const liveBasePlayer = useSelector((state) => state.liveBasePlayer)
    const liveBaseBot = useSelector((state) => state.liveBaseBot)
    const selectMoney = useSelector((state) => state.money);
    const selectLevelCount = useSelector((state) => state.levelCount);
    const dispatch = useDispatch()

    return <>
        <div
            className="flex justify-between h-[70px] fixed z-30 bg-[#3C4546] w-full right-0 left-0 top-0 border-b-2 border-black">
            <div className="self-center lg:flex ml-4 absolute">
                <div>
                    {selectLevelCount.value.id} Уровень
                </div>
                <div className="lg:ml-4 flex">
                    <div><CoinIcon/></div>
                    <div className="ml-2"> {selectMoney.value} </div>
                </div>
            </div>

            <div className="absolute right-0 left-0 mx-auto w-[100px]">
                <div className="self-center flex">
                    <div className="flex">
                        <div className="w-[40px] h-[35px]  bg-black flex justify-end">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                 className="bi bi-clock  self-center flex" viewBox="0 0 16 16">
                                <path fill="#00CFC9"
                                      d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                <path fill="#00CFC9"
                                      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                            </svg>
                        </div>
                        <div className="w-[100px] h-[35px] flex bg-black justify-center">
                            <div
                                className="flex self-center">{minutes.value < 10 ? "0" + minutes.value : minutes.value} : {seconds.value < 10 ? "0" + seconds.value : seconds.value}</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between text-xl  text-center">
                    <div className="w-[50px] h-[35px] bg-black ">
                        <div>{countPlayer.value}</div>
                    </div>
                    <div className="w-[15px] h-[35px] bg-blue-800"/>
                    <div className="w-[15px] h-[35px] bg-danger-800"/>
                    <div className="w-[50px] h-[35px] bg-black">
                        <div>{countBot.value}</div>
                    </div>
                </div>
            </div>
            <div onPointerDown={() => dispatch(cameraDialog())} onPointerUp={() => dispatch(cameraStop())}
                 className="self-center absolute right-0 flex mr-4">
                <PauseBtn/>
            </div>
            <div className="flex w-full justify-between z-30 absolute h-[10px] bottom-0">
                <div className="w-1/2 flex">
                    <div style={{marginLeft: 100 - liveBasePlayer.value + "%", width: liveBasePlayer.value + "%"}}
                         className="mt-[10px] h-[10px]  bg-blue-700"/>
                </div>
                <div className="w-1/2 flex">
                    <div style={{width: liveBaseBot.value + "%"}} className="mt-[10px] h-[10px]  bg-danger-700"/>
                </div>
            </div>
            <QuestView/>
        </div>


    </>


}