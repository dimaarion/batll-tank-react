import {useSelector} from "react-redux";

export default function TitleHangar(props){
    const selectMenu = useSelector((state) => state.selectMenu);
    const styles = {
        title: {
            position: "relative",
            width: "296px",
            height: "69.11px",
            margin: "auto",
            right: 0,
            left: 0,
            background:"url('https://game.fk-i-s.ru/asset/img/gui/hangar-title.png')"
        },
    }
    return <>
        <div>
            <div style={styles.title} >
                <div className={"tank-title-text position-center-bg"}>{props?.title?props?.title:selectMenu.value}</div>
            </div>
        </div>
    </>
}