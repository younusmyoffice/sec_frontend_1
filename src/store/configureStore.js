import { legacy_createStore as createStore } from "redux";
import rootReducer from "../reducers";

export default function configStore() {
    return {
        ...createStore(rootReducer),
    };
}
