import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'

import { TogglePasswordVisibilityButton } from '../components/toggle-password-visibility-button'
import { TextButton } from '../components/text-button'
import { Typography } from '../atoms/typography'
import { Button } from '../components/button'
import { Field } from '../components/field'

import { useToggle } from '@/hooks/use-toggle'

export function CreateAccountTemplate() {
	const { isActive, toggle } = useToggle({ initialValue: true })
	return (
		<View className="bg-white flex-1 p-5 gap-11">
			<Typography.Title className="text-4xl w-[370px]">
				Share and recommend your favorite movies
			</Typography.Title>
			<View className="flex-col items-center gap-y-6">
				<Field.Root>
					<Field.Label id="email">Email</Field.Label>
					<Field.Input id="email" placeholder="Insert your better email" />
					<Field.Error message="" />
				</Field.Root>
				<Field.Root>
					<Field.Label id="password">Password</Field.Label>
					<View>
						<Field.Input
							id="password"
							secureTextEntry={isActive}
							placeholder="Insert a strong password"
						/>
						<TogglePasswordVisibilityButton
							isVisible={isActive}
							onPress={toggle}
						/>
					</View>
					<Field.Error message="" />
				</Field.Root>
				<Button.Root accessibilityLabel="Sign In" className="justify-between">
					<Button.Label>Create Account</Button.Label>
					<Feather name="arrow-right" color={colors.white} size={24} />
				</Button.Root>
				<TextButton.Root accessibilityLabel="Continue as Guest">
					<TextButton.Label>Continue as Guest</TextButton.Label>
				</TextButton.Root>
			</View>
		</View>
	)
}
