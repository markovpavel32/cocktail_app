<template>
  <div v-if="cocktail" class="cocktail-page">
    <div class="content-container">
      <div class="title">{{ cocktail.strDrink }}</div>
      <div class="paragraph">
        <p><strong>Category:</strong> {{ cocktail.strCategory }}</p>
        <p><strong>Type:</strong> {{ cocktail.strAlcoholic }}</p>
        <p><strong>Glass:</strong> {{ cocktail.strGlass }}</p>
      </div>
      <div class="heading">Instructions</div>
      <p class="paragraph">{{ cocktail.strInstructions }}</p>
      <div class="heading">Ingredients</div>
      <ul class="paragraph">
        <li v-for="(ingredient, index) in ingredients" :key="index">
          {{ ingredient }}
        </li>
      </ul>
    </div>
    <div class="img-container">
      <img :src="cocktail.strDrinkThumb" alt="Cocktail" loading="lazy" class="img" />
    </div>
  </div>
  <div v-else class="loading">
    Loading...
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCocktailStore } from '../store/cocktailStore';

// Получаем параметры маршрута и состояние из Pinia
const route = useRoute();
const store = useCocktailStore();

// Реактивная переменная для текущего коктейля
const cocktail = ref(null);

// Функция загрузки данных коктейля
const loadCocktail = async (cocktailCode: string) => {
  cocktail.value = null; // Показываем "Loading..."
  cocktail.value = await store.fetchCocktail(cocktailCode);
};

// Загружаем данные при монтировании
onMounted(() => {
  loadCocktail(route.meta.cocktailCode as string);
});

// Следим за изменением маршрута
watch(
  () => route.meta.cocktailCode,
  (newCocktail) => {
    if (newCocktail) {
      loadCocktail(newCocktail as string);
    }
  }
);

// Вычисляем список ингредиентов
const ingredients = computed(() => {
  if (!cocktail.value) return [];
  return Object.keys(cocktail.value)
    .filter((key) => key.startsWith('strIngredient') && cocktail.value[key])
    .map((key) => {
      const measure = cocktail.value[`strMeasure${key.match(/\d+/)[0]}`];
      return `${measure || ''} ${cocktail.value[key]}`.trim();
    });
});
</script>

<style scoped>
.cocktail-page {
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.content-container {
  max-width: 60%;
  padding: 1rem;
}

.img-container {
  max-width: 40%;
  padding-top: 1rem;
}
.title {
  margin-bottom: 1rem;
}

.heading {
  margin-bottom: 1rem;
}

.paragraph {
  margin-bottom: 1rem;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 2rem;
}
</style>