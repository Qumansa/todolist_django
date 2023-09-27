import { Props } from './types';

export const ErrorMessage = ({
	message = 'An expected error has occured! Please try again later.',
	withClassname,
}: Props) => <span className={withClassname ? withClassname : ''}>{message}</span>;
