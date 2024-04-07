import { TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import colors from 'tailwindcss/colors'
import { ArrowLeft } from 'lucide-react-native'

import { Typography } from '../atoms/typography'

export type ErrorScreenProps = {
	message?: string
}

export function ErrorScreen(props: ErrorScreenProps) {
	const { message } = props
	const router = useRouter()
	return (
		<View className="flex-1 p-4 justify-center items-center gap-y-8">
			<Typography.Paragraph className="text-center">
				{message ||
					'Unfortunately an unexpected error occurred, please try again'}
			</Typography.Paragraph>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={router.back}
				accessibilityLabel="Go Back"
				className="flex-row items-center"
			>
				<ArrowLeft color={colors.black} size={20} className="mr-1" />
				<Typography.Label>Go Back</Typography.Label>
			</TouchableOpacity>
		</View>
	)
}
