import { ActivityIndicator, Image, View } from 'react-native'
import { useGetMovieByName } from '@/hooks/use-get-movie-by-name'

export type MovieImageByNameProps = {
	width?: number
	position?: number
	name: string
}

const DEFAULT_SPACING = 19
const BASE_Z_INDEX = 10

export function MovieImageByName(props: MovieImageByNameProps) {
	const { width = 120, position = 0, name } = props
	const { data, error, isLoading } = useGetMovieByName(name)
	const leftSpacing = Math.abs(position * DEFAULT_SPACING)
	const zIndex = BASE_Z_INDEX * position
	return (
		<>
			{!data && isLoading && !error && (
				<ActivityIndicator className="self-center" />
			)}
			{!data && isLoading && error && (
				<View
					className={`bg-gray-100 border-2 border-black/5 rounded-lg  -z-[${zIndex}] absolute left-[${leftSpacing}px] w-[${width}] h-full`}
				/>
			)}
			{data && !isLoading && !error && (
				<Image
					source={{ uri: data.Poster }}
					width={width}
					className={`absolute rounded-lg h-full -z-[${zIndex}] left-[${leftSpacing}px]`}
				/>
			)}
		</>
	)
}
