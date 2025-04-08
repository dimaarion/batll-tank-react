import { createSlice } from '@reduxjs/toolkit'
import getHangar from "../../json/hangar.json"
export const hangar = createSlice({
    name: 'hangar',
    initialState: {
        value: getHangar.slice(0,1),
    },
    reducers: {
        selectHangar: (state, action) => {
            state.value = action.payload
        },

        selectOptions(state, action){
            let a = action.payload.hangar.value.map(el => {
                if (el.id === action.payload.id) {
                    return {
                        ...el,
                        options: el.options.map(opt =>
                            opt.name === action.payload.name
                                ? { ...opt, num: opt.num + 1 } // Обновляем num
                                : opt // Остальные оставляем без изменений
                        )
                    };
                }
                return el; // Остальные элементы возвращаем без изменений
            });
            if(action.payload.name === action.payload.label){
                state.value = a;
            }
        },
        setHp:(state, action)=>{
            state.value = state.value.map(el => {
                if (el.id === action.payload.id) {return {...el, hp: el.hp += action.payload.hp};}
                return el;
            });

        },
        selectLevel:(state, action) =>{
            state.value = state.value.map(el => {
                if (el.id === action.payload.id) {return {...el, level: el.level += 1};}
                return el;
            });
        }
    },
})

export const {selectHangar,selectOptions,setHp,selectLevel} = hangar.actions

export default hangar.reducer