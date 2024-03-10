import { useQueries } from '@tanstack/react-query'

import { makeMovieService } from '@/services/impl/movie.service'
import { makeUserService } from '@/services/impl/user.service'

export interface useGetInformationCreatedByUserParams {
	userID: string
	movieName: string
}

const userService = makeUserService()
const movieService = makeMovieService()

export function useGetInformationCreatedByUser(
	params: useGetInformationCreatedByUserParams
) {
	const { userID, movieName } = params
	return useQueries({
		queries: [
			{
				queryFn: () => userService.getByID(userID),
				queryKey: ['profile.review', userID],
			},
			{
				queryFn: () => movieService.getByName(movieName),
				queryKey: ['movie.review', movieName],
			},
		],
	})
}
