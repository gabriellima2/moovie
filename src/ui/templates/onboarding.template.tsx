import { Link } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { Typography } from '../atoms/typography'
import { Button } from '../components/button'
import { Wrapper } from '../atoms/wrapper'

export function OnboardingTemplate() {
	return (
		<Wrapper className="justify-end">
			<Typography.Title className="text-4xl max-w-[300px]">
				Share and recommend your favorite movies
			</Typography.Title>
			<Link href="/create-account" asChild>
				<Button.Root className="justify-between">
					<Button.Label>Get Started</Button.Label>
					<Feather name="arrow-right" size={20} color={colors.white} />
				</Button.Root>
			</Link>
		</Wrapper>
	)
}
