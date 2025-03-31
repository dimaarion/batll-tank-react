import {useDispatch} from "react-redux";
import {setMenu} from "../redux/features/SelectMenu";

export default function TitleMenu(props){
    const dispatch = useDispatch();
    let title = props?.title
    const styles = {
        def:{
            background:"url(./img/gui/title-menu.png) no-repeat"
        }
    }
    return <>
        <div onClick={()=>dispatch(setMenu(title))} className={'tank-hangar-top-menu-title-item'} style={styles.def}>
            <div>{title}</div>
        </div>
    </>
}