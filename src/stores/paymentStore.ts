import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PaymentResponse, PaymentListResponse } from '@/types/payment'
import { createPayment, getPayment, getPayments } from '@/services/paymentService'

export const usePaymentStore = defineStore('payment', () => {
  const currentPayment = ref<PaymentResponse | null>(null)
  const paymentList = ref<PaymentListResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const createNewPayment = async (paymentData: any) => {
    loading.value = true
    error.value = null
    try {
      currentPayment.value = await createPayment(paymentData)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchPayment = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      currentPayment.value = await getPayment(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchPayments = async (page = 1) => {
    loading.value = true
    error.value = null
    try {
      paymentList.value = await getPayments(page)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    currentPayment,
    paymentList,
    loading,
    error,
    createNewPayment,
    fetchPayment,
    fetchPayments
  }
})