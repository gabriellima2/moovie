import { LikeService } from '../like.service'

import { makeLikeRepository } from '@/repositories/impl/firebase/like.repository'
import { LikeRepository } from '@/repositories/like.repository'

import { CreateLikeDTO } from '@/dtos/like.dtos/create-like.dto'
import { GetLikeDTO } from '@/dtos/like.dtos/get-like.dto'
import { LikeDTO } from '@/dtos/like.dtos/like.dto'

import { LikeEntity } from '@/entities/like.entity'

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
	async get(params: GetLikeDTO): Promise<LikeEntity | null> {
		return (await this.repository.get(params)) ?? null
	}
}

export const makeLikeService = () => new LikeServiceImpl(makeLikeRepository())
