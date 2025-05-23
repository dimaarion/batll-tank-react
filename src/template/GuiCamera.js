import {cameraBottom, cameraLeft, cameraRight, cameraStop, cameraTop} from "../redux/features/MovementCamera";
import {useDispatch, useSelector} from "react-redux";

export default function GuiCamera(){
    const dispatch = useDispatch();
    const camera = useSelector((state) => state.movementCamera.value)
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
        <div className="fixed right-[100px] bottom-0 margin-auto z-30 flex gap-12">
            <div onPointerDown={()=>dispatch(cameraRight())} onPointerUp={()=>dispatch(cameraStop())}>{btnLeft()}</div>
            <div onPointerDown={()=>dispatch(cameraLeft())} onPointerUp={()=>dispatch(cameraStop())}>{btnRight()}</div>
        </div>
        <div className="fixed right-0 bottom-[100px] margin-auto z-30 flex-col">
            <div onPointerDown={()=>dispatch(cameraTop())} onPointerUp={()=>dispatch(cameraStop())}>{btnTop()}</div>
            <div onPointerDown={()=>dispatch(cameraBottom())} onPointerUp={()=>dispatch(cameraStop())} className="mt-12">{btnBottom()}</div>
        </div>
    </>
}