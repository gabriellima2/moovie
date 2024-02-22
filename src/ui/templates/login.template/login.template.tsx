import { useRef } from 'react'
import { TextInput, View } from 'react-native'
import { Link } from 'expo-router'

import { TogglePasswordVisibilityButton } from '../../components/toggle-password-visibility-button'
import { Typography } from '../../atoms/typography'
import { Button } from '../../components/button'
import { Field } from '../../components/field'
import { Wrapper } from '@/ui/atoms/wrapper'

import { useLoginForm } from './hooks/use-login-form'
import { useToggle } from '@/hooks/use-toggle'

export function LoginTemplate() {
	const { errors, isSubmitting, onSubmit, setValue } = useLoginForm()
	const { isActive, toggle } = useToggle({ initialValue: true })
	const passwordFieldRef = useRef<TextInput | null>(null)
	return (
		<Wrapper>
			<View>
				<Typography.Title>Welcome back</Typography.Title>
				<View className="flex flex-row items-center gap-x-1 mt-1">
					<Typography.Paragraph>Don`t have an account?</Typography.Paragraph>
					<Link href="/login" className="underline text-black">
						Sign Up
					</Link>
				</View>
			</View>
			<View className="flex-col items-center gap-y-3">
				<Field.Root>
					<Field.Label id="email">Email</Field.Label>
					<Field.Input
						id="email"
						autoCapitalize="none"
						placeholder="Enter your email"
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
							placeholder="Enter your password"
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
				<View className="w-full items-end">
					<Button.Root text>
						<Button.Label
							className="text-black mb-6 text-sm"
							accessibilityLabel="Redefine the password"
						>
							Forgot Password
						</Button.Label>
					</Button.Root>
					<Button.Root onPress={onSubmit} accessibilityLabel="Sign In">
						{isSubmitting ? (
							<Button.Loading />
						) : (
							<Button.Label>Sign In</Button.Label>
						)}
					</Button.Root>
				</View>
			</View>
		</Wrapper>
	)
}
