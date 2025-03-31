<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<payment-list :payments="payments"></payment-list>
				<pagination-controls
					v-if="meta"
					:current-page="meta.current_page"
					:total-pages="meta.last_page"
					@page-change="fetchPayments"
				></pagination-controls>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { usePaymentStore } from '@/stores/paymentStore'
import PaymentList from '@/components/shared/PaymentList.vue'
import PaginationControls from '@/components/shared/PaginationControls.vue'

const paymentStore = usePaymentStore()

const payments = computed(() => paymentStore.paymentList?.data || [])
const meta = computed(() => paymentStore.paymentList?.meta)

const fetchPayments = (page = 1) => {
	paymentStore.fetchPayments(page)
}

onMounted(() => {
	fetchPayments()
})
</script>