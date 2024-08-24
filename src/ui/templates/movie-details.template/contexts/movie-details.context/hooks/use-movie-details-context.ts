import { useContext } from 'react'
import { MovieDetailsContext } from '../movie-details.context'

import { ContextWithoutProviderException } from '@/exceptions/context-without-provider.exception'

export function useMovieDetailsContext() {
	const context = useContext(MovieDetailsContext)
	if (!context) {
		throw new ContextWithoutProviderException(
			'MovieDetailsContext',
			'MovieDetailsProvider'
		)
	}
	return context
}
