import { RootState } from "../..";

export const selectFilters = (state: RootState) => state.filter.filters;
export const selectActiveFilter = (state: RootState) => state.filter.activeFilter;