import CoinIcon from "./CoinIcon";
import TitleMenu from "./TitleMenu";
import {useSelector} from "react-redux";


export default function Menu(){
    const selectMoney = useSelector((state) => state.money);
    return <>
        <div className={"tank-hangar-top-panel"}>
            <div className={"tank-hangar-top-coin"}>
                <CoinIcon/>
            </div>
            <div className={"tank-hangar-top-coin-text"}>{selectMoney.value}</div>
            <div className={"tank-hangar-top-menu"}>
                <div className={'tank-hangar-top-menu-title'}>
                    <TitleMenu title={"Ангар"}  />
                    <TitleMenu title={"Магазин"} />
                    <TitleMenu title={"К бою"} />
                </div>

            </div>
        </div>
    </>
}