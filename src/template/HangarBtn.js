import {useDispatch} from "react-redux";
import {setMenu} from "../redux/features/SelectMenu";
import {decrement, increment} from "../redux/features/Pause";
import {gameOverClose} from "../redux/features/GameOver";

export default function HangarBtn(){
    const dispatch = useDispatch();
    return <>
        <svg onClick={()=> {
            dispatch(setMenu("К бою"));
            dispatch(decrement());
            dispatch(gameOverClose())
        }} width="53" height="49.99" viewBox="0 0 53 49.99" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(1.5 0)">
                <g>
                    <g fill="#1F2324" fillRule="evenodd">
                        <rect width="49.99" height="49.99" />
                        <path d="M49.99 0L0 0L0 49.99L49.99 49.99L49.99 0ZM4 45.99L4 4L45.99 4L45.99 45.99L4 45.99Z" className={"tank-btn"}  fillRule="evenodd" />
                    </g>
                    <g transform="translate(0 12.498)">
                        <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324" strokeLinecap="square" transform="translate(0 23.745)" />
                        <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324" strokeLinecap="square" transform="translate(0 11.873)" />
                        <path d="M0 0L50 0" fill="#3C4546" fillRule="evenodd" strokeWidth="3" stroke="#1F2324" strokeLinecap="square" />
                    </g>
                    <g transform="translate(10 9)">
                        <path d="M15.0001 0C6.72907 0 0 6.91702 0 15.4191C0 15.9541 0.433629 16.3879 0.968788 16.3879C0.968788 16.3879 12.8742 16.3879 12.8742 16.3879L17.1258 16.3879C17.1258 16.3879 29.0312 16.3879 29.0312 16.3879C29.5664 16.3879 30 15.9541 30 15.4191C30 6.91702 23.2711 0 15.0001 0ZM11.713 11.0943C11.713 11.6293 11.2794 12.0631 10.7442 12.0631C10.7442 12.0631 7.94484 12.0631 7.94484 12.0631C7.40968 12.0631 6.97605 11.6293 6.97605 11.0943C6.97605 11.0943 6.97605 10.4346 6.97605 10.4346C6.97605 9.89959 7.40968 9.46583 7.94484 9.46583C7.94484 9.46583 10.7442 9.46583 10.7442 9.46583C11.2794 9.46583 11.713 9.89959 11.713 10.4346C11.713 10.4346 11.713 11.0943 11.713 11.0943ZM16.1571 8.50751C16.1571 8.50751 16.1571 14.4504 16.1571 14.4504L13.8429 14.4504L13.8429 8.50751C13.8429 8.50751 16.1571 8.50751 16.1571 8.50751ZM23.0241 11.0943C23.0241 11.6293 22.5905 12.0631 22.0553 12.0631C22.0553 12.0631 19.2558 12.0631 19.2558 12.0631C18.7206 12.0631 18.287 11.6293 18.287 11.0943C18.287 11.0943 18.287 10.4346 18.287 10.4346C18.287 9.89959 18.7206 9.46583 19.2558 9.46583C19.2558 9.46583 22.0553 9.46583 22.0553 9.46583C22.5905 9.46583 23.0241 9.89959 23.0241 10.4346C23.0241 10.4346 23.0241 11.0943 23.0241 11.0943ZM26.8093 14.4503C26.4196 8.27474 21.2723 3.36996 15.0001 3.36996C8.728 3.36996 3.5809 8.275 3.19106 14.4503C3.19106 14.4503 1.97103 14.4503 1.97103 14.4503C2.45375 7.46703 8.11302 1.93745 15.0001 1.93745C21.887 1.93745 27.5463 7.46703 28.029 14.4503C28.029 14.4503 26.8093 14.4503 26.8093 14.4503Z" fill="#CEB423" transform="translate(0 6.806)" />
                    </g>
                </g>
            </g>
        </svg>
    </>
}