import { TextProps } from 'react-native'
import { Typography } from './typography'

export type ErrorTextProps = Omit<TextProps, 'children'> & {
	text: string
}

export function ErrorText(props: ErrorTextProps) {
	const { text, ...rest } = props
	return <Typography.Small {...rest}>{text}</Typography.Small>
}
