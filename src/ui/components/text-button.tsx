import { forwardRef } from 'react'
import { Text, TextProps, TouchableOpacity } from 'react-native'

import { Button, ButtonProps } from './button'
import { cn } from '@/helpers/cn'

const Root = forwardRef<TouchableOpacity, ButtonProps>((props, ref) => {
	const { className, ...rest } = props
	return (
		<Button.Root
			ref={ref}
			className={cn(
				className,
				'w-auto p-0 items-center justify-center rounded-none bg-transparent'
			)}
			{...rest}
		/>
	)
})

function Label(props: TextProps) {
	const { className, ...rest } = props
	return (
		<Text
			{...rest}
			className={cn(className, 'font-subtitle text-base text-black')}
		/>
	)
}

Root.displayName = 'Root'

export const TextButton = { ...Button, Root, Label }
