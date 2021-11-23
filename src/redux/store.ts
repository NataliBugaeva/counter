import {combineReducers, createStore} from "redux";
import {MainReducer} from "./mainReducer";


const rootReducer = combineReducers({
    mainReducer: MainReducer
})

export const store = createStore(rootReducer);

export type RootStateType = ReturnType<typeof rootReducer>;
