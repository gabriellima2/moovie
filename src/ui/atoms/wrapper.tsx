import { View, ViewProps } from 'react-native'
import { cn } from '@/helpers/cn'

export function Wrapper(props: ViewProps) {
	const { className, ...rest } = props
	return (
		<View className={cn(className, 'bg-white flex-1 p-5 gap-y-6')} {...rest} />
	)
}
