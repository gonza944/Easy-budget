<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
  redirect: '/myBudgets'
})
</script>

<template>
  <h1 class="text-4xl font-bold">Welcome</h1>
</template>


