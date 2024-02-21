import Toast from 'react-native-toast-message'
import { ToastAdapter, ToastShowParams } from '../toast.adapter'

class ToastAdapterImpl implements ToastAdapter {
	show(params: ToastShowParams) {
		const { title, description, ...rest } = params
		Toast.show({
			position: 'bottom',
			...rest,
			text1: title,
			text2: description,
			autoHide: true,
			swipeable: true,
			text1Style: {
				fontSize: 16,
				fontFamily: 'Inter_500Medium',
				marginBottom: 4,
			},
			text2Style: {
				fontSize: 14,
				fontFamily: 'Inter_400Regular',
			},
		})
	}
}

export const makeToastAdapter = () => new ToastAdapterImpl()
