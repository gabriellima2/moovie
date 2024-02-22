import { View } from 'react-native'
import { Link } from 'expo-router'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'

import { Typography } from '../atoms/typography'
import { Button } from '../components/button'
import { Wrapper } from '../atoms/wrapper'

export function ResetPasswordEmailHasBeenSentTemplate() {
	return (
		<Wrapper>
			<View>
				<Typography.Title>Forgot your password?</Typography.Title>
				<Typography.Paragraph className="mt-2">
					Enter your registered email below to receive password reset
					instruction
				</Typography.Paragraph>
			</View>
			<View className="items-center gap-y-3">
				<Link asChild href="/(auth)/login">
					<Button.Root className="justify-between">
						<Button.Label>Sign In</Button.Label>
						<Feather name="arrow-right" size={20} color={colors.white} />
					</Button.Root>
				</Link>
				<View className="flex flex-row items-center gap-x-1">
					<Typography.Small>Didn`t receive the link?</Typography.Small>
					<Link
						href="/reset-password-mailer"
						accessibilityLabel="Resend password reset email"
						className="underline text-black"
					>
						Resend
					</Link>
				</View>
			</View>
		</Wrapper>
	)
}
