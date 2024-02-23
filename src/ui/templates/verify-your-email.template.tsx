import { View } from 'react-native'
import { Redirect } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { Typography } from '../atoms/typography'
import { Button } from '../components/button'
import { Wrapper } from '../atoms/wrapper'

import { useSendEmailVerification } from '@/hooks/use-send-email-verification'

export function VerifyYourEmailTemplate() {
	const { user, isSending, handleSendEmailVerification } =
		useSendEmailVerification()
	if (!user) return <Redirect href="/login" />
	return (
		<Wrapper>
			<View>
				<Typography.Title>Verify your email</Typography.Title>
				<Typography.Paragraph className="mt-2">
					You will need to verify your email to complete registration
				</Typography.Paragraph>
			</View>
			<View>
				<Button.Root
					onPress={handleSendEmailVerification}
					accessibilityLabel="Resend email to verify your account"
				>
					{isSending ? (
						<Button.Loading />
					) : (
						<Feather name="mail" size={20} color={colors.white} />
					)}
					<Button.Label className="ml-3">Resend Email</Button.Label>
				</Button.Root>
			</View>
		</Wrapper>
	)
}
