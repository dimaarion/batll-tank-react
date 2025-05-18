import StarGameOver from "./StarGameOver";
import LevelCount from "./LevelCount";
import {useDispatch, useSelector} from "react-redux";
import {setMenu} from "../redux/features/SelectMenu";
import {getLevel} from "../redux/features/LevelCount";
import Menu from "./Menu";
import TitleHangar from "./TitleHangar";
import PlayBtn from "./PlayBtn";

export default function Levels() {
    const dispatch = useDispatch();
    const selectLevel = useSelector((state) => state.level);


    let s = true

    if (s) {
        return <>
            <Menu/>
            <div>
                <div className="mt-6">
                    <TitleHangar/>
                </div>
                <div className="flex justify-center mt-6" onClick={()=>{
                    dispatch(setMenu("К бою"))
                }}>
                    <PlayBtn direction = "right"/>
                </div>
                <div>
                    <div className="mt-6 flex justify-center">
                        <div className="lg:w-[911px] w-full ">
                            <div
                                className="lg:w-[911px] w-full h-[30px] position-center-bg bg-no-repeat bg-[url(https://game.fk-i-s.ru/asset/img/gui/top-mob-border.png)]"/>
                            <div className="lg:w-[911px] w-full h-[30px]"
                                 style={{background: " linear-gradient(180deg, #1f2324 17.98%, #4b4d4a 100%)"}}/>

                            <div className="h-[500px] overflow-y-auto">
                                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                                    {selectLevel.value.filter((el) => el.id < 51).map((el, i) => <div  onClick={() => {
                                        //dispatch(setMenu("К бою"));
                                        dispatch(getLevel(el));
                                    }
                                    } key={i + "levels"} className={"p-5 pointer"}>
                                        <LevelCount num={el.id}/>
                                        <StarGameOver count={el.star} size={"50"}/>
                                    </div>)}
                                </div>

                            </div>
                            <div className="lg:w-[911px] w-full h-[30px]"
                                 style={{background: " linear-gradient(180deg, #1f2324 17.98%, #4b4d4a 100%)"}}/>
                            <div
                                className="lg:w-[911px] w-full h-[30px] position-center-bg bg-no-repeat bg-[url(https://game.fk-i-s.ru/asset/img/gui/bottom-mob-border.png)]"/>

                        </div>
                    </div>
                </div>
            </div>

        </>
    } else {
        return <>
            <div className={"tank-level"}>

                <div className={"tank-level-box"}>
                    <div className={"title-bg"}>
                        <div className={"title-text"}>Уровни</div>
                    </div>
                    <div className={"level-bg"}>
                        <div className={"absolute tank-level-box-item top-50 left-30"}>
                            {selectLevel.value.filter((el) => el.id < 51).map((el, i) => <div onClick={() => {
                                dispatch(setMenu("К бою"));
                                dispatch(getLevel(el));
                            }
                            } key={i + "levels"} className={"float-left p-5 pointer"}>
                                <LevelCount num={el.id}/>
                                <StarGameOver count={el.star} size={"50"}/>
                            </div>)}
                        </div>

                    </div>
                </div>

            </div>
            <div className={"fixed left-0 right-0 top-0 bottom-0 margin-auto color-bg z-7"}/>
        </>
    }


}