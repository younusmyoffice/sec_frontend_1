import { createAsyncAction } from "typesafe-actions";

const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

function createRequestTypes(base) {
    return [REQUEST, SUCCESS, FAILURE, CANCEL].reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {});
}

const USER = createRequestTypes("USER");

export const fetchUserAction = createAsyncAction(USER[REQUEST], USER[SUCCESS], USER[FAILURE])();
