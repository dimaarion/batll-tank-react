import {useDispatch} from "react-redux";
import {increment} from "../redux/features/Pause";

export default function PauseBtn(){
    const dispatch = useDispatch();
    return <>
        <svg onClick={()=> {
            dispatch(increment())
        }} width="53" height="50" viewBox="0 0 53 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(1.5 0)">
                <g fill="#1F2324" fillRule="evenodd">
                    <rect width="49.99" height="49.99" />
                    <path  d="M49.99 0L0 0L0 49.99L49.99 49.99L49.99 0ZM4 45.99L4 4L45.99 4L45.99 45.99L4 45.99Z" className={"tank-btn"} fillRule="evenodd" />
                </g>
                <g transform="translate(0 12.498)">
                    <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324" strokeLinecap="square" transform="translate(0 23.745)" />
                    <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324" strokeLinecap="square" transform="translate(0 11.873)" />
                    <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324" strokeLinecap="square" />
                </g>
                <g>
                    <path d="M4.6875 0C7.27634 0 9.375 2.09867 9.375 4.6875C9.375 4.6875 9.375 23.4375 9.375 23.4375C9.375 26.0263 7.27634 28.125 4.6875 28.125C2.09867 28.125 0 26.0263 0 23.4375C0 23.4375 0 4.6875 0 4.6875C0 2.09867 2.09867 0 4.6875 0C4.6875 0 4.6875 0 4.6875 0ZM20.3125 0C22.9013 0 25 2.09867 25 4.6875C25 4.6875 25 23.4375 25 23.4375C25 26.0263 22.9013 28.125 20.3125 28.125C17.7237 28.125 15.625 26.0263 15.625 23.4375C15.625 23.4375 15.625 4.6875 15.625 4.6875C15.625 2.09867 17.7237 0 20.3125 0C20.3125 0 20.3125 0 20.3125 0Z" fill="#CEB423" transform="translate(12.5 10.938)" />
                </g>
            </g>
        </svg>
    </>
}