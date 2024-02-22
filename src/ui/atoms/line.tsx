import { View, ViewProps } from 'react-native'
import { cn } from '@/helpers/cn'

export function Line(props: ViewProps) {
	const { className, ...rest } = props
	return (
		<View {...rest} className={cn(className, 'flex-1 h-[2px] bg-zinc-200')} />
	)
}
