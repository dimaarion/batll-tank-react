import StarGameOver from "./StarGameOver";

export default function Levels() {
    const level = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    return <>
        <div className={"fixed top-0 left-0 right-0 bottom-0 w-500 h-100 z-8 margin-auto"}>
            <div className={"title-bg"}>
                <div className={"absolute margin-auto top-0 right-0 left-0 bottom-0 title-text"}>Уровни</div>
            </div>
            <div className={"absolute top-120"}>
                {level.map((el) => <div>
                    <StarGameOver count={2} size={"30"}/>
                    <Levels/>
                </div>)}
            </div>


        </div>
    </>
}