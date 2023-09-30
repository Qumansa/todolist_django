import { useField } from 'formik';
import { useEffect, useRef } from 'react';

import { ErrorMessage } from '@components/errorMessage';

import { Props } from './types';

import common from '@common/common.module.css';

export const Input = ({ label, classNameForInput, focusOnPageLoad, ...props }: Props) => {
	const [field, meta] = useField(props.name);
	const userNameRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		focusOnPageLoad && userNameRef.current && userNameRef.current.focus();
	}, []);

	return (
		<label className={common.label}>
			{label}
			<input
				className={`${common.input} ${classNameForInput ? classNameForInput : ''}`}
				{...props}
				{...field}
				ref={userNameRef}
			/>
			{meta.touched && meta.error && (
				<ErrorMessage
					message={meta.error}
					withClassname={common.input__error}
				/>
			)}
		</label>
	);
};
