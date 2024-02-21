import { forwardRef } from 'react'
import { TextProps, TouchableOpacity } from 'react-native'

import { Typography } from '../atoms/typography'
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
	return <Typography.Label {...props} />
}

Root.displayName = 'Root'

export const TextButton = { ...Button, Root, Label }
