declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production'
			EXPO_PUBLIC_API_KEY: string
			EXPO_PUBLIC_AUTH_DOMAIN: string
			EXPO_PUBLIC_PROJECT_ID: string
			EXPO_PUBLIC_STORAGE_BUCKET: string
			EXPO_PUBLIC_MESSAGING_SENDER_ID: string
			EXPO_PUBLIC_APP_ID: string
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
