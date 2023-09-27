import { useEffect } from "react";
import { Props } from "./types";

export const useSetIsVisibleToFalseAfterDelay = ({isVisible, setIsVisible, timerRef, timerDuration}: Props) => {
    useEffect(() => {
		if (!isVisible || timerRef.current === null) return;

		timerRef.current = window.setTimeout(() => {
			setIsVisible(false);
		}, timerDuration);

		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, [isVisible]);
};