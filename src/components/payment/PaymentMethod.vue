<template>
	<v-card class="pa-4">
		<v-card-title>Selecione o método de pagamento</v-card-title>
		<v-card-text>
			<v-radio-group v-model="selectedMethod">
				<v-radio label="Cartão de Crédito" value="credit_card"></v-radio>
				<v-radio label="PIX" value="pix"></v-radio>
				<v-radio label="Boleto Bancário" value="boleto"></v-radio>
			</v-radio-group>
		</v-card-text>
		<v-card-actions>
			<v-btn color="secondary" @click="back">Voltar</v-btn>
			<v-spacer></v-spacer>
			<v-btn color="primary" @click="next" :disabled="!selectedMethod">
				Próximo
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['back', 'next'])

const selectedMethod = ref<string | null>(null)

const back = () => {
	emit('back')
}

const next = () => {
	emit('next', selectedMethod.value)
}
</script>