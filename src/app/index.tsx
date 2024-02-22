import { Stack } from 'expo-router'
import { OnboardingTemplate } from '@/ui/templates/onboarding.template'

export default function Presentation() {
	return (
		<>
			<Stack.Screen />
			<OnboardingTemplate />
		</>
	)
}
