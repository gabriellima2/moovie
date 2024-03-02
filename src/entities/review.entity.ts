export interface ReviewEntity {
	id: string
	movie_name: string
	user_id: string
	rating: number
	description: string
	likes_id: string[]
	created_at: {
		nanoseconds: number
		seconds: number
	}
	updated_at: {
		nanoseconds: number
		seconds: number
	}
}
