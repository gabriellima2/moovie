import { firebaseConfig } from '@/config/firebase'

export function isFirebaseConfigured(): boolean {
	return Boolean(
		firebaseConfig.apiKey &&
			firebaseConfig.authDomain &&
			firebaseConfig.projectId &&
			firebaseConfig.appId
	)
}
