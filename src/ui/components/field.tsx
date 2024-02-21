import { forwardRef } from 'react'
import {
	View,
	TextInput,
	ViewProps,
	TextProps,
	TextInputProps,
} from 'react-native'

import { Typography } from '../atoms/typography'
import { cn } from '@/helpers/cn'

export type InputProps = TextInputProps & { id?: string }
export type LabelProps = Omit<TextProps, 'nativeID'>
export type ErrorProps = Omit<TextProps, 'children'> & { message: string }

function Root(props: ViewProps) {
	const { className, ...rest } = props
	return <View {...rest} className={cn(className, 'w-full')} />
}

function Label(props: LabelProps) {
	return <Typography.Label {...props} nativeID={props.id} />
}

const Input = forwardRef<TextInput, InputProps>((props, ref) => {
	const { id, className, ...rest } = props
	return (
		<TextInput
			ref={ref}
			aria-labelledby={id}
			accessibilityLabelledBy={id}
			{...rest}
			className={cn(
				className,
				'w-full p-5 my-3 py-4 text-base flex-row items-center justify-center rounded-2xl bg-zinc-200'
			)}
		/>
	)
})

Input.displayName = 'Input'

function Error(props: ErrorProps) {
	const { className, message, ...rest } = props
	if (!message) return null
	return (
		<Typography.Small {...rest} className={cn(className, 'text-red-700')}>
			{message}
		</Typography.Small>
	)
}

export const Field = {
	Root,
	Label,
	Input,
	Error,
}
