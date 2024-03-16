import { LikeService } from '../like.service'

import { makeLikeRepository } from '@/repositories/impl/like.repository.impl'

import { CreateLikeDTO } from '@/dtos/like.dtos/create-like.dto'
import { LikeRepository } from '@/repositories/like.repository'
import { LikeEntity } from '@/entities/like.entity'
import { LikeDTO } from '@/dtos/like.dto'

class LikeServiceImpl implements LikeService {
	constructor(private readonly repository: LikeRepository) {}
	async create(params: CreateLikeDTO): Promise<LikeEntity | undefined> {
		const { user_id, document_id } = params
		const alreadyLiked = await this.repository.get({ user_id, document_id })
		if (alreadyLiked) return
		return await this.repository.create(params)
	}
	async delete(params: LikeDTO): Promise<LikeEntity | undefined> {
		const { user_id, document_id } = params
		const like = await this.repository.get({ user_id, document_id })
		if (!like) return
		await this.repository.delete(like.id)
		return like
	}
}

export const makeLikeService = () => new LikeServiceImpl(makeLikeRepository())
