import { TextInput, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'

import { TogglePasswordVisibilityButton } from '../components/toggle-password-visibility-button'
import { TextButton } from '../components/text-button'
import { Typography } from '../atoms/typography'
import { Button } from '../components/button'
import { Field } from '../components/field'

import { useToggle } from '@/hooks/use-toggle'
import { useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'

export function CreateAccountTemplate() {
	const {
		register,
		setValue,
		handleSubmit,
		clearErrors,
		formState: { isSubmitting, errors },
	} = useForm<{ email: string; password: string }>()
	const { isActive, toggle } = useToggle({ initialValue: true })
	const passwordFieldRef = useRef<TextInput | null>(null)

	function handleCreateAccount(credentials: {
		email: string
		password: string
	}) {
		console.log(credentials)
	}

	function handleChange(field: 'email' | 'password', value: string) {
		const hasError = !!errors[field]?.message
		if (hasError) {
			clearErrors(field)
		}
		setValue(field, value)
	}

	useEffect(() => {
		register('email')
		register('password')
	}, [register])

	return (
		<View className="bg-white flex-1 p-5 gap-11">
			<Typography.Title className="text-4xl w-[370px]">
				Share and recommend your favorite movies
			</Typography.Title>
			<View className="flex-col items-center gap-y-6">
				<Field.Root>
					<Field.Label id="email">Email</Field.Label>
					<Field.Input
						id="email"
						autoCapitalize="none"
						placeholder="Insert your better email"
						returnKeyType="next"
						keyboardType="email-address"
						onChangeText={(text) => handleChange('email', text)}
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
							placeholder="Insert a strong password"
							returnKeyType="send"
							onChangeText={(text) => handleChange('password', text)}
							onSubmitEditing={handleSubmit(handleCreateAccount)}
						/>
						<TogglePasswordVisibilityButton
							isVisible={isActive}
							onPress={toggle}
						/>
					</View>
					<Field.Error message={errors.password?.message} />
				</Field.Root>
				<Button.Root
					onPress={handleSubmit(handleCreateAccount)}
					accessibilityLabel="Sign In"
					className="justify-between"
				>
					<Button.Label>Create Account</Button.Label>
					{isSubmitting ? (
						<Button.Loading />
					) : (
						<Feather name="arrow-right" color={colors.white} size={24} />
					)}
				</Button.Root>
				<TextButton.Root accessibilityLabel="Continue as Guest">
					<TextButton.Label>Continue as Guest</TextButton.Label>
				</TextButton.Root>
			</View>
		</View>
	)
}
