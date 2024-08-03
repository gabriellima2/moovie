import { createContext } from 'react'
import type { MovieDetailsContextValues } from './@types/movie-details-context-values'

export const MovieDetailsContext = createContext<MovieDetailsContextValues>(
	{} as MovieDetailsContextValues
)
