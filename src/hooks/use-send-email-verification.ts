import { useState } from 'react'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

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
				title: 'Email sent successfully',
				description: `An email has been sent to ${user!.email} with a link to verify your
					account`,
			})
		} catch (err) {
			toast.show({
				type: 'error',
				title: 'An error has occurred',
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
