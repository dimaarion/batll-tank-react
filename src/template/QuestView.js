import {useSelector} from "react-redux";

export default function QuestView(){
    const selectQuest = useSelector((state) => state.quest);

    return <>
        <div className="absolute right-0 top-[82px] bg-[#3C4546] w-[200px] h-[80px] rounded-l-[25px] pl-4 flex border-2" >
            <div className="flex-col self-center">
                <div>{selectQuest.value.name}: {selectQuest.value.count}</div>
                <div>Задание: {selectQuest.value.completed?"Выполнено":"Не выполнено"}</div>
            </div>
        </div>
    </>
}