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
            background:"url(./img/gui/title-menu.png) no-repeat"
        }
    }
    return <>
        <div onClick={()=>dispatch(setMenu(title))} className={'tank-hangar-top-menu-title-item ' + active} style={styles.def}>
            <div>{title}</div>
        </div>
    </>
}