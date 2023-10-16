import { InputProps } from "@types";

export interface Props extends InputProps {
    type: string;
    autoComplete?: string;
    placeholder?: string;
    focusOnComponentLoad?: boolean;
}