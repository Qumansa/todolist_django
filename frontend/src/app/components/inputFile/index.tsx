import { useField } from 'formik';

import { ErrorMessage } from '../errorMessage';

import { InputProps } from '../../types';

import global from '../../styles/global.module.css';

export const InputFile = ({ label, classNameForInput, ...props }: InputProps) => {
	const [field, meta, helpers] = useField(props.name);

	return (
		<label className={global.label}>
			{label}
			<input
				className={`${global.input} ${classNameForInput ? classNameForInput : ''}`}
				{...props}
				{...field}
				type="file"
				value={undefined}
				onChange={(e) => helpers.setValue(e.currentTarget.files?.[0])}
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
