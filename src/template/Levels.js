import StarGameOver from "./StarGameOver";
import LevelCount from "./LevelCount";
import {useDispatch, useSelector} from "react-redux";
import {setMenu} from "../redux/features/SelectMenu";
import {getLevel} from "../redux/features/LevelCount";

export default function Levels() {
    const dispatch = useDispatch();
    const selectLevel = useSelector((state) => state.level);
    console.log(selectLevel)

    return <>
        <div className={"fixed top-0 left-0 right-0 bottom-0 w-500  z-8 margin-auto"}>
            <div className={"title-bg margin-auto right-0 left-0"}>
                <div className={"absolute margin-auto top-0 right-0 left-0 bottom-0 title-text"}>Уровни</div>
            </div>
            <div className={"absolute top-70 left-0 h-100 w-100 right-0 margin-auto level-bg"}>
                <div className={"absolute top-50 left-30"}>
                    {selectLevel.value.map((el,i) => <div onClick={()=>{
                        dispatch(setMenu("К бою"));
                        dispatch(getLevel({id:el.id,name:el.name}))
                    }
                    } key={i + "levels"} className={"float-left p-5 pointer"}>
                        <LevelCount num = {el.id} />
                        <StarGameOver count={el.star} size={"50"}/>
                    </div>)}
                </div>

            </div>
        </div>
        <div className={"fixed left-0 right-0 top-0 bottom-0 margin-auto color-bg z-7"}/>
    </>
}