<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="12" md="8">
				<v-card class="pa-4 text-center">
					<v-card-title>Bem-vindo ao Sistema de Pagamentos</v-card-title>
					<v-card-text>
						<p>Clique no botão abaixo para iniciar um novo pagamento</p>
						<v-btn color="primary" size="large" to="/new-payment">
							Novo Pagamento
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
</script>