import { useField } from 'formik';

import { ErrorMessage } from '../errorMessage';

import { InputFileProps } from './types';

import global from '../../styles/global.module.css';

export const InputFile = ({ label, classNameForInput, ...props }: InputFileProps) => {
	const [field, meta, helpers] = useField(props.name);

	return (
		<label className={global.label}>
			{label}
			<input
				className={`${global.input} ${classNameForInput ? classNameForInput : ''}`}
				{...props}
				{...field}
				type="file"
				// value={undefined}
				// onChange={(e) => setFieldValue(field.name, e.currentTarget.files?.[0])}
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
