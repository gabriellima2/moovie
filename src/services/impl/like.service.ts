import { LikeService } from '../like.service'

import { makeLikeRepository } from '@/repositories/impl/like.repository.impl'

import { CreateLikeDTO } from '@/dtos/like.dtos/create-like.dto'
import { LikeRepository } from '@/repositories/like.repository'
import { LikeEntity } from '@/entities/like.entity'

class LikeServiceImpl implements LikeService {
	constructor(private readonly repository: LikeRepository) {}
	async create(params: CreateLikeDTO): Promise<LikeEntity> {
		return await this.repository.create(params)
	}
	async delete(id: string): Promise<void> {
		return await this.delete(id)
	}
}

export const makeLikeService = () => new LikeServiceImpl(makeLikeRepository())
