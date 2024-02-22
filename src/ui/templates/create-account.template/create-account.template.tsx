import { useRef } from 'react'
import { TextInput, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'

import { TogglePasswordVisibilityButton } from '../../components/toggle-password-visibility-button'
import { Typography } from '../../atoms/typography'
import { Button } from '../../components/button'
import { Field } from '../../components/field'
import { Line } from '@/ui/atoms/line'

import { useCreateAccountForm } from './hooks/use-create-account-form'
import { useToggle } from '@/hooks/use-toggle'

export function CreateAccountTemplate() {
	const { errors, isSubmitting, onSubmit, setValue } = useCreateAccountForm()
	const { isActive, toggle } = useToggle({ initialValue: true })
	const passwordFieldRef = useRef<TextInput | null>(null)
	return (
		<View className="bg-white flex-1 p-5 gap-y-6">
			<View>
				<Typography.Title>Create an account</Typography.Title>
				<View className="flex flex-row items-center gap-x-1 mt-1">
					<Typography.Paragraph>Already have an account?</Typography.Paragraph>
					<Link href="/" className="underline text-black">
						Login
					</Link>
				</View>
			</View>
			<View className="flex-col items-center gap-y-3">
				<Field.Root>
					<Field.Label id="email">Email</Field.Label>
					<Field.Input
						id="email"
						autoCapitalize="none"
						placeholder="Enter your better email"
						returnKeyType="next"
						keyboardType="email-address"
						onChangeText={(text) => setValue('email', text)}
						onSubmitEditing={() => passwordFieldRef.current?.focus()}
					/>
					<Field.Error message={errors.email?.message} />
				</Field.Root>
				<Field.Root>
					<Field.Label id="password">Password</Field.Label>
					<View>
						<Field.Input
							ref={passwordFieldRef}
							id="password"
							secureTextEntry={isActive}
							autoCapitalize="none"
							placeholder="Enter a strong password"
							returnKeyType="send"
							onChangeText={(text) => setValue('password', text)}
							onSubmitEditing={onSubmit}
						/>
						<TogglePasswordVisibilityButton
							isVisible={isActive}
							onPress={toggle}
						/>
					</View>
					<Field.Error message={errors.password?.message} />
				</Field.Root>
				<Button.Root onPress={onSubmit} accessibilityLabel="Sign In">
					{isSubmitting ? (
						<Button.Loading />
					) : (
						<Button.Label>Sign In</Button.Label>
					)}
				</Button.Root>
			</View>
			<View className="flex-row items-center gap-x-3">
				<Line />
				<Typography.Small>OR</Typography.Small>
				<Line />
			</View>
			<Button.Root outline accessibilityLabel="Continue as Guest">
				<Feather name="user" size={20} />
				<Button.Label className="text-black ml-3">
					Continue as Guest
				</Button.Label>
			</Button.Root>
		</View>
	)
}
