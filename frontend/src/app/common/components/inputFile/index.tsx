import { useField } from 'formik';

import { ErrorMessage } from '@components/errorMessage';

import { InputProps } from '@types';

import common from '@common/common.module.css';

export const InputFile = ({ label, classNameForInput, ...props }: InputProps) => {
	const [field, meta, helpers] = useField(props.name);

	return (
		<label className={common.label}>
			{label}
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
