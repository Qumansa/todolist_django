import { Timer } from "../../types";

export interface Props {
    isVisible: boolean;
    setIsVisible: (arg0: boolean) => void;
    timerRef: React.MutableRefObject<Timer>;
    timerDuration: number;
}