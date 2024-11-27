<template>
  <div id="app" class="app-container">
    <!-- Sidebar Menu -->
    <Menu class="menu" />
    <!-- Dynamic Route Content -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from './components/Menu.vue';
</script>

<style lang="scss">
.app-container {
  display: flex;
  max-width: 1024px;
  margin: 0 auto;
  min-height: 100vh;
}

.menu {
  margin-top: 2rem;
}

.content {
  width: calc(100% - 100px)
}
</style>