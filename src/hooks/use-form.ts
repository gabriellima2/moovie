import {
	useForm as useHookForm,
	Path,
	PathValue,
	FieldValues,
	UseFormProps,
} from 'react-hook-form'

export function useForm<Fields extends FieldValues>(
	props?: UseFormProps<Fields>
) {
	const { clearErrors, setValue, ...form } = useHookForm<Fields>(props)

	function onChangeText(
		path: Path<Fields>,
		value: PathValue<Fields, Path<Fields>>
	) {
		const hasError = !!form.formState.errors[path]?.message
		if (hasError) {
			clearErrors(path)
		}
		setValue(path, value)
	}

	return { ...form, clearErrors, setValue: onChangeText }
}
