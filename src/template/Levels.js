import StarGameOver from "./StarGameOver";
import LevelCount from "./LevelCount";
import {useDispatch, useSelector} from "react-redux";

import {getLevel} from "../redux/features/LevelCount";
import Menu from "./Menu";
import TitleHangar from "./TitleHangar";
import {useEffect} from "react";


export default function Levels() {
    const dispatch = useDispatch();
    const selectLevel = useSelector((state) => state.level);
    const sdk = useSelector((state) => state.ysdk.value)
    useEffect(()=>{
        if(sdk.features?.GameplayAPI){
            sdk.features.GameplayAPI.stop()
        }

    },[sdk])
        return <>
            <Menu/>
            <div>
                <div className="mt-6">
                    <TitleHangar/>
                </div>
                <div>
                    <div className="mt-6 flex justify-center">
                        <div className="lg:w-[911px] w-full ">
                            <div
                                className="lg:w-[911px] w-full h-[30px] position-center-bg bg-no-repeat top-mob-border"/>
                            <div className="lg:w-[911px] w-full h-[30px]"
                                 style={{background: " linear-gradient(180deg, #1f2324 17.98%, #4b4d4a 100%)"}}/>

                            <div className="h-[500px] overflow-y-auto">
                                <div className="grid grid-cols-5 sm:grid-cols-10">
                                    {selectLevel.value.filter((el) => el.id < 51).map((el, i) => <div  onClick={() => {
                                        dispatch(getLevel(el));
                                    }
                                    } key={i + "levels"} className={"p-2 pointer"}>
                                        <LevelCount num={el.id}/>
                                        <StarGameOver count={el.star} size={"50"}/>
                                    </div>)}
                                </div>

                            </div>
                            <div className="lg:w-[911px] w-full h-[30px]"
                                 style={{background: " linear-gradient(180deg, #1f2324 17.98%, #4b4d4a 100%)"}}/>
                            <div
                                className="lg:w-[911px] w-full h-[30px] position-center-bg bg-no-repeat bottom-mob-border"/>

                        </div>
                    </div>
                </div>
            </div>

        </>



}