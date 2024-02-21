import {
	View,
	TouchableWithoutFeedback,
	TouchableWithoutFeedbackProps,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { cn } from '@/helpers/cn'

type TogglePasswordVisibilityButtonProps = TouchableWithoutFeedbackProps & {
	isVisible?: boolean
}

export function TogglePasswordVisibilityButton(
	props: TogglePasswordVisibilityButtonProps
) {
	const { isVisible, className, ...rest } = props
	return (
		<View className={cn(className, 'absolute right-4 bottom-8')}>
			<TouchableWithoutFeedback accessibilityLabel="Show Password" {...rest}>
				<Feather
					name={isVisible ? 'eye' : 'eye-off'}
					size={20}
					color={colors.black}
				/>
			</TouchableWithoutFeedback>
		</View>
	)
}
