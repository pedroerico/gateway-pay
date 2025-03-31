<template>
	<v-card>
		<v-card-title>Lista de Pagamentos</v-card-title>
		<v-card-text>
			<v-table>
				<thead>
				<tr>
					<th>ID</th>
					<th>Valor</th>
					<th>Método</th>
					<th>Status</th>
					<th>Data</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="payment in payments" :key="payment.id">
					<td>{{ payment.id }}</td>
					<td>R$ {{ payment.amount }}</td>
					<td>{{ getMethodName(payment.method) }}</td>
					<td>
						<v-chip :color="getStatusColor(payment.status)">
							{{ getStatusName(payment.status) }}
						</v-chip>
					</td>
					<td>{{ formatDate(payment.created_at) }}</td>
				</tr>
				</tbody>
			</v-table>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import type { PaymentResponse } from '@/types/payment'

defineProps<{
	payments: PaymentResponse[]
}>()

const getMethodName = (method: string) => {
	switch (method) {
		case 'credit_card': return 'Cartão'
		case 'pix': return 'PIX'
		case 'boleto': return 'Boleto'
		default: return method
	}
}

const getStatusName = (status: string) => {
	switch (status) {
		case 'paid': return 'Pago'
		case 'pending': return 'Pendente'
		case 'failed': return 'Falhou'
		default: return status
	}
}

const getStatusColor = (status: string) => {
	switch (status) {
		case 'paid': return 'success'
		case 'pending': return 'warning'
		case 'failed': return 'error'
		default: return 'info'
	}
}

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleString()
}
</script>