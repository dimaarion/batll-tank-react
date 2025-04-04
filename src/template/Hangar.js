import TitleHangar from "./TitleHangar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Menu from "./Menu";
import HpStarIcon from "./HpStarIcon";
import Plus from "./Plus";
import {selectOptions, selectLevel, hangar} from "../redux/features/Hangar";

export default function Hangar() {
    const getHangar = useSelector((state) => state.hangar)

    const [viewTank, setViewTank] = useState("Hull_01")

    const [coin, setCoin] = useState(getHangar.value[0].coin)
    const [level, setLevel] = useState(getHangar.value[0].level)
    const [hp, setHp] = useState(getHangar.value[0].hp)
    const [id, setId] = useState(getHangar.value[0].id)
    const [active, setActive] = useState(false)
    const [countSkills, setCountSkills] = useState(0)
    const dispatch = useDispatch();

    const levelStep = 1000

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
        },
        plus: {
            position: "absolute",
            margin: "auto",
            top: 0,
            right: 0,
            bottom: 0,
            height: "30px",
            cursor: "pointer"
        }
    }

    useEffect(() => {
        const timer = setTimeout(()=>{
            setActive(false)
        },800)

        return () => clearTimeout(timer);
    }, [active])

    useEffect(()=>{
        if(countSkills >= 6){
            dispatch(selectLevel({id:id}));
            setLevel(getHangar.value.filter((el)=>el.id === id)[0].level)
         //   setCountSkills(0);
        }
    },[countSkills])

    return <>

        <div style={styles.bg}>
            <Menu/>
            <div style={styles.panel}>
                <TitleHangar/>
                <div style={styles.box}>
                    <div className={"tank-hp-text"}>
                        <span>Ур. {getHangar.value.filter((el)=>el.id === id)[0].level}</span>
                    </div>
                    <div className={"tank-hp"}>
                        <div className={"tank-coin-icon"}>
                            <HpStarIcon/>
                        </div>
                        <div id={"tank-coin-text"}>
                            <div id={"tank-coin-text-bg"}/>
                            <div id={"tank-coin-text-item"}>{hp} / {level * levelStep}</div>
                        </div>
                    </div>
                    <div className={"view-tank"}>
                        <div className={"view-tank-window"}>
                            <div className={"view-tank-window-item position-center-bg"}
                                 style={{background: "url(../img/gui/list/" + viewTank + ".png) no-repeat"}}/>
                        </div>
                        <div className={"options"}>
                            {hp >= level * levelStep?<span className={"absolute top--25 right-0"}> {6 - countSkills} очк.</span>:""}
                            {getHangar.value.filter((el) => el.id === id).map((el, i) => el.options.map((opt, j) => <div
                                className={"optionItem"} key={j + "options"}>
                                <div className={"optionIcon"} dangerouslySetInnerHTML={{__html: opt.icon}}/>
                                <div className={"optionNum"}>
                                    {opt.num}
                                </div>
                                {hp >= level * levelStep && countSkills < 6?<div onClick={() => {
                                    setCountSkills(countSkills + 1)
                                    dispatch(selectOptions({hangar: getHangar, id: id, name: opt.name, label: "live"}))
                                    dispatch(selectOptions({
                                        hangar: getHangar,
                                        id: id,
                                        name: opt.name,
                                        label: "shield"
                                    }))
                                    dispatch(selectOptions({
                                        hangar: getHangar,
                                        id: id,
                                        name: opt.name,
                                        label: "attack"
                                    }))
                                    dispatch(selectOptions({
                                        hangar: getHangar,
                                        id: id,
                                        name: opt.name,
                                        label: "attack_speed"
                                    }))
                                    dispatch(selectOptions({
                                        hangar: getHangar,
                                        id: id,
                                        name: opt.name,
                                        label: "radius_attack"
                                    }))
                                    dispatch(selectOptions({hangar: getHangar, id: id, name: opt.name, label: "speed"}))
                                }} style={styles.plus}>
                                    <Plus/>
                                </div>:""}
                            </div>))}
                        </div>
                    </div>
                    <div style={styles.listBox}>
                        <div style={styles.list}>
                            {getHangar.value.map((el, i) => <div key={i + "list"}
                                                                 className={el.id === id? " tank-active position-center-bg ":" tank-hangar-view-bg position-center-bg"}>
                                <div onClick={() => {
                                    setViewTank(el.name);
                                    setCoin(el.coin);
                                    setLevel(el.level)
                                    setHp(el.hp)
                                    setId(el.id)
                                }} className={"position-center-bg tank-hangar-view"}
                                     style={{background: "url(../img/gui/list/" + el.name + ".png) no-repeat"}}/>

                            </div>)}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </>
}