import {useSelector} from "react-redux";

export default function LevelCount(props){
    const selectLevelCount = useSelector((state) => state.levelCount);

    let active = ""
    if(selectLevelCount.value.id === props.num){
        active = "tank-level-active"
    }

    return <>
        <div>
            <svg width="53" height="49.99" viewBox="0 0 53 49.99" fill="none" xmlns="http://www.w3.org/2000/svg">

                <g transform="translate(1.5 0)">
                    <g fill="#1F2324" fillRule="evenodd">
                        <rect width="49.99" height="49.99" />
                        <path d="M49.99 0L0 0L0 49.99L49.99 49.99L49.99 0ZM4 45.99L4 4L45.99 4L45.99 45.99L4 45.99Z"  className={"tank-btn " + active} fillRule="evenodd" />
                    </g>
                    <g transform="translate(0 12.498)">
                        <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324" strokeLinecap="square" transform="translate(0 23.745)" />
                        <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324" strokeLinecap="square" transform="translate(0 11.873)" />
                        <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324" strokeLinecap="square" />
                    </g>
                    <text x={props.num < 10?17:10} y={38} className={"title-text"} fill="#c6bcbc" fillRule="evenodd" >{props.num}</text>
                </g>
            </svg>
        </div>
    </>
}