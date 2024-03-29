import { IToDoItem } from "@types";

export interface Props extends IToDoItem {
    index: number;
}

export interface editTaskData {
    description: IToDoItem['description'];
}