import {useSelector} from "react-redux";

export default function TitleHangar(props){
    const selectMenu = useSelector((state) => state.selectMenu);
    return <>
        <div>
            <div className="hangar-title relative position-center-bg right-0 left-0 mx-auto w-[296px] h-[70px]" >
                <div className="justify-center flex h-[70px]">
                    <div className="flex self-center text-3xl">
                        {props?.title?props?.title:selectMenu.value}
                    </div>

                </div>
            </div>
        </div>
    </>
}