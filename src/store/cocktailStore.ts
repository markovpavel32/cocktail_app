import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

// Определяем хранилище с помощью Composition API
export const useCocktailStore = defineStore('cocktail', () => {
  // Реактивное состояние для хранения коктейлей
  const cocktails = ref<Record<string, any>>({});

  // Метод для загрузки данных коктейля
  const fetchCocktail = async (code: string) => {
    // Если коктейль уже есть в состоянии, возвращаем его
    if (cocktails.value[code]) {
      return cocktails.value[code];
    }

    // Выполняем запрос, если данных нет в кэше
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`
    );

    // Сохраняем полученные данные в кэш
    const cocktail = response.data.drinks ? response.data.drinks[0] : null;
    cocktails.value[code] = cocktail;

    return cocktail;
  };

  return {
    cocktails,
    fetchCocktail,
  };
});