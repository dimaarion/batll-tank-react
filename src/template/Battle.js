import Menu from "./Menu";
import {useDispatch, useSelector} from "react-redux";
import {addBattle, removeBattle} from "../redux/features/Battle";
import RestartBtn from "./RestartBtn";
import {setMenu} from "../redux/features/SelectMenu";
import LevelBtn from "./LevelBtn";
import SettingsBtn from "./SettingsBtn";
import {increment} from "../redux/features/SettingsOpen";
import CaretRight from "./CaretRight";
import CaretLeft from "./CaretLeft";
import {useState} from "react";

export default function Battle() {
    const dispatch = useDispatch();
    const getHangar = useSelector((state) => state.hangar)
    const battle = useSelector((state) => state.battle)
    const selectLevelCount = useSelector((state) => state.levelCount);




    return <>
        <div className={"tank-bg"}>
            <Menu/>
            <div id={"tank-battle"}>
                <div className={"absolute right-0 h-50px"}>
                    <div onClick={()=>dispatch(increment())} className={"tank-setting-btn  pointer"}>
                        <SettingsBtn />
                    </div>
                    <div className={"tank-level-btn pointer"}>
                        <LevelBtn/>
                    </div>
                    <div onClick={() => {
                        dispatch(removeBattle())
                    }} className={"battle-restart"}>
                        <RestartBtn/>
                    </div>
                </div>

                <div className={"absolute left-0"}>Ур. {selectLevelCount.value.id}</div>
                {
                    battle.value.length > 0 ? <div className={"battle-play"}>
                        <div onClick={() => {
                            dispatch(setMenu(""))
                        }} className={"battle-play-text "}>В бой
                        </div>
                    </div> : <div className={"battle-play-text battle-none"}> Выбери минимум один танк </div>
                }
                <div id={"battle-box-left"}>
                    {getHangar.value.map((el) => <div onClick={() => {
                        if (battle.value.length <= 20 && !battle.value.some(tank => tank.id === el.id)) {
                            dispatch(addBattle(el))
                        }
                    }} className={"battle-list"} key={el.id}>
                        {battle.value.some(tank => tank.id === el.id)?<div className={"tank-battle-add"}/>:""}
                        <div className={"battle-level"}> Ур. {el.level}</div>
                        <div className={"battle-view-tank"}>
                            <div className={"battle-view-tank-window"}>
                                <div className={"view-tank-window-item position-center-bg"}
                                     style={{background: "url(https://game.fk-i-s.ru/asset/img/gui/list/" + el.name + ".png) no-repeat"}}/>
                            </div>
                            <div className={"battle-options"}>
                                {el.options.map((opt, i) => <div className={"optionItem-battle"} key={i + "options"}>
                                    <div className={"optionIcon"} dangerouslySetInnerHTML={{__html: opt.icon}}/>
                                    <div className={"optionNum"}>{opt.num}</div>
                                </div>)}
                            </div>
                        </div>
                    </div>)}
                </div>

                <div className={"tank-battle-list-box"}>
                    <div className={"battle-list-bg"}/>
                    <div className={"tank-battle-list"}>
                        {battle.value.filter((el, i) => i <= 20).map((el, i) => <div key={i + "list"}
                                                                                    className={"tank-hangar-view-bg position-center-bg"}>
                            <div onClick={() => {

                            }} className={"position-center-bg tank-hangar-view"}
                                 style={{background: "url(https://game.fk-i-s.ru/asset/img/gui/list/" + el.name + ".png) no-repeat"}}/>

                        </div>)}
                    </div>

                </div>
            </div>
        </div>
    </>
}