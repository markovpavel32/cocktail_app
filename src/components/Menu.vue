<template>
  <nav class="menu">
    <ul class="no-bullet">
      <li
        v-for="item in menuItems"
        :key="item"
        class="capitalize"
        :class="{ active: item === activeItem }"
      >
        <router-link
          :to="`/${item}`"
        >
          {{ item }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { COCKTAIL_CODES } from '../constants';

// Список пунктов меню
const menuItems = ref(COCKTAIL_CODES);

// Получаем активный пункт меню из маршрута
const route = useRoute();
const activeItem = computed(() => route.meta.cocktailCode);
</script>

<style scoped>
.menu {
  display: flex;
}

.menu li.active {
  background-color: #ddd;
  border-top: 2px solid #cfcfcf;
  border-bottom: 2px solid #cfcfcf;
  font-weight: bold;
}

.menu li {
  width: 100%;
  padding: 0.5rem;
}
</style>