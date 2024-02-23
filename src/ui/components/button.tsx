import { forwardRef } from 'react'
import {
	ActivityIndicator,
	TouchableOpacity,
	View,
	ViewProps,
	TextProps,
	TouchableOpacityProps,
	ColorValue,
} from 'react-native'
import colors from 'tailwindcss/colors'

import { Typography } from '../atoms/typography'
import { cn } from '@/helpers/cn'

export type ButtonProps = TouchableOpacityProps & {
	outline?: boolean
	text?: boolean
}

export type LoadingProps = { color?: ColorValue }

const Root = forwardRef<TouchableOpacity, ButtonProps>((props, ref) => {
	const { className, disabled, outline, text, ...rest } = props
	return (
		<TouchableOpacity
			ref={ref}
			disabled={disabled}
			activeOpacity={0.7}
			className={cn(
				className,
				'w-full p-4 h-14 flex-row items-center border-2 border-transparent justify-center rounded-2xl bg-black',
				disabled && 'opacity-70',
				outline && 'bg-transparent border-black',
				text &&
					'w-auto p-0 items-center justify-center rounded-none bg-transparent'
			)}
			{...rest}
		/>
	)
})

function Loading(props: LoadingProps) {
	const { color = colors.white } = props
	return <ActivityIndicator color={color} size={20} />
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
