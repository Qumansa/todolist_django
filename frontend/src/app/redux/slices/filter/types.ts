export interface filterSliceState {
    filters: {
        id: string;
        name: string;
    }[];
    activeFilter: string;
}