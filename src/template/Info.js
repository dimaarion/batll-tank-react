import CloseBtn from "./CloseBtn";

export default function Info(props){
    let options = ["Живучесть","Броня","Урон","Скорострельность","Радиус атаки","Скорость"]
    return <>
        <div className="absolute w-full h-full top-0 right-0 left-0 bottom-0 z-30">
            <div className="flex justify-center mt-[100px]">
                <div className="flex-col self-center settings-box w-[630px] relative h-[515px] p-10">
                    <div onClick={() => {
                        props?.setInfo(false)
                    }} className="absolute right-[-5px] top-[-5px]"><CloseBtn/></div>
                    <div>{props?.description}</div>
                    <div className="font-bold py-2">Характеристики:</div>
                    <div>{props?.options.map((el, i) => <div
                        className="mt-2" key={i + "opt2"}>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td className="w-[35px]" dangerouslySetInnerHTML={{__html: el.icon}}/>
                                <td className="w-[150px]">{options[i]}</td>
                                <td>{el.num}</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>)}</div>
                </div>
            </div>

        </div>

    </>
}