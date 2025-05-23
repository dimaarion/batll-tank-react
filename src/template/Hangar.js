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
import hangarDef from "../json/hangar.json";

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

    const levelStep = 500


    useEffect(() => {
        const timer = setTimeout(() => {
            setActive(false)
        }, 800)

        return () => clearTimeout(timer);
    }, [active])

    useEffect(() => {
        if (countSkills >= 6) {
            dispatch(selectLevel({id: id}));
            setLevel(getHangar.value.filter((el) => el.id === id)[0].level)
            //   setCountSkills(0);
        }

    }, [countSkills])

    useEffect(() => {
        setCountSkills(0);
    }, [id])


    let s = true;

    if (s) {
        return <>
            <Menu/>
            <div className="mt-6">
                <TitleHangar/>
            </div>
            <div className="mt-6 flex justify-center ">
                <div className="lg:w-[911px] w-full">
                    <div
                        className="lg:w-[911px] w-full h-[30px] position-center-bg bg-no-repeat bg-[url(https://game.fk-i-s.ru/asset/img/gui/top-mob-border.png)]"/>
                    <div className="lg:w-[911px] position-center-bg w-full h-[30px]"
                         style={{background: " linear-gradient(180deg, #1f2324 17.98%, #4b4d4a 100%)"}}/>

                    <div>
                        <div className="lg:flex justify-between mt-6 mr-6 ml-4 lg:mr-0 w-full">

                            <div className="flex">
                                <div
                                    className="w-[30px] h-[30px] self-center flex bg-[#1F2324] border-2 border-[#808080]">
                                    <CoinIcon/>
                                </div>
                                <div className="w-[130px] h-[30px] px-2 ml-4 bg-[#1F2324] border-2 border-[#808080]">
                                    {coin}
                                </div>
                            </div>
                            <div className="flex mt-3 lg:mt-0">
                                <div
                                    className="w-[30px] h-[30px] self-center flex bg-[#1F2324] border-2 border-[#808080]">
                                    <HpStarIcon/>
                                </div>
                                <div className="w-[130px] h-[30px] px-2 ml-4 bg-[#1F2324] border-2 border-[#808080]">
                                    {hp} / {level * levelStep}
                                </div>
                                <div onClick={() => {
                                    if (getHangar.value.length > 1) {
                                        dispatch(selectHangar(getHangar.value.filter((el) => el.id !== id)))
                                        dispatch(increment(sale))
                                    }

                                }} className="ml-4">
                                    <Minus/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[269px] mt-6"
                         style={{background: "linear-gradient(270deg, #ffffff 0%, #3f4243 0%, #1f2324 17.74%, #1f2324 84.05%, #3f4243 100%)"}}>
                        <div className="flex justify-center">
                            <div className="w-[260px] h-[240px] flex mt-5 relative">
                                <div className="absolute top-[-5px]">
                                    {title}
                                </div>
                                <div className="absolute left-[115px] top-[25px]">{level} Ур.</div>
                                <div className="absolute top-[-5px] left-60">
                                    {hp >= level * levelStep ?
                                        <span
                                            className={""}> {6 - countSkills} очк.</span> : ""}
                                </div>
                                <div className="w-[105px] mt-5">
                                    {getHangar.value.filter((el) => el.id === id).map((el, i) => el.options.map((opt, j) =>
                                        <div className="flex" key={j + "options"}>
                                            <div
                                                className="w-[30px] h-[30px] border-2 flex  justify-center border-[#808080]">
                                                <div className="self-center"
                                                     dangerouslySetInnerHTML={{__html: opt.icon}}/>
                                            </div>
                                            <div
                                                className="w-[73px] h-[30px] border-2 flex pl-1 justify-between border-[#808080]">
                                            <div className="self-center">
                                                {opt.num}
                                            </div>

                                            {hp >= level * levelStep && countSkills < 6 ? <div onClick={() => {
                                                setCountSkills(countSkills + 1)
                                                dispatch(selectOptions({
                                                    hangar: getHangar,
                                                    id: id,
                                                    name: opt.name,
                                                    label: "live"
                                                }))
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
                                                if (opt.name === "speed" && opt.num < 50) {
                                                    dispatch(selectOptions({
                                                        hangar: getHangar,
                                                        id: id,
                                                        name: opt.name,
                                                        label: "speed"
                                                    }))
                                                }

                                            }} className="">
                                                <Plus/>
                                            </div> : ""}
                                            </div>
                                        </div>))}
                                </div>
                                <div
                                    className="bg-[url(https://game.fk-i-s.ru/asset/img/gui/tank-hangar-list-item.png)] justify-center bg-no-repeat bg-cover w-[150px] h-[240px] flex">
                                    <div className="w-[120px] h-[140px]  self-center position-center-bg"
                                         style={{
                                             backgroundImage: "url(https://game.fk-i-s.ru/asset/img/gui/list/" + viewTank + ".png)",
                                             backgroundSize: "cover",
                                             backgroundRepeat:"no-repeat"
                                         }}/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="h-[150px] w-full mt-6 flex overflow-x-auto"
                         style={{background: "linear-gradient(270deg, #ffffff 0%, #3f4243 0%, #1f2324 17.74%, #1f2324 84.05%, #3f4243 100%)"}}>
                        {getHangar.value.filter((el, i) => el).map((el, i) => <div key={i + "list"}
                                                                                   className={`w-[80px] self-center h-[130px] ml-4 ${el.id === id ? " bg-[url(https://game.fk-i-s.ru/asset/img/gui/tank-hangar-list-item-active.png)] " : " bg-[url(https://game.fk-i-s.ru/asset/img/gui/tank-hangar-list-item.png)] "}`}>
                            <div onClick={() => {
                                setViewTank(el.name);
                                setCoin(el.coin);
                                setLevel(el.level)
                                setHp(el.hp)
                                setId(el.id)
                                setTitle(el.title)
                                setSale(el.sale)
                            }} className="w-[80px] h-[130px] bg-cover position-center-bg"
                                 style={{background: "url(https://game.fk-i-s.ru/asset/img/gui/list/" + el.name + ".png) no-repeat"}}/>

                        </div>)}
                    </div>
                    <div className="lg:w-[911px] w-full h-[30px] position-center-bg"
                         style={{background: " linear-gradient(180deg, #1f2324 17.98%, #4b4d4a 100%)"}}/>
                    <div
                        className="lg:w-[911px] w-full h-[30px] position-center-bg bg-no-repeat bg-[url(https://game.fk-i-s.ru/asset/img/gui/bottom-mob-border.png)]"/>

                </div>
            </div>
        </>
    } else {
        return <>
            <div className={"tank-bg"}>

                <div className={"tank-panel"}>
                    <TitleHangar/>
                    <div className={"tank-panel-box"}>
                        <div className={"tank-hp-text"}>
                            <span>Ур. {getHangar.value.filter((el) => el.id === id)[0]?.level}</span>
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
                            <div onClick={() => {
                                if (getHangar.value.length > 1) {
                                    dispatch(selectHangar(getHangar.value.filter((el) => el.id !== id)))
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
                                {hp >= level * levelStep ?
                                    <span className={"absolute top--25 right-0"}> {6 - countSkills} очк.</span> : ""}
                                {getHangar.value.filter((el) => el.id === id).map((el, i) => el.options.map((opt, j) =>
                                    <div
                                        className={"optionItem"} key={j + "options"}>
                                        <div className={"optionIcon"} dangerouslySetInnerHTML={{__html: opt.icon}}/>
                                        <div className={"optionNum"}>
                                            {opt.num}
                                        </div>
                                        {hp >= level * levelStep && countSkills < 6 ? <div onClick={() => {
                                            setCountSkills(countSkills + 1)
                                            dispatch(selectOptions({
                                                hangar: getHangar,
                                                id: id,
                                                name: opt.name,
                                                label: "live"
                                            }))
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
                                            if (opt.name === "speed" && opt.num < 50) {
                                                dispatch(selectOptions({
                                                    hangar: getHangar,
                                                    id: id,
                                                    name: opt.name,
                                                    label: "speed"
                                                }))
                                            }

                                        }} className={"tank-plus"}>
                                            <Plus/>
                                        </div> : ""}
                                    </div>))}
                            </div>
                        </div>
                        <div onClick={(e) => {
                            if (listScroll >= 0 || listScroll >= -e.currentTarget.clientWidth) {
                                setListScroll(listScroll - (e.currentTarget.clientWidth - 50))
                            }
                        }} className={"tank-caret-right-box pointer"}>
                            <CaretRight/>
                        </div>
                        <div onClick={(e) => {
                            if (listScroll < 0) {
                                setListScroll(listScroll + (e.currentTarget.clientWidth - 50))
                            }
                        }} className={"tank-caret-left-box pointer"}>
                            <CaretLeft/>
                        </div>
                        <div className={"tank-panel-list-box"}>
                            <div className={"tank-panel-list"}>
                                {getHangar.value.map((el, i) => <div key={i + "list"}
                                                                     className={el.id === id ? " tank-active position-center-bg " : " tank-hangar-view-bg position-center-bg"}>
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


}