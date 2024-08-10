import { TouchableHighlight, View } from 'react-native'
import { Check } from 'lucide-react-native'
import colors from 'tailwindcss/colors'

import { Typography } from '@/ui/atoms/typography'

import { useBoolean } from '@/hooks/use-boolean'
import { cn } from '@/helpers/cn'

type MoviesListOptionProps = {
	id: string
	title: string
	onCheckedChange: (id: string, checked: boolean) => void
}

export function MoviesListOption(props: MoviesListOptionProps) {
	const { id, title, onCheckedChange } = props
	const { value: isChecked, toggle: toggleIsChecked } = useBoolean(false)

	function handleToggleIsChecked() {
		const nextValue = toggleIsChecked()
		onCheckedChange(id, nextValue)
	}

	return (
		<TouchableHighlight
			underlayColor={colors.zinc[100]}
			onPress={handleToggleIsChecked}
			className="flex-1 p-5"
		>
			<View className="flex-row items-center justify-start">
				<View
					className={cn(
						'border border-zinc-400 w-5 h-5 items-center justify-center rounded-md',
						{ 'bg-black border-0': isChecked }
					)}
				>
					{isChecked && <Check color={colors.white} size={16} />}
				</View>
				<Typography.Subtitle className="text-base ml-3">
					{title}
				</Typography.Subtitle>
			</View>
		</TouchableHighlight>
	)
}
