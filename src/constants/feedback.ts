export const FEEDBACK = {
	CREATE_RECOMMENDATIONS_LIST: {
		SUCCESS: {
			TITLE: 'List successfully created',
		},
	},
	CREATE_REVIEW: {
		SUCCESS: {
			TITLE: 'Review successfully created',
		},
	},
	ADD_MOVIE_TO_LIST: {
		SUCCESS: {
			TITLE: 'Movie successfully added to the list',
		},
	},
	CREATE_ACCOUNT: {
		SUCCESS: {
			TITLE: 'Account successfully created',
			DESCRIPTION: 'Enter the email you entered to verify it',
		},
	},
	SEND_EMAIL_VERIFICATION: {
		SUCCESS: {
			TITLE: 'Email sent successfully',
			DESCRIPTION: (email: string) =>
				`An email has been sent to ${email} with a link to verify your
					account`,
		},
	},
	DEFINE_USERNAME: {
		SUCCESS: {
			TITLE: 'Username was saved successfully',
			DESCRIPTION:
				'The name has been saved successfully. You can change it at any time',
		},
	},
}
