import type { PaymentRequest, PaymentResponse, PaymentListResponse } from '@/types/payment'

const API_URL = import.meta.env.VITE_APP_API_URL

export const createPayment = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
  const response = await fetch(`${API_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData)
  })

  if (!response.ok) {
    throw new Error('Falha ao criar pagamenento')
  }

  return await response.json()
}

export const getPayment = async (id: string): Promise<PaymentResponse> => {
  const response = await fetch(`${API_URL}/payments/${id}`)

  if (!response.ok) {
    throw new Error('Falha ao consultar pagamento')
  }

  return await response.json()
}

export const getPayments = async (page = 1): Promise<PaymentListResponse> => {
  const response = await fetch(`${API_URL}/payments?page=${page}`)

  if (!response.ok) {
    throw new Error('Falha ao consultar pagamentos')
  }

  return await response.json()
}