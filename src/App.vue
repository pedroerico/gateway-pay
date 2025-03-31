<template>
	<v-app>
		<default-layout>
			<router-view />
		</default-layout>
	</v-app>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>