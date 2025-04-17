import TitleHangar from "./TitleHangar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Menu from "./Menu";
import HpStarIcon from "./HpStarIcon";
import Plus from "./Plus";
import {selectOptions, selectLevel, hangar, selectHangar} from "../redux/features/Hangar";
import Minus from "./Minus";
import {decrement, increment} from "../redux/features/Money";
import CaretRight from "./CaretRight";
import CaretLeft from "./CaretLeft";
import CoinIcon from "./CoinIcon";

export default function Hangar() {
    const getHangar = useSelector((state) => state.hangar)

    const [viewTank, setViewTank] = useState("Hull_01")

    const [coin, setCoin] = useState(getHangar.value[0].coin)
    const [sale, setSale] = useState(getHangar.value[0].sale)
    const [level, setLevel] = useState(getHangar.value[0].level)
    const [hp, setHp] = useState(getHangar.value[0].hp)
    const [id, setId] = useState(getHangar.value[0].id)
    const [title, setTitle] = useState(getHangar.value[0].title)
    const [active, setActive] = useState(false)
    const [countSkills, setCountSkills] = useState(0)
    const [listScroll, setListScroll] = useState(0)
    const dispatch = useDispatch();

    const levelStep = 1000


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

        <div className={"tank-bg"}>
            <Menu/>
            <div className={"tank-panel"}>
                <TitleHangar/>
                <div  className={"tank-panel-box"}>
                    <div className={"tank-hp-text"}>
                        <span>Ур. {getHangar.value.filter((el)=>el.id === id)[0]?.level}</span>
                    </div>
                    <div className={"tank-coin-hangar"}>
                        <div className={"tank-coin-icon"}>
                            <CoinIcon/>
                        </div>
                        <div id={"tank-coin-text"}>
                            <div id={"tank-coin-text-bg"}/>
                            <div id={"tank-coin-text-item"}>{sale}</div>
                        </div>
                    </div>
                    <div className={"tank-coin"}>
                        <div className={"tank-coin-icon"}>
                            <HpStarIcon/>
                        </div>
                        <div id={"tank-coin-text"}>
                            <div id={"tank-coin-text-bg"}/>
                            <div id={"tank-coin-text-item"}>{hp} / {level * levelStep}</div>
                        </div>
                        <div onClick={()=>{
                            if(getHangar.value.length > 1){
                                dispatch(selectHangar(getHangar.value.filter((el)=>el.id !== id)))
                                dispatch(increment(sale))
                            }

                        }} className={"tank-coin-btn"}>
                            <Minus/>
                        </div>
                    </div>
                    <div className={"view-tank"}>
                        <div className={"view-tank-window"}>
                            <div className={"view-tank-window-item position-center-bg"}
                                 style={{background: "url(https://game.fk-i-s.ru/asset/img/gui/list/" + viewTank + ".png) no-repeat"}}/>
                        </div>
                        <div className={"options"}>
                            <div className="absolute left-0 margin-auto top--25">{title}</div>
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
                                    if(opt.name === "speed" && opt.num < 10){
                                        dispatch(selectOptions({hangar: getHangar, id: id, name: opt.name, label: "speed"}))
                                    }

                                }} className={"tank-plus"} >
                                    <Plus/>
                                </div>:""}
                            </div>))}
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
                        <div className={"tank-panel-list"}>
                            {getHangar.value.map((el, i) => <div key={i + "list"}
                                                                 className={el.id === id? " tank-active position-center-bg ":" tank-hangar-view-bg position-center-bg"}>
                                <div onClick={() => {
                                    setViewTank(el.name);
                                    setCoin(el.coin);
                                    setLevel(el.level)
                                    setHp(el.hp)
                                    setId(el.id)
                                    setTitle(el.title)
                                    setSale(el.sale)
                                }} className={"position-center-bg tank-hangar-view"}
                                     style={{background: "url(https://game.fk-i-s.ru/asset/img/gui/list/" + el.name + ".png) no-repeat"}}/>

                            </div>)}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </>
}