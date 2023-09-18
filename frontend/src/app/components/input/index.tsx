import { useField } from 'formik';

import { ErrorMessage } from '../errorMessage';

import { InputProps } from './types';

import global from '../../styles/global.module.css';

export const Input = ({ label, classNameForInput, ...props }: InputProps) => {
	const [field, meta, helpers] = useField(props.name);

	return (
		<label className={global.label}>
			{label}
			<input
				className={`${global.input} ${classNameForInput ? classNameForInput : ''}`}
				{...props}
				{...field}
			/>
			{meta.touched && meta.error && (
				<ErrorMessage
					message={meta.error}
					withClassname={global.input__error}
				/>
			)}
		</label>
	);
};
