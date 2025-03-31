<template>
	<div class="text-center mt-4">
		<v-pagination
			v-model="currentPage"
			:length="totalPages"
			:total-visible="7"
			@update:modelValue="onPageChange"
		></v-pagination>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	currentPage: number
	totalPages: number
}>()

const emit = defineEmits(['page-change'])

const currentPage = ref(props.currentPage)

const onPageChange = (page: number) => {
	emit('page-change', page)
}
</script>