import { Typography } from '../../atoms/typography'
import { Field } from '../field'
import { Button } from '../button'
import { Wrapper } from '../../atoms/wrapper'
import { useIntroductionForm } from './hooks/use-introduction-form'

export type IntroductionFormFields = {
	name: string
}

export function IntroductionForm() {
	const { errors, isSubmitting, onSubmit, setValue } = useIntroductionForm()
	return (
		<Wrapper className="p-0">
			<Typography.Title className="w-[70%] mt-2">
				👋 To start what do you want to be called?
			</Typography.Title>
			<Field.Root>
				<Field.Input
					placeholder="Enter your name"
					onChangeText={(text) => setValue('name', text)}
				/>
				<Field.Error message={errors.name?.message} />
			</Field.Root>
			<Button.Root onPress={onSubmit}>
				{isSubmitting ? (
					<Button.Loading />
				) : (
					<Button.Label>Confirm</Button.Label>
				)}
			</Button.Root>
		</Wrapper>
	)
}
