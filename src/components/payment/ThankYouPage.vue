<template>
	<v-card class="pa-4">
		<v-card-title class="text-center">Obrigado pelo seu pagamento!</v-card-title>

		<v-card-text v-if="payment.status === 'paid'" class="text-center">
			<v-icon color="success" size="64">mdi-check-circle</v-icon>
			<p class="text-h5 mt-4">Pagamento aprovado!</p>
			<p>ID: {{ payment.id }}</p>
			<p>Valor: R$ {{ payment.amount }}</p>
			<p>Método: {{ methodName }}</p>
		</v-card-text>

		<v-card-text v-else-if="payment.status === 'pending'" class="text-center">
			<template v-if="payment.method === 'boleto'">
				<p class="text-h5">Boleto gerado com sucesso!</p>
				<p>ID: {{ payment.id }}</p>
				<p>Valor: R$ {{ payment.amount }}</p>
				<v-btn
					color="primary"
					:href="payment.boleto_data?.url"
					target="_blank"
					class="mt-4"
				>
					Visualizar Boleto
				</v-btn>
			</template>

			<template v-else-if="payment.method === 'pix'">
				<p class="text-h5">Pagamento via PIX</p>
				<p>ID: {{ payment.id }}</p>
				<p>Valor: R$ {{ payment.amount }}</p>

				<v-img
					v-if="payment.pix_data?.encoded_image"
					:src="`data:image/png;base64,${payment.pix_data.encoded_image}`"
					max-width="200"
					class="mx-auto my-4"
				></v-img>

				<v-textarea
					v-if="payment.pix_data?.payload"
					:model-value="payment.pix_data.payload"
					readonly
					outlined
					class="mt-4"
				></v-textarea>

				<v-btn
					color="primary"
					@click="copyPixPayload"
					class="mt-2"
				>
					Copiar Código PIX
				</v-btn>
			</template>
		</v-card-text>

		<v-card-text v-else class="text-center">
			<v-icon color="error" size="64">mdi-alert-circle</v-icon>
			<p class="text-h5 mt-4">Pagamento recusado</p>
			<p>ID: {{ payment.id }}</p>
		</v-card-text>

		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="primary" @click="goHome">Voltar ao início</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PaymentResponse } from '@/types/payment'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
	payment: PaymentResponse
}>()

const methodName = computed(() => {
	switch (props.payment.method) {
		case 'credit_card': return 'Cartão de Crédito'
		case 'pix': return 'PIX'
		case 'boleto': return 'Boleto Bancário'
		default: return props.payment.method
	}
})

const copyPixPayload = () => {
	if (props.payment.pix_data?.payload) {
		navigator.clipboard.writeText(props.payment.pix_data.payload)
	}
}

const goHome = () => {
	router.push('/')
}
</script>