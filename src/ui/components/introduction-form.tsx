import { Typography } from '../atoms/typography'
import { Field } from './field'
import { Button } from './button'
import { Wrapper } from '../atoms/wrapper'
import { useForm } from '@/hooks/use-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { nameSchema } from '@/schemas/user.schema'

export type IntroductionFormFields = {
	name: string
}

export function IntroductionForm() {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IntroductionFormFields>({
		resolver: zodResolver(z.object({ name: nameSchema })),
	})

	function onSubmit(credentials: IntroductionFormFields) {
		console.log(credentials.name)
	}

	useEffect(() => {
		register('name')
	}, [register])

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
			<Button.Root onPress={handleSubmit(onSubmit)}>
				{isSubmitting ? (
					<Button.Loading />
				) : (
					<Button.Label>Confirm</Button.Label>
				)}
			</Button.Root>
		</Wrapper>
	)
}
