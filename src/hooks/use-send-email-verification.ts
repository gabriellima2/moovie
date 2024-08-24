import { useState } from 'react'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

import { ERROR_MESSAGES } from '@/constants/error-messages'
import { FEEDBACK } from '@/constants/feedback'

const toast = makeToastAdapter()

export function useSendEmailVerification() {
	const [isSending, setIsSending] = useState(false)
	const { user, sendEmailVerification } = useAuthenticationStore()

	async function handleSendEmailVerification() {
		setIsSending(true)
		try {
			await sendEmailVerification()
			toast.show({
				type: 'success',
				title: FEEDBACK.SEND_EMAIL_VERIFICATION.SUCCESS.TITLE,
				description: FEEDBACK.SEND_EMAIL_VERIFICATION.SUCCESS.DESCRIPTION(
					user!.email!
				),
			})
		} catch (err) {
			toast.show({
				type: 'error',
				title: ERROR_MESSAGES.UNEXPECTED,
				description: (err as Error).message,
			})
		} finally {
			setIsSending(false)
		}
	}

	return {
		user,
		isSending,
		handleSendEmailVerification,
	}
}
