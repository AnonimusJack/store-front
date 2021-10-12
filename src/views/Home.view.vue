<template>
  <Category></Category>
  <SearchBar></SearchBar>
  <div class="main-items-grid__container">
    <Item
    class="main-items-grid__item"
    v-for="item in items"
    v-bind:key="item.id"
    v-bind:item="item"
    @click="onItemClick(item)"
    ></Item>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from "@/components/SearchBar.component.vue";
import Category from '@/components/Category.component.vue';
import Item from '@/components/Item.component.vue';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Item,
    Category,
    SearchBar
  },
  computed: {
    ...mapState({
      items: 'searchResult'
    })
  },
  methods: {
    ...mapMutations([
      'selectItem'
    ]),
    ...mapActions({
      search: 'searchResultFor'
    }),
    onItemClick(item) {
      this.selectItem(item);
      this.$router.push(`/${ item.id }`)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-items-grid__container {
  display: flex;
  flex-wrap: wrap;
  padding: 0.2rem;
}

.main-items-grid__item {
  flex-basis: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  @media (min-width: 600px) {
    flex-basis: 48%;
  }
  @media (min-width: 800px) {
    flex-basis: 23%;
  }
}
</style>