import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state() {
    return {
      items: [],
      searchResult: [],
      selectedItemId: null,
      selectedItem: { id: 0, title: '', images: [], desc: '', price: '' },
      categories: new Set()
    }
  },
  mutations: {
    initStore(state, json) {
      state.items = json;
      state.searchResult = json;
      state.items.forEach(item => state.categories.add(item.store_category_title));
    },
    updateSearchResult(state, items) {
      state.searchResult = items;
    },
    resetSearchResult(state) {
      state.searchResult = state.items;
    },
    selectItem(state, item) {
      state.selectedItem = item;
    },
    selectItemById(state, id) {
      state.selectedItem = state.items.find(item => item.id === id);
    },
    setItemId(state, id) {
      state.selectedItemId = id;
    }
  },
  actions: {
    initStore({ commit, state }) {
      axios.get(process.env.VUE_APP_API_URL)
      .then(result => {
        commit('initStore', result.data);
        if (state.selectedItemId != null)
          commit('selectItemById', state.selectedItemId);
      })
      .catch(error => {
        console.error(error);
      })
    },
    searchResultFor({ dispatch, state }, { query, type }) {
      const update = itemsValidationFor(type, query);
      const searchItems = update ? state.items.filter(itemsFilterFunctionFor(type, query)) : null;
      dispatch('handleSearchResult', { searchItems, update });
    },
    handleSearchResult({ commit }, { searchItems, update }) {
      if (update)        
        commit('updateSearchResult', searchItems);
      else
        commit('resetSearchResult');
    }
  },
  getters: {
    searchBarResults: (state) => (query) => {
      const result = state.items.filter(item => item.title.includes(query)).map(item => { return { id: item.id, title: item.title } });
      return result.length > 5 ? result.slice(0, 5) : result;
    },
    categories(state) {
      return [...state.categories].sort((a,b) => b.localeCompare(a)).map((category, index) => { return { id: index, name: category } })
    }
  }
})

        //Private Store Helper Methods
const itemsFilterFunctionFor = (type, query) => {
  switch (type) 
  {
    case 'Filter':
      return item => item.store_category_title === query;
    case 'Search':
      return item => item.title.includes(query);
    default:
      throw new Error('Store Filter Function Error: Invalid Type');
  }
};

const itemsValidationFor = (type, query) => {
  switch (type) 
  {
    case 'Filter':
      return query != null && query !== 'הכל';
    case 'Search':
      return query != null;
    default:
      throw new Error('Store Filter Function Error: Invalid Type');
  }
};