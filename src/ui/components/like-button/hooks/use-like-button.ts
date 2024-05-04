import { useEffect, useState } from 'react'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

export type UseLikeButtonParams = {
	initialLikeCount?: number
	defaultLiked?: boolean
	onLike?: (state: boolean) => Promise<void>
}

const toast = makeToastAdapter()

export function useLikeButton(params: UseLikeButtonParams) {
	const { initialLikeCount, defaultLiked, onLike } = params
	const [likeCount, setLikeCount] = useState(initialLikeCount || 0)
	const [isLiked, setIsLiked] = useState(!!defaultLiked)

	function updateLikeCount() {
		setLikeCount((prevState) => {
			if (isLiked) return --prevState
			return ++prevState
		})
	}

	function toggleLike() {
		setIsLiked((prevState) => !prevState)
	}

	async function handleLike() {
		const stateBackup = { isLiked, likeCount }
		try {
			updateLikeCount()
			toggleLike()
			onLike && (await onLike(!!isLiked))
		} catch (err) {
			setIsLiked(stateBackup.isLiked)
			setLikeCount(stateBackup.likeCount)
			toast.show({
				type: 'error',
				title: 'Error when liking review',
				description: 'Unable to like the review, please try again',
			})
		}
	}

	useEffect(() => {
		setIsLiked(!!defaultLiked)
	}, [defaultLiked])

	useEffect(() => {
		setLikeCount(initialLikeCount || 0)
	}, [initialLikeCount])

	return { likeCount, isLiked, handleLike }
}
