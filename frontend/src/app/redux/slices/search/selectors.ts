import { RootState } from "../..";

export const selectSearchValue = (state: RootState) => state.search.searchValue;