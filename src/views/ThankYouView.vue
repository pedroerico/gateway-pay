<!-- src/views/ThankYouView.vue -->
<template>
	<v-container class="fill-height">
		<v-row justify="center">
			<v-col cols="12" md="8" class="text-center">
				<v-card class="pa-6">
					<v-icon color="success" size="64">mdi-check-circle</v-icon>
					<h1 class="text-h4 mt-4">Pagamento Processado!</h1>

					<v-divider class="my-6"></v-divider>

					<div v-if="payment" class="text-left">
						<p><strong>ID:</strong> {{ payment.id }}</p>
						<p><strong>Valor:</strong> R$ {{ payment.amount.toFixed(2) }}</p>
						<p><strong>Status:</strong>
							<v-chip :color="getStatusColor(payment.status)" class="ml-2">
								{{ getStatusText(payment.status) }}
							</v-chip>
						</p>
						<p><strong>Método:</strong> {{ getMethodText(payment.method) }}</p>

						<div v-if="payment.method === 'boleto' && payment.boleto_data" class="mt-4">
							<v-btn color="primary" :href="payment.boleto_data.url" target="_blank">
								Visualizar Boleto
							</v-btn>
						</div>

						<div v-if="payment.method === 'pix' && payment.pix_data" class="mt-4">
							<v-img :src="`data:image/png;base64,${payment.pix_data.encoded_image}`"
							       max-width="200" class="mx-auto"></v-img>
							<v-textarea :model-value="payment.pix_data.payload" readonly class="mt-4"></v-textarea>
							<v-btn color="primary" @click="copyPixCode" class="mt-2">
								Copiar Código PIX
							</v-btn>
						</div>
					</div>

					<v-btn to="/" color="primary" class="mt-6">Voltar ao Início</v-btn>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePaymentStore } from '@/stores/paymentStore'

const router = useRouter()
const paymentStore = usePaymentStore()

const payment = ref(paymentStore.currentPayment)

const getStatusColor = (status: string) => {
	switch (status) {
		case 'paid': return 'success'
		case 'pending': return 'warning'
		case 'failed': return 'error'
		default: return 'info'
	}
}

const getStatusText = (status: string) => {
	switch (status) {
		case 'paid': return 'Pago'
		case 'pending': return 'Pendente'
		case 'failed': return 'Falhou'
		default: return status
	}
}

const getMethodText = (method: string) => {
	switch (method) {
		case 'credit_card': return 'Cartão de Crédito'
		case 'pix': return 'PIX'
		case 'boleto': return 'Boleto Bancário'
		default: return method
	}
}

const copyPixCode = () => {
	if (payment.value?.method === 'pix' && payment.value.pix_data?.payload) {
		navigator.clipboard.writeText(payment.value.pix_data.payload)
	}
}

onMounted(() => {
	if (!payment.value) {
		router.push('/')
	}
})
</script>