import { createRouter, createWebHistory } from 'vue-router';
import CocktailPage from '../pages/CocktailPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';
import { COCKTAIL_CODES } from '../constants';

const routes = [
  { path: '/', redirect: '/margarita' },
  ...COCKTAIL_CODES.map(cocktailCode => {
    return { path: `/${cocktailCode}`, component: CocktailPage, props: true, params: { cocktailCode }, meta: { cocktailCode } }
  }),
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;