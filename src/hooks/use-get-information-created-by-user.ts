import { useQueries } from '@tanstack/react-query'

import { makeMovieService } from '@/services/impl/movie.service'
import { makeUserService } from '@/services/impl/user.service'

import { QUERY_KEYS } from '@/constants/keys'

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
				queryKey: QUERY_KEYS.GET_USER_PROFILE_INFORMATIONS(userID),
				throwOnError: true,
			},
			{
				queryFn: () => movieService.getByName(movieName),
				queryKey: QUERY_KEYS.GET_MOVIE_REVIEWS(movieName),
				throwOnError: true,
			},
		],
	})
}
