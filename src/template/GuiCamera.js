import {getLevel} from "../redux/features/LevelCount";
import {setRestart} from "../redux/features/Restart";
import {decrement} from "../redux/features/Pause";
import {gameOverClose} from "../redux/features/GameOver";

export default function GuiCamera(){
    function btnRight(){
        return  <svg onMouseDown={() => {}} onMouseUp={() => {

        }} width="60" height="60" viewBox="0 0 53 50" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    }

    function btnLeft(){
        return  <svg onMouseDown={() => {}} onMouseUp={() => {

        }} width="60" height="60" viewBox="0 0 53 50" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    }
    function btnTop(){
        return  <svg onMouseDown={() => {}} onMouseUp={() => {

        }} width="60" height="60" viewBox="0 0 53 50" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                      transform="translate(14.997 10), rotate(-90,10,15) "/>
            </g>
        </svg>
    }

    function btnBottom(){
        return  <svg onMouseDown={() => {}} onMouseUp={() => {

        }} width="60" height="60" viewBox="0 0 53 50" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                      transform="translate(14.997 10), rotate(90,10,15) "/>
            </g>
        </svg>
    }

    return <>
        <div className="absolute right-[100px] bottom-0 margin-auto z-30 flex gap-12">
            <div>{btnLeft()}</div>
            <div>{btnRight()}</div>
        </div>
        <div className="absolute right-0 bottom-[100px] margin-auto z-30 flex-col">
            <div >{btnTop()}</div>
            <div className="mt-12">{btnBottom()}</div>
        </div>
    </>
}