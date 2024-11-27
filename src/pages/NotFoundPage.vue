<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFoundPage',
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 2rem;
}
</style>