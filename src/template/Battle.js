import Menu from "./Menu";
import {useDispatch, useSelector} from "react-redux";
import {addBattle, removeBattle} from "../redux/features/Battle";
import RestartBtn from "./RestartBtn";
import {setMenu} from "../redux/features/SelectMenu";
import LevelBtn from "./LevelBtn";
import SettingsBtn from "./SettingsBtn";
import {increment} from "../redux/features/SettingsOpen";
import PlayBtn from "./PlayBtn";
import {useEffect} from "react";


export default function Battle() {
    const dispatch = useDispatch();
    const getHangar = useSelector((state) => state.hangar)
    const battle = useSelector((state) => state.battle)
    const sdk = useSelector((state) => state.ysdk.value)

    useEffect(()=>{
        if(sdk?.adv){

            sdk?.adv.showFullscreenAdv({
                callbacks: {
                    onClose: function(wasShown) {
                        // Действие после закрытия рекламы.
                    },
                    onError: function(error) {
                        // Действие в случае ошибки.
                    }
                }
            })

            if(sdk.features?.GameplayAPI){
                sdk.features.GameplayAPI.stop()
            }

        }




    },[sdk?.adv])

        return <>
            <div>
                <Menu/>
                <div className="flex justify-center">
                    <div
                        className="position-center-bg lg:mt-12 lg:w-[911px] w-full relative">
                        <div
                            className="lg:w-[911px] w-full h-[30px] position-center-bg bg-no-repeat top-mob-border"/>
                        <div className="lg:w-[911px] w-full h-[30px]"
                             style={{background: " linear-gradient(180deg, #1f2324 17.98%, #4b4d4a 100%)"}}/>

                        <div className="lg:flex ">
                            <div className="lg:w-[400px] flex justify-center lg:h-[490px] h-[280px] overflow-y-auto"
                                 style={{background: "rgb(43, 46, 47)"}}>
                                <div className="flex-col justify-center">
                                    {getHangar.value.map((el) => <div onClick={() => {
                                        if (battle.value.length <= 20 && !battle.value.some(tank => tank.id === el.id)) {
                                            dispatch(addBattle(el))
                                        }
                                    }} className="w-[260px] h-[240px] relative flex mt-5" key={el.id}>
                                        <div className="absolute">
                                            <div className="flex gap-3">
                                                <div>{el.title}</div>
                                            </div>
                                        </div>
                                        <div className="absolute left-[115px] top-[30px]">
                                            <div>{el.level} Ур.</div>
                                        </div>
                                        <div className="w-[105px] mt-5">
                                            {el.options.map((opt, i) => <div key={i + "options"} className="flex">
                                                <div
                                                    className="w-[30px] h-[30px] border-2 flex  justify-center border-[#808080]">
                                                    <div className="self-center"
                                                         dangerouslySetInnerHTML={{__html: opt.icon}}/>
                                                </div>
                                                <div
                                                    className="w-[73px] h-[30px] border-2 flex  justify-start border-[#808080]">
                                                    <div className="self-center ml-1">
                                                        {opt.num}
                                                    </div>
                                                </div>
                                            </div>)}
                                        </div>
                                        <div
                                            className={`${battle.value.some(tank => tank.id === el.id) ? "tank-hangar-list-item-active": "tank-hangar-list-item"} justify-center bg-no-repeat bg-cover w-[150px] h-[240px] flex`}>
                                            <div className={`w-[120px] h-[140px]  self-center position-center-bg ${el.name}`} />
                                        </div>
                                    </div>)}
                                </div>

                            </div>
                            <div className="lg:w-[512px] w-full">
                                <div className="flex mt-2 justify-end w-full">
                                    <div className="flex gap-2 ">
                                        <div>
                                            <PlayBtn step = {true} direction="left"/>
                                        </div>
                                        <div onClick={() => dispatch(increment())}>
                                            <SettingsBtn/>
                                        </div>
                                        <div>
                                            <LevelBtn/>
                                        </div>
                                        <div onClick={() => {
                                            dispatch(removeBattle())
                                        }}>
                                            <RestartBtn/>
                                        </div>
                                        <div>
                                            <PlayBtn step = {true} direction="right"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-[100px]">
                                    {
                                        battle.value.length > 0 ? <div
                                            className="w-[267px] h-[80px] border-2 border-[#71736F] bg-[#FFC107] hover:bg-[#21B1BB] flex justify-center rounded-[50px]">
                                            <div onClick={() => {
                                                dispatch(setMenu(""))
                                            }} className="self-center text-[#212529] text-4xl">В бой
                                            </div>
                                        </div> : <div onClick={()=>{
                                            console.log(sdk)
                                        }} className="h-[80px] text-2xl"> Выбери минимум один танк </div>
                                    }
                                </div>
                                <div className="lg:w-[508px] h-[155px] mt-[95px] flex justify-center overflow-x-auto"
                                     style={{background: "linear-gradient(270deg, #ffffff 0%, #3f4243 0%, #1f2324 17.74%, #1f2324 84.05%, #3f4243 100%)"}}>
                                    {battle.value.filter((el, i) => el).map((el, i) => <div key={i + "list"} className="w-[80px] ml-4 self-center h-[130px] tank-hangar-list-item">
                                        <div className={`w-[80px] h-[130px] bg-cover position-center-bg ${el.name}`}/>

                                    </div>)}
                                </div>

                            </div>
                        </div>
                          <div className="lg:w-[911px] w-full h-[30px]"
                             style={{background: " linear-gradient(180deg, #1f2324 17.98%, #4b4d4a 100%)"}} />
                        <div
                            className="lg:w-[911px] w-full h-[30px] position-center-bg bg-no-repeat bottom-mob-border"/>

                    </div>
                </div>

            </div>
        </>



}