<template>
	<v-card class="pa-4">
		<v-card-title>Informe o valor do pagamento</v-card-title>
		<v-card-text>
			<v-text-field
				v-model="amount"
				label="Valor"
				type="number"
				step="0.01"
				prefix="R$"
				:rules="amountRules"
				required
			></v-text-field>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
				color="primary"
				@click="nextStep"
				:disabled="!isValid"
			>
				Próximo
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['next'])

const amount = ref<number | null>(null)

const amountRules = [
	(v: number | null) => !!v || 'Valor é obrigatório',
	(v: number) => v > 0 || 'Valor deve ser maior que zero'
]

const isValid = computed(() => {
	return amount.value !== null && amount.value > 0
})

const nextStep = () => {
	emit('next', amount.value)
}
</script>