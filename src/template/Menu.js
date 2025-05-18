import CoinIcon from "./CoinIcon";
import TitleMenu from "./TitleMenu";
import {useSelector} from "react-redux";
import {useState} from "react";


export default function Menu() {
    const selectMoney = useSelector((state) => state.money);
    const [display, setDisplay] = useState("hidden");
    const selectLevelCount = useSelector((state) => state.levelCount);
    return <>
        <div className="h-[60px] lg:h-[80px]" style={{background: "linear-gradient(270deg, #ffffff 0%, #3f4243 0%, #1f2324 17.74%, #1f2324 84.05%, #3f4243 100%)"}}>
            <div className="absolute flex gap-2 top-[15px] left-[10px]">
                <div className="flex gap-2">
                    <div>
                        <CoinIcon/>
                    </div>
                    <div>{selectMoney.value}</div>
                </div>
                <div className="flex gap-2">
                    <div>Ур. {selectLevelCount.value.id}</div>
                </div>
            </div>

            <div className={"pointer z-8 flex justify-end lg:hidden pt-4 pr-4"}>
                <svg onClick={() => {
                    if (display === "hidden") {
                        setDisplay("block");
                    }
                    if (display === "block") {
                        setDisplay("hidden");
                    }

                }
                } width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path
                            d="M0 15.9375C0 15.4197 0.419733 15 0.9375 15C0.9375 15 19.6875 15 19.6875 15C20.2053 15 20.625 15.4197 20.625 15.9375C20.625 16.4553 20.2053 16.875 19.6875 16.875C19.6875 16.875 0.9375 16.875 0.9375 16.875C0.419733 16.875 0 16.4553 0 15.9375C0 15.9375 0 15.9375 0 15.9375ZM0 8.4375C0 7.91973 0.419733 7.5 0.9375 7.5C0.9375 7.5 19.6875 7.5 19.6875 7.5C20.2053 7.5 20.625 7.91973 20.625 8.4375C20.625 8.95527 20.2053 9.375 19.6875 9.375C19.6875 9.375 0.9375 9.375 0.9375 9.375C0.419733 9.375 0 8.95527 0 8.4375C0 8.4375 0 8.4375 0 8.4375ZM0 0.9375C0 0.419733 0.419733 0 0.9375 0C0.9375 0 19.6875 0 19.6875 0C20.2053 0 20.625 0.419733 20.625 0.9375C20.625 1.45527 20.2053 1.875 19.6875 1.875C19.6875 1.875 0.9375 1.875 0.9375 1.875C0.419733 1.875 0 1.45527 0 0.9375C0 0.9375 0 0.9375 0 0.9375Z"
                            fill="#00CFC9" fillRule="evenodd" transform="translate(4.688 6.563)"/>
                    </g>
                </svg>
            </div>
            <div className={`${display} lg:!block`}>
                <div className="flex justify-center">
                    <div className='lg:flex relative z-[10] w-[200px] lg:w-1/2 bg-[#1d2426]'>
                        <TitleMenu title={"Ангар"}/>
                        <TitleMenu title={"Магазин"}/>
                        <TitleMenu title={"К бою"}/>
                    </div>
                </div>
            </div>
        </div>
    </>
}