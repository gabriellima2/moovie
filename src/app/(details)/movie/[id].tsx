import { useLocalSearchParams } from 'expo-router'
import { MovieDetailsTemplate } from '@/ui/templates/movie-details.template'

export default function MovieDetails() {
	const { id } = useLocalSearchParams()
	return <MovieDetailsTemplate name={id as string} />
}
