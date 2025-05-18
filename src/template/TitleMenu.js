import {useDispatch, useSelector} from "react-redux";
import {setMenu} from "../redux/features/SelectMenu";
import {useEffect, useState} from "react";

export default function TitleMenu(props){
    const selectMenu = useSelector((state) => state.selectMenu)
    const dispatch = useDispatch();
    const [active, setActive] = useState("")

    useEffect(()=>{
        if(selectMenu.value === props.title){
            setActive("tank-text-active")
        }

    },[selectMenu])

    let title = props?.title
    const styles = {
        def:{
            background:"url(https://game.fk-i-s.ru/asset/img/gui/title-menu.png) no-repeat"
        }
    }
    return <>
        <div onClick={()=>dispatch(setMenu(title))} className={`w-[200px] flex justify-center h-[80px] mx-4 position-center-bg text-center ${active}`} style={styles.def}>
            <div className="text-2xl mt-5">{title}</div>
        </div>
    </>
}