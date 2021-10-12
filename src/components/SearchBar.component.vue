<template>
    <div class="centered">
        <div class="centered" id="seach-bar__container">
            <input type="text" name="search" id="search-bar__input" v-model="searchQuery" @keyup="onSearchUpdated" @keydown="onEnterKeyDownSearch">
            <button class="centered" id="search-bar__search-button" @click="onSearch">
                <svg class="svg-icon search-icon" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7">
                    <title id="title">Search Icon</title>
                    <desc id="desc">A magnifying glass icon.</desc>
                    <g class="search-path" fill="none" stroke="#848F91">
                        <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4"/>
                        <circle cx="8" cy="8" r="7"/>
                    </g>
                </svg>
            </button>
        </div>
        <div class="centered search-bar__results-container" v-if="showSearchResults">
            <span 
            class="search-result" 
            v-for="item in searchResults" 
            v-bind:key="item.id"
            @click="onSearchItemClick(item.title)">
                    {{ item.title }}
            </span>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'SearchBar',
    data() {
        return {
            searchResults: [],
            searchQuery: '',
            showSearchResults: false
        }
    },
    methods: {
        ...mapActions({
            search: 'searchResultFor'
        }),
        getSearchBarResultsFor(query) {
            return this.$store.getters.searchBarResults(query);
        },
        onEnterKeyDownSearch(e) {
            if (e.keyCode === 13)
            {
                this.onSearch();
                this.closeSearchResults();
            }
        },
        onSearch() {
            this.search({ query: this.searchQuery, type: 'Search' });
            this.closeSearchResults();
        },
        onSearchUpdated(e) {
            if (e.keyCode === 8 || e.keyCode === 27)
            {
                console.log('Closing?');
                this.closeSearchResults();
            }
            else if (this.searchQuery != null && this.searchQuery.length > 2 && e.keyCode !== 13)
            {
                this.searchResults = this.getSearchBarResultsFor(this.searchQuery);
                this.openSearchResults();
            }
            
        },
        onSearchItemClick(title) {
            this.searchQuery = title;
            this.closeSearchResults();
        },
        closeSearchResults() {
            this.showSearchResults = false;
        },
        openSearchResults() {
            this.showSearchResults = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.svg-icon {
    max-width: 2rem;
    max-height: 2rem;
}

#seach-bar__container {
    flex-direction: row;
    column-gap: 2%;
}

#search-bar__search-button {
    max-width: 15%;

    @media (min-width: 800px) {
        max-width: 5%;
    }
}

#search-bar__input {
    width: 60%;
    height: 2rem;
    align-self: center;

    @media (min-width: 800px) {
        height: 100%;
    }
}

.search-bar__results-container {
    width: 70%;
    align-self: center;
}
</style>