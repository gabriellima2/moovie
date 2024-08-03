import { useContext } from 'react'
import { MovieDetailsContext } from '../movie-details.context'

export function useMovieDetailsContext() {
	const context = useContext(MovieDetailsContext)
	if (!context) {
		throw new Error(
			'MovieDetailsContext must be used within MovieDetailsProvider'
		)
	}
	return context
}
