import { ref } from 'vue'

const useTags = docs => {
	const tags = ref([])
	const tagSet = new Set() // Create set object

	docs.forEach(doc => {
		doc.tags.forEach(tag => tagSet.add(tag))
	})

	tags.value = [...tagSet]

	return { tags }
}

export default useTags
