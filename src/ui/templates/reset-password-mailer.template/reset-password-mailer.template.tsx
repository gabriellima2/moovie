import { View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { Typography } from '../../atoms/typography'
import { Button } from '../../components/button'
import { Field } from '../../components/field'
import { Wrapper } from '../../atoms/wrapper'

import { useResetPasswordMailerForm } from './hooks/use-reset-password-mailer-form'

export function ResetPasswordMailerTemplate() {
	const { errors, isSubmitting, setValue, onSubmit } =
		useResetPasswordMailerForm()
	return (
		<Wrapper>
			<View>
				<Typography.Title>Forgot your password?</Typography.Title>
				<Typography.Paragraph className="mt-2">
					Enter your registered email below to receive password reset
					instruction
				</Typography.Paragraph>
			</View>
			<View className="flex-col items-center gap-y-3">
				<Field.Root>
					<Field.Label id="email">Email</Field.Label>
					<Field.Input
						id="email"
						autoCapitalize="none"
						placeholder="Enter your registered email"
						returnKeyType="send"
						keyboardType="email-address"
						onChangeText={(text) => setValue('email', text)}
						onSubmitEditing={onSubmit}
					/>
					<Field.Error message={errors.email?.message} />
				</Field.Root>
				<Button.Root
					onPress={onSubmit}
					accessibilityLabel="Send password reset email"
					className="justify-between"
					disabled={isSubmitting}
				>
					<Button.Label>Send Link</Button.Label>
					{isSubmitting ? (
						<Button.Loading />
					) : (
						<Feather name="send" size={20} color={colors.white} />
					)}
				</Button.Root>
			</View>
		</Wrapper>
	)
}
