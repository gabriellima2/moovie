import { View, ViewProps } from 'react-native'

import { Typography } from '../atoms/typography'
import { cn } from '@/helpers/cn'

export type RootProps = ViewProps
export type TitleProps = Parameters<typeof Typography.Title>[0]

function Root(props: RootProps) {
	const { className, ...rest } = props
	return (
		<View
			className={cn(
				'w-full flex-row items-center justify-between p-4',
				className
			)}
			{...rest}
		/>
	)
}

function Title(props: TitleProps) {
	const { className, ...rest } = props
	return (
		<Typography.Title className={cn('max-w-[200px]', className)} {...rest} />
	)
}

export const Header = {
	Root,
	Title,
}
