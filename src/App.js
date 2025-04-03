import GamePhaser from "./GamePhaser";
import TopPanel from "./template/TopPanel";
import Hangar from "./template/Hangar";
import Shop from "./template/Shop";
import {useSelector} from "react-redux";
import Battle from "./template/Battle";
import Pause from "./template/Pause";
import GameOver from "./template/GameOver";
import Levels from "./template/Levels";

function App() {

    const selectMenu = useSelector((state) => state.selectMenu)
    const selectPause = useSelector((state) => state.pause)
    const selectGameOver = useSelector((state) => state.gameOver)

    return (
        <div className="App">
            <header>
                <TopPanel/>
            </header>
            <Levels/>
            {selectGameOver.value.active?<GameOver />:""}
            {selectPause.value?<Pause/>:""}
            {selectMenu.value === "Ангар"?<Hangar/>:selectMenu.value === "Магазин"?<Shop/>:selectMenu.value === "К бою"?<Battle/>:<GamePhaser/>}

        </div>

    );
}

export default App;
