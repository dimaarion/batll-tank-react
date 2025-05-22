import {useDispatch, useSelector} from "react-redux";
import {getLevel} from "../redux/features/LevelCount";
import {setRestart} from "../redux/features/Restart";
import {decrement} from "../redux/features/Pause";
import {gameOverClose} from "../redux/features/GameOver";

export default function PlayBtn(props) {
    const dispatch = useDispatch();
    const selectLevel = useSelector((state) => state.level);
    const selectLevelCount = useSelector((state) => state.levelCount);
    let levelPlay

    if (props?.direction === "right") {
        return <>
            <svg onMouseDown={() => {
                if (props?.step && selectLevelCount.value.id < 50) {
                    levelPlay = selectLevel.value.filter((el) => el.id === selectLevelCount.value.id + 1)[0]
                } else {
                    levelPlay = selectLevel.value.filter((el) => el.id === selectLevelCount.value.id)[0]
                }
                if (levelPlay?.id) {
                    dispatch(getLevel(levelPlay))
                }
                dispatch(setRestart(true))

            }} onMouseUp={() => {
                dispatch(setRestart(false))
                dispatch(decrement())
                dispatch(gameOverClose());
            }} width="53" height="50" viewBox="0 0 53 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(1.5 0)">
                    <g fill="#1F2324" fillRule="evenodd">
                        <rect width="49.99" height="50"/>
                        <path d="M49.99 0L0 0L0 50L49.99 50L49.99 0ZM4 46L4 4L45.99 4L45.99 46L4 46Z"
                              className={"tank-btn"} fillRule="evenodd"/>
                    </g>
                    <g transform="translate(0 13.125)">
                        <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324"
                              strokeLinecap="square" transform="translate(0 23.75)"/>
                        <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324"
                              strokeLinecap="square" transform="translate(0 11.875)"/>
                        <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324"
                              strokeLinecap="square"/>
                    </g>
                    <path d="M23.9952 15L0 30L0 0L23.9952 15Z" fill="#CEB423" fillRule="evenodd"
                          transform="translate(14.997 10)"/>
                </g>
            </svg>


        </>
    } else {
        return <>
            <svg onMouseDown={() => {
                if (props?.step && selectLevelCount.value.id > 0) {
                    levelPlay = selectLevel.value.filter((el) => el.id === selectLevelCount.value.id - 1)[0]
                } else {
                    levelPlay = selectLevel.value.filter((el) => el.id === selectLevelCount.value.id)[0]
                }
                if (levelPlay?.id) {
                    dispatch(getLevel(levelPlay))
                }
                dispatch(setRestart(true))

            }} onMouseUp={() => {
                dispatch(setRestart(false))
                dispatch(decrement())
                dispatch(gameOverClose());
            }} width="53" height="50" viewBox="0 0 53 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(1.5 0)">
                    <g fill="#1F2324" fillRule="evenodd">
                        <rect width="49.99" height="50"/>
                        <path d="M49.99 0L0 0L0 50L49.99 50L49.99 0ZM4 46L4 4L45.99 4L45.99 46L4 46Z"
                              className={"tank-btn"} fillRule="evenodd"/>
                    </g>
                    <g transform="translate(0 13.125)">
                        <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324"
                              strokeLinecap="square" transform="translate(0 23.75)"/>
                        <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324"
                              strokeLinecap="square" transform="translate(0 11.875)"/>
                        <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324"
                              strokeLinecap="square"/>
                    </g>
                    <path d="M23.9952 15L0 30L0 0L23.9952 15Z" fill="#CEB423" fillRule="evenodd"
    transform="translate(14.997 10), rotate(180,10,15) "/>
                </g>
            </svg>

        </>
    }


}