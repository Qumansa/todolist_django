import { useField } from 'formik';

import { ErrorMessage } from '@components/errorMessage';

import { InputProps } from '@types';

import common from '@styles/common.module.css';

export const InputFile = ({ label, classNameForInput, optional, ...props }: InputProps) => {
	const [field, meta, helpers] = useField(props.name);

	return (
		<label className={common.label}>
			<span>
				{label}
				{!optional ? ':' : <span className={common.italic}>&nbsp;(optional):</span>}
			</span>
			<input
				className={`${common.input} ${classNameForInput ? classNameForInput : ''}`}
				{...props}
				{...field}
				type="file"
				value={undefined}
				onChange={(e) => helpers.setValue(e.currentTarget.files?.[0])}
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
