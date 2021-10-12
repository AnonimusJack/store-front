<template>
    <div class="home-categories__container">
        <span class="home-categories__item" @click="onCategorySelected('הכל')">הכל</span>
        <span
        class="home-categories__item"
        v-for="category in categories"
        v-bind:key="category.id"
        @click="onCategorySelected(category.name)">
            {{ category.name }}
        </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Category',
    computed: {
        categories() {
            return this.$store.getters.categories;
        }
    },
    methods: {
        ...mapActions({
            search: 'searchResultFor'
        }),
        onCategorySelected(name) {
            this.search({ query: name, type: 'Filter'});
        }
    }
}
</script>

<style lang="scss" scoped>
.home-categories__container {
  overflow: auto;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.home-categories__item {
  margin: 0.1rem;
  padding: 0.2rem;
  border-radius: 0.5rem;
  border: solid blue 0.1rem;
}
</style>