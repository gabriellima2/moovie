import { HomeProvider } from '@/ui/templates/home.template/contexts/home.context'
import { HomeTemplate } from '@/ui/templates/home.template'

export default function Home() {
	return (
		<HomeProvider>
			<HomeTemplate />
		</HomeProvider>
	)
}
