<template>
	<v-card class="pa-4">
		<v-card-title>Informações do Cartão</v-card-title>
		<v-card-text>
			<v-text-field
				v-model="card.number"
				label="Número do Cartão"
				:rules="cardNumberRules"
				required
			></v-text-field>

			<v-text-field
				v-model="card.holder_name"
				label="Nome no Cartão"
				:rules="holderNameRules"
				required
			></v-text-field>

			<v-row>
				<v-col cols="6">
					<v-text-field
						v-model="card.expiry_month"
						label="Mês de Expiração"
						:rules="expiryMonthRules"
						required
					></v-text-field>
				</v-col>
				<v-col cols="6">
					<v-text-field
						v-model="card.expiry_year"
						label="Ano de Expiração"
						:rules="expiryYearRules"
						required
					></v-text-field>
				</v-col>
			</v-row>

			<v-text-field
				v-model="card.cvv"
				label="CVV"
				:rules="cvvRules"
				required
			></v-text-field>
		</v-card-text>

		<v-card-title class="mt-4">Informações do Cliente</v-card-title>
		<v-card-text>
			<v-text-field
				v-model="customer.name"
				label="Nome Completo"
				:rules="nameRules"
				required
			></v-text-field>

			<v-text-field
				v-model="customer.email"
				label="E-mail"
				:rules="emailRules"
				required
			></v-text-field>

			<v-text-field
				v-model="customer.cpf_cnpj"
				label="CPF/CNPJ"
				:rules="cpfCnpjRules"
				required
			></v-text-field>

			<v-text-field
				v-model="customer.postal_code"
				label="CEP"
				:rules="postalCodeRules"
				required
			></v-text-field>

			<v-text-field
				v-model="customer.address_number"
				label="Número"
				:rules="addressNumberRules"
				required
			></v-text-field>

			<v-text-field
				v-model="customer.phone"
				label="Telefone"
				:rules="phoneRules"
				required
			></v-text-field>
		</v-card-text>

		<v-card-actions>
			<v-btn color="secondary" @click="back">Voltar</v-btn>
			<v-spacer></v-spacer>
			<v-btn color="primary" @click="submit" :disabled="!isValid">
				Finalizar Pagamento
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CardData, CustomerData } from '@/types/payment'

const emit = defineEmits(['back', 'submit'])

const props = defineProps({
	initialCard: {
		type: Object as () => CardData,
		default: () => ({
			number: '',
			holder_name: '',
			expiry_month: '',
			expiry_year: '',
			cvv: ''
		})
	},
	initialCustomer: {
		type: Object as () => CustomerData,
		default: () => ({
			name: '',
			cpf_cnpj: '',
			email: '',
			postal_code: '',
			address_number: '',
			phone: ''
		})
	}
})

const card = ref<CardData>({ ...props.initialCard })
const customer = ref<CustomerData>({ ...props.initialCustomer })

watch(() => props.initialCard, (newVal) => {
	card.value = { ...newVal }
}, { deep: true })

watch(() => props.initialCustomer, (newVal) => {
	customer.value = { ...newVal }
}, { deep: true })

const cardNumberRules = [(v: string) => !!v || 'Número do cartão é obrigatório']
const holderNameRules = [(v: string) => !!v || 'Nome no cartão é obrigatório']
const expiryMonthRules = [(v: string) => !!v || 'Mês de expiração é obrigatório']
const expiryYearRules = [(v: string) => !!v || 'Ano de expiração é obrigatório']
const cvvRules = [(v: string) => !!v || 'CVV é obrigatório']
const nameRules = [(v: string) => !!v || 'Nome é obrigatório']
const emailRules = [(v: string) => !!v || 'E-mail é obrigatório']
const cpfCnpjRules = [(v: string) => !!v || 'CPF/CNPJ é obrigatório']
const postalCodeRules = [(v: string) => !!v || 'CEP é obrigatório']
const addressNumberRules = [(v: string) => !!v || 'Número é obrigatório']
const phoneRules = [(v: string) => !!v || 'Telefone é obrigatório']

const isValid = computed(() => {
	return (
		card.value.number &&
		card.value.holder_name &&
		card.value.expiry_month &&
		card.value.expiry_year &&
		card.value.cvv &&
		customer.value.name &&
		customer.value.email &&
		customer.value.cpf_cnpj &&
		customer.value.postal_code &&
		customer.value.address_number &&
		customer.value.phone
	)
})

const back = () => {
	emit('back')
}

const submit = () => {
	emit('submit', {
		card: card.value,
		customer: customer.value
	})
}
</script>