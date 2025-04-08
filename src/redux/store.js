import { configureStore } from '@reduxjs/toolkit'
import {sec} from "./features/Sec";
import {minutes} from "./features/Minutes";
import {countPlayer} from "./features/CountPlayer";
import {counterBot} from "./features/CounterBot";
import {liveBasePlayer} from "./features/LibeBasePlayer";
import {liveBaseBot} from "./features/LiveBaseBot";
import {hangar} from "./features/Hangar";
import {selectMenu} from "./features/SelectMenu";
import {money} from "./features/Money";
import {battle} from "./features/Battle";
import {pause} from "./features/Pause";
import {gameOver} from "./features/GameOver";
import {star} from "./features/Stsr";
import {level} from "./features/Level";
import {levelCount} from "./features/LevelCount";
import {restart} from "./features/Restart";
import {music} from "./features/Music";
import {effect} from "./features/Effect";






export default configureStore({
    reducer: {
        sec: sec.reducer,
        min:minutes.reducer,
        countPlayer:countPlayer.reducer,
        countBot:counterBot.reducer,
        liveBasePlayer:liveBasePlayer.reducer,
        liveBaseBot:liveBaseBot.reducer,
        hangar:hangar.reducer,
        selectMenu:selectMenu.reducer,
        money:money.reducer,
        battle:battle.reducer,
        pause:pause.reducer,
        gameOver:gameOver.reducer,
        star:star.reducer,
        level:level.reducer,
        levelCount:levelCount.reducer,
        restart:restart.reducer,
        music:music.reducer,
        effect:effect.reducer
    },
})