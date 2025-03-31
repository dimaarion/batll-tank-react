import GamePhaser from "./GamePhaser";
import TopPanel from "./template/TopPanel";
import Hangar from "./template/Hangar";
import Shop from "./template/Shop";
import {useSelector} from "react-redux";
import Battle from "./template/Battle";

function App() {
    const selectMenu = useSelector((state) => state.selectMenu)
    return (
        <div className="App">
            <header>
                <TopPanel/>
            </header>

            {selectMenu.value === "Ангар"?<Hangar/>:selectMenu.value === "Магазин"?<Shop/>:selectMenu.value === "К бою"?<Battle/>:<GamePhaser/>}

        </div>

    );
}

export default App;
