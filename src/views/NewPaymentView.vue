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

				<payment-method-type
					v-if="step === 2"
					@back="step = 1"
					@next="handleMethodSubmit"
				></payment-method-type>

				<credit-card-form
					v-if="step === 3 && paymentMethod === 'credit_card'"
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
import PaymentMethodType from '@/components/payment/PaymentMethod.vue'
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

const paymentData = ref({
	amount: null as number | null,
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

const handleMethodSubmit = (method: 'credit_card' | 'pix' | 'boleto') => {
	paymentMethod.value = method

	if (method === 'credit_card') {
		step.value = 3
	} else {
		submitPayment()
	}
}

const handleCreditCardSubmit = (data: { card: any; customer: any }) => {
	paymentData.value.card = data.card
	paymentData.value.customer = data.customer
	submitPayment()
}

const submitPayment = async () => {
	step.value = 4
	showError.value = false

	const payload: PaymentRequest = {
		amount: paymentData.value.amount!,
		method: paymentMethod.value
	}

	if (paymentMethod.value === 'credit_card') {
		payload.card = paymentData.value.card
		payload.customer = paymentData.value.customer
	}

	try {
		await paymentStore.createNewPayment(payload)

		if (paymentStore.currentPayment) {
			startPolling(paymentStore.currentPayment.id)
		}
	} catch (error) {
		handleError(error)
	}
}

const startPolling = (paymentId: string) => {
	pollingInterval.value = window.setInterval(async () => {
		try {
			await paymentStore.fetchPayment(paymentId)

			if (paymentStore.currentPayment) {
				if (paymentStore.currentPayment.status === 'failed') {
					stopPolling()
					handlePaymentFailed()
					return
				}

				if (paymentStore.currentPayment.status !== 'processing') {
					stopPolling()
					router.push({
						name: 'thank-you',
						params: { paymentId },
						query: { from: 'payment' }
					})
				}
			}
		} catch (error) {
			stopPolling()
			handleError(error)
		}
	}, 5000)
}

const handlePaymentFailed = () => {
	step.value = paymentMethod.value === 'credit_card' ? 3 : 2
	showError.value = true
	errorMessage.value = 'Pagamento recusado. Verifique os dados e tente novamente.'
}

const handleError = (error: unknown) => {
	step.value = paymentMethod.value === 'credit_card' ? 3 : 2
	showError.value = true
	errorMessage.value = error instanceof Error ? error.message : 'Erro ao processar pagamento'
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