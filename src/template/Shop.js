import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import hangarDef from "../json/hangar.json";
import Menu from "./Menu";
import TitleHangar from "./TitleHangar";
import CoinIcon from "./CoinIcon";
import {selectHangar} from "../redux/features/Hangar";
import Plus from "./Plus";
import {decrement} from "../redux/features/Money";

export default function Shop() {
    const getHangar = useSelector((state) => state.hangar)
    const selectMoney = useSelector((state) => state.money);
    const [viewTank, setViewTank] = useState("Hull_01")
    const [options, setOptions] = useState(hangarDef[0].options)
    const [coin, setCoin] = useState(hangarDef[0].coin)
    const [object, setObject] = useState({})
    const [active, setActive] = useState(false)
    const dispatch = useDispatch();
    const styles = {
        bg: {
            position: "fixed",
            margin: "auto",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            background: "#3C4546",
            zIndex: 4
        },
        panel: {
            position: "relative",
            top: "100px"
        },
        box: {
            background: "url(./img/gui/hangar-title-bg.png) no-repeat",
            top: "70px",
            left: 0,
            right: 0,
            width: "487px",
            height: "700px",
            position: "absolute",
            margin: "auto",

        },
        listBox: {
            width: "448px",
            height: "160px",
            position: "absolute",
            overflowX: "auto",
            top: "375.37px",
            left: 0,
            right: 0,
            margin: "auto"
        },
        list: {
            top: "70px",
            width: "max-content",
            height: "137.89px",

        },
        listItem: {
            width: "80px",
            height: "130.63px",
            float: "left",
            marginLeft: "8px"
        }
    }

    useEffect(() => {
        const timer = setTimeout(()=>{
            setActive(false)
        },800)

        return () => clearTimeout(timer);
    }, [active])

    return <>

        <div style={styles.bg}>
            <Menu/>
            <div style={styles.panel}>
                <TitleHangar/>
                <div style={styles.box}>
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
                        <div className={"view-tank-window"}>
                            <div className={"view-tank-window-item position-center-bg"}
                                 style={{background: "url(../img/gui/list/" + viewTank + ".png) no-repeat"}}/>
                        </div>
                        <div className={"options"}>
                            {options.map((el, i) => <div className={"optionItem"} key={i + "options"}>
                                <div className={"optionIcon"} dangerouslySetInnerHTML={{__html: el.icon}}/>
                                <div className={"optionNum"}>{el.num}</div>
                            </div>)}
                        </div>
                    </div>
                    <div style={styles.listBox}>
                        <div style={styles.list}>
                            {hangarDef.map((el, i) => <div key={i + "list"}
                                                           className={el.id === object.id? " tank-active position-center-bg ":" tank-hangar-view-bg position-center-bg"}>
                                <div onClick={() => {
                                    setViewTank(el.name);
                                    setOptions(el.options);
                                    setCoin(el.coin);
                                    setObject(el);
                                }} className={"position-center-bg tank-hangar-view"}
                                     style={{background: "url(../img/gui/list/" + el.name + ".png) no-repeat"}}/>

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