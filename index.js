import {Workshop} from "./src/workshop";

const workshops = {};


export function getWorkshop(ws) {
    if (!(ws in workshops)) {
        workshops[ws] = new Workshop(ws);
    } 
    return workshops[ws];
}

export {findValidator, addValidator} from "./src/validator"
export {Creator} from "./src/creator"
