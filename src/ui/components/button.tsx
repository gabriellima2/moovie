import { forwardRef } from 'react'
import {
	ActivityIndicator,
	TouchableOpacity,
	View,
	ViewProps,
	TextProps,
	TouchableOpacityProps,
} from 'react-native'
import colors from 'tailwindcss/colors'

import { Typography } from '../atoms/typography'
import { cn } from '@/helpers/cn'

export type ButtonProps = TouchableOpacityProps & {
	outline?: boolean
	text?: boolean
}

const Root = forwardRef<TouchableOpacity, ButtonProps>((props, ref) => {
	const { className, disabled, outline, text, ...rest } = props
	return (
		<TouchableOpacity
			ref={ref}
			disabled={disabled}
			activeOpacity={0.7}
			className={cn(
				className,
				'w-full p-4 flex-row items-center border-2 border-transparent justify-center rounded-2xl bg-black',
				disabled && 'opacity-60',
				outline && 'bg-transparent border-black',
				text &&
					'w-auto p-0 items-center justify-center rounded-none bg-transparent'
			)}
			{...rest}
		/>
	)
})

function Loading() {
	return <ActivityIndicator color={colors.white} size={24} />
}

function Label(props: TextProps) {
	const { className, ...rest } = props
	return <Typography.Label {...rest} className={cn(className, 'text-white')} />
}

function Aside(props: ViewProps) {
	const { className, ...rest } = props
	return (
		<View className={cn(className, 'flex-row items-center gap-3')} {...rest} />
	)
}

Root.displayName = 'Root'

export const Button = { Root, Label, Loading, Aside }
