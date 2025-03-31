export interface CardData {
  number: string
  holder_name: string
  expiry_month: string
  expiry_year: string
  cvv: string
}

export interface CustomerData {
  name: string
  cpf_cnpj: string
  email: string
  postal_code: string
  address_number: string
  phone: string
}

export interface PaymentRequest {
  amount: number
  method: 'credit_card' | 'pix' | 'boleto'
  card?: CardData
  customer?: CustomerData
}

export interface PaymentResponse {
  id: string
  status: 'processing' | 'pending' | 'paid' | 'failed'
  amount: number
  method: 'credit_card' | 'pix' | 'boleto'
  boleto_data?: {
    url: string
  }
  pix_data?: {
    payload: string
    encoded_image: string
  }
  created_at: string
}

export interface PaymentListResponse {
  data: PaymentResponse[]
  meta: {
    current_page: number
    total: number
    per_page: number
    last_page: number
    has_more_pages: boolean
  }
}