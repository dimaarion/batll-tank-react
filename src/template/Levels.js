import StarGameOver from "./StarGameOver";
import LevelCount from "./LevelCount";
import {useDispatch, useSelector} from "react-redux";
import {setMenu} from "../redux/features/SelectMenu";
import {getLevel} from "../redux/features/LevelCount";
import Menu from "./Menu";

export default function Levels() {
    const dispatch = useDispatch();
    const selectLevel = useSelector((state) => state.level);


    return <>
        <div className={"tank-level"}>
            <Menu/>
            <div className={"tank-level-box"}>
                <div className={"title-bg"}>
                    <div className={"title-text"}>Уровни</div>
                </div>
                <div className={"level-bg"}>
                    <div className={"absolute top-50 left-30"}>
                        {selectLevel.value.map((el,i) => <div onClick={()=>{
                            dispatch(setMenu("К бою"));
                            dispatch(getLevel({id:el.id,name:el.name,tiles:el.tiles}))
                        }
                        } key={i + "levels"} className={"float-left p-5 pointer"}>
                            <LevelCount num = {el.id} />
                            <StarGameOver count={el.star} size={"50"}/>
                        </div>)}
                    </div>

                </div>
            </div>

        </div>
        <div className={"fixed left-0 right-0 top-0 bottom-0 margin-auto color-bg z-7"}/>
    </>
}