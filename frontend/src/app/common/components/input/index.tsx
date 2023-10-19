import { useField } from 'formik';
import { useEffect, useRef } from 'react';

import { ErrorMessage } from '@components/errorMessage';

import { Props } from './types';

import common from '@styles/common.module.css';

export const Input = ({ label, classNameForInput, optional, focusOnComponentLoad, ...props }: Props) => {
	const [field, meta] = useField(props.name);
	const userNameRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		focusOnComponentLoad && userNameRef.current && userNameRef.current.focus();
	}, []);

	return label ? (
		<label className={common.label}>
			{label}
			{!optional ? ':' : <span className={common.italic}>&nbsp;(optional):</span>}
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
	) : (
		<>
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
		</>
	);
};
