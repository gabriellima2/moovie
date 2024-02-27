export enum LikeType {
	Review = 'review',
	List = 'list',
}

export interface LikeEntity<LikeType> {
	document_id: string
	user_id: string
	type: LikeType
}
