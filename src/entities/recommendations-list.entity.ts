export interface RecommendationsListEntity {
	id: string
	title: string
	description: string
	movies_name: string[]
	user_id: string
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
