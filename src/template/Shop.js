import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import hangarDef from "../json/hangar.json";
import Menu from "./Menu";
import TitleHangar from "./TitleHangar";
import CoinIcon from "./CoinIcon";
import {selectHangar} from "../redux/features/Hangar";
import Plus from "./Plus";
import {decrement} from "../redux/features/Money";
import CaretRight from "./CaretRight";
import CaretLeft from "./CaretLeft";

export default function Shop() {
    const getHangar = useSelector((state) => state.hangar)
    const selectMoney = useSelector((state) => state.money);
    const [viewTank, setViewTank] = useState("Hull_01")
    const [options, setOptions] = useState(hangarDef[0].options)
    const [coin, setCoin] = useState(hangarDef[0].coin)
    const [object, setObject] = useState({})
    const [active, setActive] = useState(false)
    const [listScroll, setListScroll] = useState(0)
    const dispatch = useDispatch();


    useEffect(() => {
        const timer = setTimeout(()=>{
            setActive(false)
        },800)

        return () => clearTimeout(timer);
    }, [active])

    return <>

        <div className={"tank-bg"}>
            <Menu/>
            <div className={"tank-panel"}>
                <TitleHangar/>
                <div className={"tank-panel-box"}>
                    <div className={"tank-coin"}>
                        <div className={"tank-coin-icon"}>
                            <CoinIcon/>
                        </div>
                        <div id={"tank-coin-text"}>
                            <div id={"tank-coin-text-bg"}/>
                            <div id={"tank-coin-text-item"}>{coin}</div>
                        </div>
                        <div onClick={() => {
                            if (selectMoney.value >= coin && object.id) {
                                const maxId = getHangar.value.length > 0
                                    ? Math.max(...getHangar.value.map(obj => obj.id))
                                    : 0;
                                const updatedObject = {...object, id: maxId + 1};
                                dispatch(selectHangar([...getHangar.value, updatedObject]))
                                dispatch(decrement(coin))
                                setActive(true)
                            }

                        }} className={"tank-coin-btn"}>
                            <Plus/>
                        </div>
                    </div>
                    <div className={"view-tank"}>
                        <div className="absolute left-30 margin-auto">{object?.title}</div>
                        <div className={"view-tank-window"}>
                            <div className={"view-tank-window-item position-center-bg"}
                                 style={{background: "url(https://game.fk-i-s.ru/asset/img/gui/list/" + viewTank + ".png) no-repeat"}}/>
                        </div>
                        <div className={"options"}>
                            {options.map((el, i) => <div className={"optionItem"} key={i + "options"}>
                                <div className={"optionIcon"} dangerouslySetInnerHTML={{__html: el.icon}}/>
                                <div className={"optionNum"}>{el.num}</div>
                            </div>)}
                        </div>
                    </div>
                    <div onClick={(e)=>{
                        if(listScroll >= 0 || listScroll >= -e.currentTarget.clientWidth){
                            setListScroll(listScroll - (e.currentTarget.clientWidth - 50))
                        }
                    }}  className={"tank-caret-right-box pointer"}>
                        <CaretRight />
                    </div>
                    <div onClick={(e)=>{
                        if(listScroll < 0 ){
                        setListScroll(listScroll + (e.currentTarget.clientWidth - 50))
                            }
                    }}  className={"tank-caret-left-box pointer"}>
                        <CaretLeft/>
                    </div>
                    <div className={"tank-panel-list-box"}>
                        <div style={{marginLeft:listScroll + "px"}} className={"tank-panel-list"}>
                            {hangarDef.map((el, i) => <div key={i + "list"}
                                                           className={el.id === object.id? " tank-active position-center-bg ":" tank-hangar-view-bg position-center-bg"}>
                                <div onClick={() => {
                                    setViewTank(el.name);
                                    setOptions(el.options);
                                    setCoin(el.coin);
                                    setObject(el);
                                }} className={"position-center-bg tank-hangar-view"}
                                     style={{background: "url(https://game.fk-i-s.ru/asset/img/gui/list/" + el.name + ".png) no-repeat"}}/>

                            </div>)}
                        </div>
                    </div>

                </div>
            </div>
            {active ? <div className={"tank-shop-ok"}>
                Танк добавлен в ангар
            </div> : ""}
        </div>
    </>
}