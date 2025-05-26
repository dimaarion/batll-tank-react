import {useDispatch, useSelector} from "react-redux";
import {setMenu} from "../redux/features/SelectMenu";
import {useEffect, useState} from "react";

export default function TitleMenu(props){
    const selectMenu = useSelector((state) => state.selectMenu)
    const dispatch = useDispatch();
    const [active, setActive] = useState("")

    useEffect(()=>{
        if(selectMenu.value === props?.title){
            setActive("tank-text-active")
        }

    },[selectMenu,props?.title])

    let title = props?.title

    return <>
        <div onClick={()=>dispatch(setMenu(title))} className={`w-[200px] flex justify-center h-[80px] mx-4 position-center-bg title-menu text-center `}>
            <div className={`text-2xl mt-5 ${active}`}>{title}</div>
        </div>
    </>
}