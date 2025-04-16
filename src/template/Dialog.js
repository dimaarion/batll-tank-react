import {useSelector} from "react-redux";

export default function Dialog(){
    const selectLevelCount = useSelector((state) => state.levelCount);
    console.log(selectLevelCount)
    return <>
        <div className="absolute bottom-0 left-0 z-8 tank-dialog-img">
            <div className={"tank-dialog-content"} >
                <div className="tank-dialog-content-title">{selectLevelCount.value.quest.content.title}</div>
                <div className="tank-dialog-content-briefing">{selectLevelCount.value.quest.content.briefing}</div>
                <div className="tank-dialog-content-text">{selectLevelCount.value.quest.content.text}</div>
            </div>
        </div>
    </>
}