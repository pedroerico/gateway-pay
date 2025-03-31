<template>
	<v-container>
		<notification-snackbar
			v-model="showError"
			:message="errorMessage"
			color="error"
		></notification-snackbar>

		<v-row justify="center">
			<v-col cols="12" md="8">
				<payment-amount
					v-if="step === 1"
					@next="handleAmountSubmit"
				></payment-amount>

				<payment-method
					v-if="step === 2"
					@back="step = 1"
					@next="handleMethodSubmit"
				></payment-method>

				<credit-card-form
					v-if="step === 3 && paymentData.method === 'credit_card'"
					@back="step = 2"
					@submit="handleCreditCardSubmit"
					:initial-card="paymentData.card"
					:initial-customer="paymentData.customer"
				></credit-card-form>

				<payment-processing
					v-if="step === 4"
				></payment-processing>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePaymentStore } from '@/stores/paymentStore'
import PaymentAmount from '@/components/payment/PaymentAmount.vue'
import PaymentMethod from '@/components/payment/PaymentMethod.vue'
import CreditCardForm from '@/components/payment/CreditCardForm.vue'
import PaymentProcessing from '@/components/payment/PaymentProcessing.vue'
import NotificationSnackbar from '@/components/shared/NotificationSnackbar.vue'
import type { PaymentRequest } from '@/types/payment'

const router = useRouter()
const paymentStore = usePaymentStore()

const step = ref(1)
const showError = ref(false)
const errorMessage = ref('')
const pollingInterval = ref<number | null>(null)

const paymentData = ref<Partial<PaymentRequest>>({
	card: {
		number: '',
		holder_name: '',
		expiry_month: '',
		expiry_year: '',
		cvv: ''
	},
	customer: {
		name: '',
		cpf_cnpj: '',
		email: '',
		postal_code: '',
		address_number: '',
		phone: ''
	}
})

const handleAmountSubmit = (amount: number) => {
	paymentData.value.amount = amount
	step.value = 2
}

const handleMethodSubmit = (method: string) => {
	paymentData.value.method = method as 'credit_card' | 'pix' | 'boleto'

	if (method === 'credit_card') {
		step.value = 3
	} else {
		submitPayment()
	}
}

const handleCreditCardSubmit = (data: any) => {
	paymentData.value.card = data.card
	paymentData.value.customer = data.customer
	submitPayment(step.value)
}

const submitPayment = async (currentStep = 2) => {
	step.value = 4

	try {
		await paymentStore.createNewPayment(paymentData.value as PaymentRequest)

		if (paymentStore.currentPayment) {
			startPolling(paymentStore.currentPayment.id)
		}
	} catch (error) {
		showError.value = true
		errorMessage.value = error instanceof Error ? error.message : 'Erro ao processar pagamento'
		step.value = currentStep
	}
}

const startPolling = (paymentId: string) => {
	pollingInterval.value = window.setInterval(async () => {
		try {
			await paymentStore.fetchPayment(paymentId)

			if (paymentStore.currentPayment) {
				if (paymentStore.currentPayment.status === 'failed') {
					stopPolling()
					step.value = 3
					showErrorNotification('Pagamento recusado')
					return
				}
				if (paymentStore.currentPayment.status !== 'processing') {
					stopPolling()
					router.push({
						name: 'thank-you',
						params: {paymentId},
						query: {from: 'payment'}
					})
				}
			}
		} catch (error) {
			stopPolling()
			showErrorNotification('Erro com pagamento, verifique as informações')
		}
	}, 5000)
}

const showErrorNotification = (message: string) => {
	errorMessage.value = message
	showError.value = true
}

const stopPolling = () => {
	if (pollingInterval.value) {
		clearInterval(pollingInterval.value)
		pollingInterval.value = null
	}
}

onUnmounted(() => {
	stopPolling()
})
</script>