import { View, ViewProps } from 'react-native'

import { Typography } from '../atoms/typography'
import { cn } from '@/helpers/cn'

export type RootProps = ViewProps
export type TitleProps = Parameters<typeof Typography.Title>[0]

function Root(props: RootProps) {
	const { className, ...rest } = props
	return <View className={cn('px-4', className)} {...rest} />
}

function Title(props: TitleProps) {
	const { className, ...rest } = props
	return (
		<Typography.Title className={cn('text-lg mb-4', className)} {...rest} />
	)
}

export const Section = {
	Root,
	Title,
}
