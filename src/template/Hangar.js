import TitleHangar from "./TitleHangar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Menu from "./Menu";
import HpStarIcon from "./HpStarIcon";
import Plus from "./Plus";
import {selectOptions, selectLevel,selectHangar} from "../redux/features/Hangar";
import Minus from "./Minus";
import {increment} from "../redux/features/Money";
import CoinIcon from "./CoinIcon";


export default function Hangar() {
    const getHangar = useSelector((state) => state.hangar)
    const [viewTank, setViewTank] = useState("Hull_01")
    const [id, setId] = useState(getHangar.value[0].id)
    const [active, setActive] = useState(false)
    const [countSkills, setCountSkills] = useState(0)
    const [count, setCount] = useState(0)
    const dispatch = useDispatch();

    const levelStep = 50


    useEffect(() => {
        const timer = setTimeout(() => {
            setActive(false)
        }, 800)

        return () => clearTimeout(timer);
    }, [active])

    useEffect(() => {
        if (countSkills >= 6) {
            if(count === 1){
                dispatch(selectLevel({id: id}));
            }
            setCount(count + 1)
            if(count > 1){
                setCount(2)
            }
        }
    }, [countSkills,dispatch,id,count])

    useEffect(() => {
        if(id){
            setCountSkills(0);
            setCount(0)
        }
    }, [id])



        return <>
            <Menu/>
            <div className="mt-6">
                <TitleHangar/>
            </div>
            <div className="mt-6 flex justify-center ">
                <div className="lg:w-[911px] w-full">
                    <div
                        className="lg:w-[911px] w-full h-[30px] position-center-bg bg-no-repeat top-mob-border"/>
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
                                    {getHangar.value.filter((el) => el.id === id)[0].coin}
                                </div>
                            </div>
                            <div className="flex mt-3 lg:mt-0">
                                <div
                                    className="w-[30px] h-[30px] self-center flex bg-[#1F2324] border-2 border-[#808080]">
                                    <HpStarIcon/>
                                </div>
                                <div className="w-[130px] h-[30px] px-2 ml-4 bg-[#1F2324] border-2 border-[#808080]">
                                    {getHangar.value.filter((el) => el.id === id)[0].hp} / {getHangar.value.filter((el) => el.id === id)[0].level * levelStep}
                                </div>
                                <div onClick={() => {
                                    if (getHangar.value.length > 1) {
                                        dispatch(selectHangar(getHangar.value.filter((el) => el.id !== id)))
                                        dispatch(increment(getHangar.value.filter((el) => el.id === id)[0].sale))
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
                                    {getHangar.value.filter((el) => el.id === id)[0].title}
                                </div>
                                <div className="absolute left-[115px] top-[25px]">{getHangar.value.filter((el) => el.id === id)[0].level} Ур.</div>
                                <div className="absolute top-[-5px] left-[60px]">
                                    {getHangar.value.filter((el) => el.id === id)[0].hp >= getHangar.value.filter((el) => el.id === id)[0].level * levelStep ?
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

                                            {getHangar.value.filter((el) => el.id === id)[0].hp >= getHangar.value.filter((el) => el.id === id)[0].level * levelStep && countSkills < 6 ? <div onClick={() => {
                                                setCountSkills(countSkills + 1)
                                                if(countSkills === 5){

                                                }
                                                console.log(countSkills)
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
                                    className="tank-hangar-list-item justify-center bg-no-repeat bg-cover w-[150px] h-[240px] flex">
                                    <div className={`w-[120px] h-[140px]  self-center position-center-bg ${viewTank}`}/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="h-[150px] w-full mt-6 flex overflow-x-auto"
                         style={{background: "linear-gradient(270deg, #ffffff 0%, #3f4243 0%, #1f2324 17.74%, #1f2324 84.05%, #3f4243 100%)"}}>
                        {getHangar.value.filter((el, i) => el).map((el, i) => <div key={i + "list"}
                                                                                   className={`w-[80px] self-center h-[130px] ml-4 ${el.id === id ? " tank-hangar-list-item-active " : " tank-hangar-list-item "}`}>
                            <div onClick={() => {
                                setViewTank(el.name);
                                setId(el.id)
                            }} className={`w-[80px] h-[130px] bg-cover position-center-bg ${el.name}`}
                                 />

                        </div>)}
                    </div>
                    <div className="lg:w-[911px] w-full h-[30px] position-center-bg"
                         style={{background: " linear-gradient(180deg, #1f2324 17.98%, #4b4d4a 100%)"}}/>
                    <div
                        className="lg:w-[911px] w-full h-[30px] position-center-bg bg-no-repeat bottom-mob-border"/>

                </div>
            </div>
        </>



}