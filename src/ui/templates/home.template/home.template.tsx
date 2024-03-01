import { SectionList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'

import { Typography } from '../../atoms/typography'
import { Header } from '../../components/header'

import { sections } from './helpers/sections'

export function HomeTemplate() {
	return (
		<SectionList
			ListHeaderComponent={() => (
				<Header.Root>
					<Header.Title>Let&apos;s start exploring</Header.Title>
					<Link href="/search" asChild>
						<Feather name="search" size={20} color="#000" />
					</Link>
				</Header.Root>
			)}
			sections={sections}
			keyExtractor={(item) => (item as { id: string }).id}
			renderItem={({ section: { renderItem }, item }) => renderItem({ item })}
			renderSectionHeader={({ section: { title } }) => (
				<Typography.Title>{title}</Typography.Title>
			)}
		/>
	)
}
