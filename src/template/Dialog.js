import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {dialogClose, dialogOpenClose} from "../redux/features/DialogView";

export default function Dialog() {
    const selectLevelCount = useSelector((state) => state.levelCount);
    const selectorDialogView = useSelector((state) => state.dialog);
    const [close, setClose] = useState({c: "tank-dialog-no-left", r: ""});
    const dispatch = useDispatch();

useEffect(()=>{
    console.log(selectorDialogView.value)
},[selectorDialogView.value])
    return <>
            <div
                className={`${!selectorDialogView.value?"w-0 h-[120px] left-0":"lg:w-[800px] lg:h-[150px] w-[300px] h-[300px] bg-[url(https://game.fk-i-s.ru/asset/img/gui/dialog-mob.png)] lg:bg-[url(https://game.fk-i-s.ru/asset/img/gui/dialog.png)] p-10"} fixed  z-30 bottom-0 bg-no-repeat`}>
                {selectorDialogView.value ? <>
                    <div className="lg:ml-[190px] ml-[60px] text-2xl">{selectLevelCount.value.quest.content.title}</div>
                    <div className="lg:ml-[190px] lg:mt-0 mt-[60px] text-xl text-[#CEB423]">{selectLevelCount.value.quest.content.text}</div>
                </> : ""}
                <div onClick={() => {
                    setClose(close.c === "tank-dialog-no-left" ? {
                        c: "tank-dialog-left",
                        r: "matrix(-1 0 0 1 4.002 0)"
                    } : {c: "tank-dialog-no-left", r: ""})
                    dispatch(dialogOpenClose(!selectorDialogView.value))
                }} className="absolute right-[-28px] top-0 bottom-0 margin-auto h-[120px]">
                    <svg width="30" height="120" viewBox="0 0 17 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M0 0C9.39012 0 17 7.60988 17 17L17 59C17 68.3901 9.39012 76 0 76L0 76L0 0Z"
                                  className="tank-dialog-btn-bg" fill="#3C3F40"/>
                            <g transform="translate(1 0)">
                                <path className="tank-dialog-btn-bg-arrow"
                                      d="M3.72298 0.250271C3.96927 0.837862 4.06901 2.26131 3.94598 3.43277C3.94598 3.43277 1.05898 30.8735 1.05898 30.8735C1.05898 30.8735 3.94698 58.3095 3.94698 58.3095C4.02867 59.069 4.01834 59.9783 3.91993 60.6917C3.82152 61.405 3.65013 61.813 3.47092 61.7605C3.29171 61.7079 3.13218 61.203 3.05298 60.4375C3.05298 60.4375 0.0529833 31.9375 0.0529833 31.9375C-0.0176611 31.2679 -0.0176611 30.4792 0.0529833 29.8095C0.0529833 29.8095 3.05298 1.30952 3.05298 1.30952C3.17669 0.139663 3.47636 -0.33411 3.72298 0.250271C3.72298 0.250271 3.72298 0.250271 3.72298 0.250271Z"
                                      fillRule="evenodd" transform={"translate(7.501 7.126) " + close.r}/>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </>




}