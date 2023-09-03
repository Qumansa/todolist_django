import { ErrorMessageProps } from './types';

export const ErrorMessage = ({
	message = 'An expected error has occured! Please try again later.',
	withClassname,
}: ErrorMessageProps) => <span className={`${withClassname ? withClassname : ''} `}>{message}</span>;
