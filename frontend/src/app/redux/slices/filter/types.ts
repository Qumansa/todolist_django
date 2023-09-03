export type FilterType = {
    id: string;
    name: string;
}

export interface filterSliceState {
    filters: FilterType[],
    activeFilter: string
}