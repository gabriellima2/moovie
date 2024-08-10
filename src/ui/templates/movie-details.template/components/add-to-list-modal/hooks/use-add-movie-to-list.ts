import { useBoolean } from '@/hooks/use-boolean'

export function useAddMovieToList() {
	const { value: isSubmitting, setValue: setIsSubmitting } = useBoolean(false)

	async function handleAddMovieToList(list: string[]) {
		setIsSubmitting(true)
		try {
			if (!list.length) return
			console.log(list)
			await new Promise((resolve) => setTimeout(resolve, 1500))
		} catch (err) {
			console.log(err)
		} finally {
			setIsSubmitting(false)
		}
	}

	return { handleAddMovieToList, isSubmitting }
}
