export const KEYS = {
	SEARCH_HISTORY: 'moovie.search-history',
}

export const QUERY_KEYS = {
	MOVIE_DETAILS: ['movie-details'],
	GET_USER_RECOMMENDATIONS_LIST: (userId?: string) => [
		'recommendations-list-of-user',
		{ userId },
	],
	GET_USER_LIKES: (documentId?: string, userId?: string) => [
		'get-like',
		{ documentId, userId },
	],
	GET_USER_PROFILE_INFORMATIONS: (userId?: string) => [
		'profile.review',
		{ userId },
	],
	GET_MOVIE_REVIEWS: (movieName?: string) => ['movie.review', { movieName }],
	GET_MOVIE_BY_NAME: (movieName?: string) => ['movie', { movieName }],
	GET_REVIEW_PREVIEW: ['review_preview'],
	GET_RECOMMENDATIONS_LIST_PREVIEW: ['recommendations_list_preview'],
	GET_REVIEW_BY_ID: (reviewId?: string) => ['review', { reviewId }],
	GET_USER_BY_ID: (userId?: string) => ['user-public-info', { userId }],
}
