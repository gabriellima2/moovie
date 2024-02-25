import { Redirect } from 'expo-router'

import { Typography } from '../../atoms/typography'
import { Wrapper } from '../../atoms/wrapper'
import { BottomSheet } from '../bottom-sheet'
import { Button } from '../button'
import { Field } from '../field'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useIntroductionForm } from './hooks/use-introduction-form'

export type IntroductionFormFields = {
	name: string
}

export function IntroductionForm() {
	const { user } = useAuthenticationStore()
	const {
		errors,
		isSubmitting,
		onSubmit,
		handleSaveEmptyUserInformations,
		setValue,
	} = useIntroductionForm()
	if (!user) return <Redirect href="/login" />
	if (user.isAnonymous || (user && user.displayName)) return null
	return (
		<BottomSheet onClose={handleSaveEmptyUserInformations}>
			<Wrapper className="p-0">
				<Typography.Title className="w-[70%] mt-2">
					👋 To start what do you want to be called?
				</Typography.Title>
				<Field.Root>
					<Field.Input
						placeholder="Enter your name"
						onChangeText={(text) => setValue('username', text)}
					/>
					<Field.Error message={errors.username?.message} />
				</Field.Root>
				<Button.Root onPress={onSubmit}>
					{isSubmitting ? (
						<Button.Loading />
					) : (
						<Button.Label>Confirm</Button.Label>
					)}
				</Button.Root>
			</Wrapper>
		</BottomSheet>
	)
}
