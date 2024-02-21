import { forwardRef } from 'react'
import {
	ActivityIndicator,
	TouchableOpacity,
	Text,
	View,
	ViewProps,
	TextProps,
	TouchableOpacityProps,
} from 'react-native'
import colors from 'tailwindcss/colors'

import { cn } from '@/helpers/cn'

export type ButtonProps = TouchableOpacityProps

const Root = forwardRef<TouchableOpacity, ButtonProps>((props, ref) => {
	const { className, disabled, ...rest } = props
	return (
		<TouchableOpacity
			ref={ref}
			disabled={disabled}
			activeOpacity={0.7}
			className={cn(
				className,
				'w-full p-5 flex-row items-center justify-center rounded-2xl bg-black',
				disabled && 'opacity-60'
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
	return (
		<Text
			{...rest}
			className={cn(className, 'font-subtitle text-base text-white')}
		/>
	)
}

function Aside(props: ViewProps) {
	const { className, ...rest } = props
	return (
		<View className={cn(className, 'flex-row items-center gap-3')} {...rest} />
	)
}

Root.displayName = 'Root'

export const Button = { Root, Label, Loading, Aside }
