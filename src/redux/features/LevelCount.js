import { createSlice } from '@reduxjs/toolkit'


export const levelCount = createSlice({
    name: "levelCount",
    initialState: {
        value: {id:1,name:"map",tiles:"tiles",quest:{
                content: {
                    title: "Глава 1: Первая Волна",
                    briefing: "Командование приказало установить контроль над приграничной зоной. Разведка доложила о перемещении вражеских разведгрупп и первых бронетанковых подразделений. Ваша задача — сдержать натиск, защитить базу и выявить слабые места в обороне противника.",
                    text: "Отразить разведывательный отряд противника и удержать базу."
                },
                "completed": false
            }},
    },
    reducers: {
        getLevel:(state, action)=>{
            state.value = {... state.value, id:action.payload.id, name:action.payload.name,tiles:action.payload.tiles,quest:action.payload.quest}

        }
    },
})

export const {getLevel} = levelCount.actions

export default levelCount.reducer