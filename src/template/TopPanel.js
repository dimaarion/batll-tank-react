import {useSelector} from "react-redux";
import PauseBtn from "./PauseBtn";
import CoinIcon from "./CoinIcon";

export default function TopPanel() {
    const seconds = useSelector((state) => state.sec)
    const minutes = useSelector((state) => state.min)
    const countPlayer = useSelector((state) => state.countPlayer)
    const countBot = useSelector((state) => state.countBot)
    const liveBasePlayer = useSelector((state) => state.liveBasePlayer)
    const liveBaseBot = useSelector((state) => state.liveBaseBot)
    const selectMoney = useSelector((state) => state.money);
    const selectLevelCount = useSelector((state) => state.levelCount);

    let s = true

    if (s) {
        return <>
            <div className="flex justify-between h-[70px] relative">
                <div className="self-center flex ml-4">
                    <div>
                        {selectLevelCount.value.id} Уровень
                    </div>
                    <div className="ml-4 flex">
                        <div><CoinIcon/></div>
                        <div className="ml-2"> {selectMoney.value} </div>
                    </div>
                </div>

                <div className="mt-1 mr-[93px]">
                    <div className="self-center flex">
                        <div className="flex">
                            <div className="w-[40px] h-[35px]  bg-black flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                     className="bi bi-clock  self-center flex" viewBox="0 0 16 16">
                                    <path fill="#00CFC9"
                                          d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                    <path fill="#00CFC9"
                                          d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                </svg>
                            </div>
                            <div className="w-[100px] h-[35px] flex bg-black justify-center">
                                <div
                                    className="flex self-center">{minutes.value < 10 ? "0" + minutes.value : minutes.value} : {seconds.value < 10 ? "0" + seconds.value : seconds.value}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xl text-center">
                        <div className="w-[50px] h-[35px] bg-black ">
                            <div>{countPlayer.value}</div>
                        </div>
                        <div className="w-[15px] h-[35px] bg-blue-800"/>
                        <div className="w-[15px] h-[35px] bg-danger-800"/>
                        <div className="w-[50px] h-[35px] bg-black">
                            <div>{countBot.value}</div>
                        </div>
                    </div>
                </div>
                <div  className="self-center flex mr-4">
                    <PauseBtn/>
                </div>
            </div>
            <div className="flex w-full justify-between">
                <div className="w-1/2 flex">
                    <div style={{marginLeft:100 - liveBasePlayer.value + "%", width:liveBasePlayer.value + "%"}} className="mt-[-5px] h-[10px]  bg-blue-700"/>
                </div>
                <div className="w-1/2 flex">
                    <div style={{width:liveBaseBot.value + "%"}} className="mt-[-5px] h-[10px]  bg-danger-700"/>
                </div>
            </div>

        </>
    } else {
        return <>
            <div id="tank-top-panel">
                <div className={"absolute left-30 top-10 w-500 h-30 text-left z-8  margin-auto"}>
                    <div className={"tank-top-panel-level"}>{selectLevelCount.value.id} Уровень</div>
                    <div className={"tank-top-panel-money"}><span><CoinIcon/></span><span> {selectMoney.value} </span>
                    </div>

                </div>
                <svg width="100%" height="80" viewBox="0 0 1280 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="gradient_1" gradientUnits="userSpaceOnUse" x1="1295.77" y1="49.814"
                                        x2="32.049" y2="50">
                            <stop offset="0.086" stopColor="#1F2324" stopOpacity="0.431"/>
                            <stop offset="0.177" stopColor="#1F2324" stopOpacity="0.8"/>
                            <stop offset="0.84" stopColor="#1F2324" stopOpacity="0.8"/>
                            <stop offset="0.944" stopColor="#1F2324" stopOpacity="0.451"/>
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="80" fill="url(#gradient_1)" fillRule="evenodd"/>
                </svg>
                <svg id="tank-live-base-player" height="11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x={100 - liveBasePlayer.value + "%"} width={liveBasePlayer.value + "%"} height="11"
                          fill="#3949AB" fillRule="evenodd"/>
                </svg>
                <svg id="tank-live-base-bot" height="11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width={liveBaseBot.value + "%"} height="11" fill="#AB3939" fillRule="evenodd"/>
                </svg>
                <div id="tank-information-panel">
                    <svg width="120" viewBox="0 0 181 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <clipPath id="clip_path_1">
                                <rect width="40" height="34"/>
                            </clipPath>

                            <clipPath id="clip_path_3">
                                <rect width="51" height="45"/>
                            </clipPath>
                        </defs>
                        <g>
                            <g transform="translate(25 51)">
                                <g transform="translate(52 0)">
                                    <path
                                        d="M8.5 0C13.1951 0 17 3.80494 17 8.5L17 36.5C17 41.1951 13.1951 45 8.5 45L8.5 45C3.80494 45 0 41.1951 0 36.5L0 8.5C0 3.80494 3.80494 0 8.5 0Z"
                                        fill="#3949AB"/>
                                    <path
                                        d="M8.5 0C13.1951 0 17 3.80494 17 8.5L17 36.5C17 41.1951 13.1951 45 8.5 45L8.5 45C3.80494 45 0 41.1951 0 36.5L0 8.5C0 3.80494 3.80494 0 8.5 0Z"
                                        fill="#AB3939" transform="translate(17 0)"/>
                                </g>
                                <g transform="translate(83 0)">
                                    <g fill="#000000" fillRule="evenodd">
                                        <rect width="53" height="45"/>
                                        <path d="M53 0L0 0L0 45L53 45L53 0ZM2 43L2 2L51 2L51 43L2 43Z" fill="#BDBDBD"
                                              fillRule="evenodd"/>
                                    </g>
                                    <text id="tank-count-bot" x="20" y="30" fontSize="20pt"
                                          fill="#FFECB3">{countBot.value}</text>
                                </g>
                                <g>
                                    <g fill="#000000" fillRule="evenodd">
                                        <rect width="53" height="45"/>
                                        <path d="M53 0L0 0L0 45L53 45L53 0ZM2 43L2 2L51 2L51 43L2 43Z" fill="#BDBDBD"
                                              fillRule="evenodd"/>
                                    </g>
                                    <text id="tank-count-player" x="20" y="30" fontSize="20pt"
                                          fill="#FFECB3">{countPlayer.value}</text>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <g fill="#000000" fillRule="evenodd">
                                        <rect width="181" height="50"/>
                                        <path d="M181 0L0 0L0 50L181 50L181 0ZM2 48L2 2L179 2L179 48L2 48Z"
                                              fill="#BDBDBD" fillRule="evenodd"/>
                                    </g>
                                    <g x="10">
                                        <text id="tank-clock-min" x="80" y="30" fontSize="20pt"
                                              fill="#FFECB3">{minutes.value < 10 ? "0" + minutes.value : minutes.value}</text>
                                        <text x="110" y="30" fontSize="20pt" fill="#FFECB3">:</text>
                                        <text id="tank-clock-sec" x="120" y="30" fontSize="20pt"
                                              fill="#FFECB3">{seconds.value < 10 ? "0" + seconds.value : seconds.value}</text>
                                    </g>

                                </g>
                                <g>
                                    <g fill="#000000" fillRule="evenodd">
                                        <rect width="50" height="50"/>
                                        <path d="M50 0L0 0L0 50L50 50L50 0ZM2 48L2 2L48 2L48 48L2 48Z" fill="#BDBDBD"
                                              fillRule="evenodd"/>
                                    </g>
                                    <g transform="translate(5 5)">
                                        <path
                                            d="M2.5 1.25C2.5 0.559644 1.94036 0 1.25 0C0.559643 0 0 0.559644 0 1.25C0 1.25 0 15 0 15C0.000154495 15.4485 0.240578 15.8626 0.630024 16.085C0.630024 16.085 9.38003 21.085 9.38003 21.085C9.97722 21.4078 10.7229 21.1949 11.0597 20.6055C11.3965 20.0161 11.2013 19.2657 10.62 18.915C10.62 18.915 2.5 14.275 2.5 14.275C2.5 14.275 2.5 1.25 2.5 1.25Z"
                                            fill="#21B1BB" transform="translate(17.5 7.5)"/>
                                        <path
                                            d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.95431 0 20C1.19209e-06 31.0457 8.9543 40 20 40C20 40 20 40 20 40ZM37.5 20C37.5 29.665 29.665 37.5 20 37.5C10.335 37.5 2.5 29.665 2.5 20C2.5 10.335 10.335 2.5 20 2.5C29.665 2.5 37.5 10.335 37.5 20C37.5 20 37.5 20 37.5 20Z"
                                            fill="#21B1BB" transform="translate(-0 0)"/>
                                    </g>
                                </g>
                            </g>
                            <g transform="translate(0 50)">
                                <path
                                    d="M21.0996 3.46257e-05L5.70119 9.35601e-06Q5.62697 9.23422e-06 5.55298 0.00579686Q5.47899 0.0115845 5.40568 0.0231246Q5.33237 0.0346647 5.26018 0.0518871Q5.18799 0.0691094 5.11736 0.091909Q5.04674 0.114709 4.97811 0.142947Q4.90947 0.171185 4.84325 0.204689Q4.77703 0.238194 4.71362 0.27676Q4.65021 0.315327 4.59001 0.358722Q4.5298 0.402116 4.47316 0.450073Q4.41652 0.498031 4.3638 0.550259Q4.31107 0.602487 4.26258 0.658668Q4.21409 0.71485 4.17012 0.774642Q4.12616 0.834433 4.08699 0.897472Q4.04782 0.96051 4.01369 1.02641Q3.97956 1.09231 3.95067 1.16067Q3.92178 1.22904 3.89832 1.29944Q3.87485 1.36985 3.85694 1.44187Q3.83903 1.51389 3.8268 1.58709Q3.81456 1.66029 3.80807 1.73422Q3.80158 1.80815 3.80088 1.88237Q3.80018 1.95658 3.80526 2.03062Q3.81035 2.10466 3.82119 2.17808Q3.83203 2.2515 3.84857 2.32385Q3.86511 2.39619 3.88724 2.46703Q3.90936 2.53787 3.93695 2.60677Q3.96454 2.67567 3.99741 2.74221Q4.03028 2.80874 4.06825 2.87251Q4.10621 2.93628 4.14903 2.9969Q4.19185 3.05751 4.23927 3.11461Q4.28669 3.1717 4.33842 3.22492Q4.39014 3.27814 4.44586 3.32716Q4.50158 3.37618 4.56095 3.42071L19.9594 14.9695Q20.012 15.009 20.0672 15.0447Q20.1224 15.0805 20.18 15.1123Q20.2376 15.1441 20.2972 15.1719Q20.3568 15.1997 20.4182 15.2232Q20.4796 15.2468 20.5425 15.2661Q20.6054 15.2854 20.6695 15.3003Q20.7335 15.3152 20.7985 15.3256Q20.8634 15.336 20.9289 15.3419Q20.9944 15.3478 21.0602 15.3492Q21.126 15.3506 21.1917 15.3474Q21.2574 15.3442 21.3227 15.3365Q21.388 15.3287 21.4526 15.3165Q21.5173 15.3043 21.5809 15.2876Q21.6445 15.271 21.7069 15.25Q21.7692 15.2289 21.8299 15.2037Q21.8906 15.1784 21.9495 15.149Q22.0083 15.1196 22.065 15.0861Q22.1216 15.0527 22.1758 15.0155Q22.2301 14.9782 22.2816 14.9373Q22.3331 14.8964 22.3816 14.852Q22.4302 14.8077 22.4755 14.76Q22.5209 14.7124 22.5629 14.6618Q22.6049 14.6111 22.6432 14.5577Q22.6816 14.5043 22.7162 14.4483Q22.7507 14.3923 22.7814 14.3341Q22.812 14.2759 22.8385 14.2157Q22.8651 14.1555 22.8874 14.0937Q22.9097 14.0318 22.9277 13.9685Q22.9456 13.9052 22.9592 13.8409Q22.9727 13.7765 22.9818 13.7114Q22.9909 13.6462 22.9954 13.5806Q23 13.515 23 13.4492L22.9999 1.90042Q22.9999 1.80706 22.9908 1.71415Q22.9816 1.62124 22.9634 1.52967Q22.9452 1.43811 22.9181 1.34877Q22.891 1.25943 22.8553 1.17317Q22.8196 1.08692 22.7755 1.00458Q22.7315 0.922248 22.6797 0.844622Q22.6278 0.766996 22.5686 0.694828Q22.5093 0.62266 22.4433 0.556645Q22.3773 0.490629 22.3051 0.431403Q22.233 0.372176 22.1553 0.320308Q22.0777 0.26844 21.9954 0.22443Q21.9131 0.180421 21.8268 0.144693Q21.7405 0.108966 21.6512 0.0818652Q21.5619 0.0547642 21.4703 0.0365505Q21.3787 0.0183368 21.2858 0.00918577Q21.1929 3.47789e-05 21.0996 3.46257e-05L21.0996 3.46257e-05Z"
                                    fill="#71736F" fillRule="evenodd"/>
                                <path
                                    d="M1.90048 0L17.4882 0Q17.5618 0 17.6352 0.00569298Q17.7086 0.011386 17.7813 0.0227378Q17.854 0.0340897 17.9257 0.0510324Q17.9973 0.0679751 18.0674 0.0904071Q18.1375 0.112839 18.2057 0.140626Q18.2738 0.168413 18.3396 0.201389Q18.4054 0.234364 18.4685 0.27233Q18.5315 0.310297 18.5915 0.353027Q18.6514 0.395756 18.7078 0.442994Q18.7643 0.490231 18.8169 0.541692Q18.8695 0.593154 18.918 0.648532Q18.9665 0.703909 19.0106 0.762871Q19.0546 0.821833 19.094 0.884026Q19.1333 0.946219 19.1678 1.01127Q19.2022 1.07632 19.2315 1.14384Q19.2608 1.21136 19.2848 1.28095Q19.3088 1.35053 19.3273 1.42176Q19.3459 1.49299 19.3589 1.56544Q19.3718 1.6379 19.3792 1.71114Q19.3865 1.78437 19.3881 1.85796Q19.3898 1.93154 19.3857 2.00504Q19.3817 2.07853 19.3719 2.15149Q19.3622 2.22445 19.3469 2.29643Q19.3315 2.36842 19.3107 2.43901Q19.2898 2.50959 19.2636 2.57836Q19.2373 2.64712 19.2058 2.71364Q19.1743 2.78016 19.1378 2.84405Q19.1012 2.90794 19.0598 2.96881Q19.0184 3.02968 18.9725 3.08717Q18.9265 3.14466 18.8762 3.19841Q18.826 3.25217 18.7717 3.30188Q18.7174 3.35159 18.6594 3.39696L3.07164 15.5961Q3.01936 15.637 2.96435 15.6742Q2.90934 15.7114 2.85187 15.7446Q2.79441 15.7778 2.73476 15.807Q2.67511 15.8361 2.61358 15.861Q2.55204 15.886 2.48892 15.9065Q2.42579 15.9271 2.36139 15.9432Q2.29698 15.9593 2.23161 15.9708Q2.16624 15.9824 2.10022 15.9894Q2.0342 15.9964 1.96785 15.9987Q1.90151 16.0011 1.83516 15.9988Q1.76881 15.9965 1.70278 15.9896Q1.63675 15.9827 1.57137 15.9712Q1.50598 15.9597 1.44156 15.9437Q1.37714 15.9277 1.31399 15.9072Q1.25084 15.8867 1.18928 15.8619Q1.12771 15.837 1.06803 15.8079Q1.00835 15.7789 0.950844 15.7457Q0.893337 15.7125 0.838286 15.6754Q0.783235 15.6383 0.730907 15.5975Q0.678579 15.5566 0.62923 15.5122Q0.57988 15.4678 0.53375 15.42Q0.48762 15.3723 0.444934 15.3215Q0.402248 15.2706 0.363214 15.2169Q0.32418 15.1632 0.288988 15.1069Q0.253796 15.0506 0.222619 14.992Q0.191441 14.9334 0.16443 14.8728Q0.137418 14.8121 0.114704 14.7497Q0.0919907 14.6874 0.0736854 14.6235Q0.0553801 14.5597 0.0415725 14.4948Q0.0277649 14.4299 0.0185224 14.3641Q0.00927986 14.2984 0.00464743 14.2321Q1.49991e-05 14.1659 1.52588e-05 14.0995L9.15527e-05 1.90038Q9.23024e-05 1.80702 0.00924386 1.71411Q0.0183954 1.6212 0.0366097 1.52963Q0.0548239 1.43807 0.0819254 1.34873Q0.109027 1.25939 0.144755 1.17314Q0.180482 1.08688 0.224492 1.00455Q0.268502 0.92221 0.320371 0.844585Q0.372239 0.766959 0.431466 0.694791Q0.490693 0.622623 0.556709 0.556608Q0.622724 0.490593 0.694893 0.431366Q0.767061 0.372139 0.844687 0.320271Q0.922313 0.268404 1.00465 0.224394Q1.08698 0.180385 1.17324 0.144658Q1.25949 0.10893 1.34883 0.0818296Q1.43817 0.0547288 1.52974 0.0365152Q1.6213 0.0183017 1.71421 0.00915083Q1.80712 0 1.90048 0Z"
                                    fill="#71736F" fillRule="evenodd" transform="translate(159 0)"/>
                            </g>
                        </g>

                    </svg>

                </div>
                <div id="tank-top-pause-mtn">
                    <PauseBtn/>
                </div>
            </div>
        </>

    }


}