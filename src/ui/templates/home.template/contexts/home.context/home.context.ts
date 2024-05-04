import { createContext } from 'react'
import type { HomeContextValues } from './@types/home-context-values'

export const HomeContext = createContext<HomeContextValues>(
	{} as HomeContextValues
)
