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
    const [object, setObject] = useState(hangarDef[0])
    const [active, setActive] = useState(false)
    const dispatch = useDispatch();


    useEffect(() => {
        const timer = setTimeout(() => {
            setActive(false)
        }, 800)

        return () => clearTimeout(timer);
    }, [active])



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
                        <div className="flex justify-end mt-6 mr-6 lg:mr-0">
                            <div className="w-[30px] h-[30px] self-center flex bg-[#1F2324] border-2 border-[#808080]">
                                <CoinIcon/>
                            </div>
                            <div className="w-[130px] h-[30px] px-2 ml-4 bg-[#1F2324] border-2 border-[#808080]">
                                {coin}
                            </div>
                            <div className="ml-4" onClick={() => {
                                if (selectMoney.value >= coin && object.id) {
                                    const maxId = getHangar.value.length > 0
                                        ? Math.max(...getHangar.value.map(obj => obj.id))
                                        : 0;
                                    const updatedObject = {...object, id: maxId + 1};
                                    dispatch(selectHangar([...getHangar.value, updatedObject]))
                                    dispatch(decrement(coin))
                                    setActive(true)
                                }

                            }}>
                                <Plus/>
                            </div>
                        </div>
                        <div className="w-full h-[269px] mt-6"
                             style={{background: "linear-gradient(270deg, #ffffff 0%, #3f4243 0%, #1f2324 17.74%, #1f2324 84.05%, #3f4243 100%)"}}>
                            <div className="flex justify-center">
                                <div className="w-[260px] h-[240px] flex mt-5 relative">
                                    <div className="absolute top-[-5px]">
                                        {object.title}
                                    </div>
                                    <div className="w-[105px] mt-5">
                                        {options.map((el, i) => <div className="flex" key={i + "options"}>
                                            <div className="w-[30px] h-[30px] border-2 flex  justify-center border-[#808080]">
                                                <div className="self-center" dangerouslySetInnerHTML={{__html: el.icon}}/>
                                            </div>
                                            <div
                                                className="w-[73px] h-[30px] border-2 flex  justify-start  border-[#808080]">
                                                <div className="self-center ml-1">
                                                    {el.num}
                                                </div>
                                            </div>
                                        </div>)}
                                    </div>
                                    <div
                                        className="tank-hangar-list-item justify-center bg-no-repeat bg-cover w-[150px] h-[240px] flex">
                                        <div className={`w-[120px] h-[140px]  self-center position-center-bg ${viewTank}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[150px] w-full mt-6 flex overflow-x-auto"
                             style={{background: "linear-gradient(270deg, #ffffff 0%, #3f4243 0%, #1f2324 17.74%, #1f2324 84.05%, #3f4243 100%)"}}>
                            {hangarDef.filter((el, i) => el).map((el, i) => <div key={i + "list"}
                                                                                 className={`w-[80px] self-center h-[130px] ml-4 ${el.id === object.id ? " tank-hangar-list-item-active " : " tank-hangar-list-item "}`}>
                                <div onClick={() => {
                                    setViewTank(el.name);
                                    setOptions(el.options);
                                    setCoin(el.coin);
                                    setObject(el);
                                }} className={`w-[80px] h-[130px] bg-cover position-center-bg ${el.name}`} />

                            </div>)}
                        </div>
                    </div>
                    <div className="lg:w-[911px] w-full h-[30px] position-center-bg"
                         style={{background: " linear-gradient(180deg, #1f2324 17.98%, #4b4d4a 100%)"}}/>
                    <div
                        className="lg:w-[911px] w-full h-[30px] position-center-bg bg-no-repeat bottom-mob-border"/>


                </div>
                {active ? <div className="text-4xl bg-black fixed p-10">
                    Танк добавлен в ангар
                </div> : ""}
            </div>
        </>



}