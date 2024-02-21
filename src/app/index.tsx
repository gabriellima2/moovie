import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import { AntDesign, Feather } from '@expo/vector-icons'

import { TextButton } from '@/ui/components/text-button'
import { Typography } from '@/ui/atoms/typography'
import { Button } from '@/ui/components/button'

export default function AuthenticationPage() {
	return (
		<View className="bg-white flex-1 p-5 justify-end gap-11">
			<Typography.Title className="text-4xl w-[370px]">
				Share and recommend your favorite movies
			</Typography.Title>
			<View className="flex-col items-center">
				<Button.Root
					accessibilityLabel="Authenticate with a Google Account"
					className="justify-between"
				>
					<Button.Aside>
						<AntDesign name="google" color={colors.white} size={20} />
						<Button.Label>Continue with Google</Button.Label>
					</Button.Aside>
					<Feather name="arrow-right" color={colors.white} size={24} />
				</Button.Root>
				<TextButton.Root
					accessibilityLabel="Authenticate as Guest"
					className="mt-5"
				>
					<TextButton.Label>Continue as Guest</TextButton.Label>
				</TextButton.Root>
			</View>
		</View>
	)
}
