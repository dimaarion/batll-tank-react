import GamePhaser from "./GamePhaser";
import TopPanel from "./template/TopPanel";
import Hangar from "./template/Hangar";
import Shop from "./template/Shop";
import {useSelector} from "react-redux";
import Battle from "./template/Battle";
import Pause from "./template/Pause";

function App() {

    const selectMenu = useSelector((state) => state.selectMenu)
    const selectPause = useSelector((state) => state.pause)
   // console.log(selectPause.value)
    return (
        <div className="App">
            <header>
                <TopPanel/>
            </header>
            {selectPause.value?<Pause/>:""}
            {selectMenu.value === "Ангар"?<Hangar/>:selectMenu.value === "Магазин"?<Shop/>:selectMenu.value === "К бою"?<Battle/>:<GamePhaser/>}

        </div>

    );
}

export default App;
