<template>
	<v-layout>
		<v-app-bar color="primary" prominent>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>Sistema de Pagamentos</v-toolbar-title>
			<v-spacer></v-spacer>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" temporary>
			<v-list>
				<v-list-item
					prepend-icon="mdi-home"
					title="Início"
					value="home"
					to="/"
				></v-list-item>
				<v-list-item
					prepend-icon="mdi-cash"
					title="Novo Pagamento"
					value="new-payment"
					to="/new-payment"
				></v-list-item>
				<v-list-item
					prepend-icon="mdi-format-list-bulleted"
					title="Lista de Pagamentos"
					value="payment-list"
					to="/payment-list"
				></v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<v-container fluid>
				<slot />
			</v-container>
		</v-main>
	</v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)
</script>