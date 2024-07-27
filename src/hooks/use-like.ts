import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

export type UseLikeParams = {
	initialValue?: boolean
	initialTotal?: number
	createLike: () => unknown
	deleteLike: () => unknown
}

export function useLike(params: UseLikeParams) {
	const { initialValue, initialTotal, ...services } = params
	const [totalLikes, setTotalLikes] = useState(initialTotal || 0)
	const [isLiked, setIsLiked] = useState(!!initialValue)

	function handleLike() {
		setIsLiked(true)
		setTotalLikes((prevState) => ++prevState)
	}

	function handleDislike() {
		setIsLiked(false)
		if (totalLikes > 0) {
			setTotalLikes((prevState) => --prevState)
		}
	}

	const handleLikeMutation = useMutation({
		mutationFn: async (liked: boolean) => {
			if (!liked) {
				await services.createLike()
				return
			}
			await services.deleteLike()
		},
		onMutate: (liked) => {
			if (!liked) {
				handleLike()
				return
			}
			if (liked) {
				handleDislike()
				return
			}
		},
		onError: (_, liked) => {
			if (!liked) {
				handleDislike()
				return
			}
			if (liked) {
				handleLike()
				return
			}
		},
	})

	useEffect(() => {
		setIsLiked(!!initialValue)
	}, [initialValue])

	useEffect(() => {
		setTotalLikes(initialTotal || 0)
	}, [initialTotal])

	return {
		handleLike: handleLikeMutation.mutate,
		likesCount: totalLikes,
		isLiked,
	}
}
