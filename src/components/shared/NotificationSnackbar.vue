<template>
	<v-snackbar
		v-model="show"
		:color="color"
		:timeout="timeout"
	>
		{{ message }}

		<template v-slot:actions>
			<v-btn
				variant="text"
				@click="show = false"
			>
				Fechar
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
	modelValue: boolean
	message: string
	color?: string
	timeout?: number
}>()

const emit = defineEmits(['update:modelValue'])

const show = ref(props.modelValue)
const color = ref(props.color || 'success')
const timeout = ref(props.timeout || 6000)

watch(() => props.modelValue, (val) => {
	show.value = val
})

watch(show, (val) => {
	emit('update:modelValue', val)
})
</script>