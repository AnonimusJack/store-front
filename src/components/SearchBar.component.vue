<template>
    <div class="centered" id="search-bar__header-container">
        <div class="centered" id="search-bar__placeholder">
            <div class="centered" id="seach-bar__container">
                <div class="centered" id="search-bar__input-container">
                    <input 
                    type="text" 
                    name="search" 
                    id="search-bar__input"
                    placeholder="חפשו.." 
                    v-model="searchQuery" 
                    @keyup="onSearchUpdated" 
                    @keydown="onEnterKeyDownSearch">
                    <button class="centered" id="search-bar__search-button" @click="onSearch">
                        <Icon icon="search"></Icon>
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
            this.onSearch();
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
@import '../styles/_colors.style';

.svg-icon {
    max-width: 2rem;
    max-height: 2rem;
}

#search-bar__header-container {
    position: relative;
    background-color: $dark-accent;
}

#search-bar__placeholder {
    align-self: center;
    margin-bottom: 0.8rem;
    min-height: 2rem;
    width: 90%;

    @media (min-width: 800px) {
        width: 60%;
        max-width: 50rem;
    }
}

#seach-bar__container {
    position: absolute;
    width: inherit;
    padding: 0.3rem 0.5rem;
    top: 0;
    background-color: $light-dark-accent;
    border: solid $light-dark-accent 3px;
    border-radius: 1.5rem;
}

#search-bar__input-container {
    flex-direction: row;
    width: 100%;
}

#search-bar__search-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-right: 0.3rem;

    svg {
        color: $primary-color;
    }
}

#search-bar__input {
    width: 90%;
    height: 100%;
    align-self: center;
    background-color: transparent;
    border: none;
    color: $light-accent;
}

.search-bar__results-container {
    margin-top: 0.2rem;
    padding-top: 0.2rem;
    border-top: #999 0.1rem solid;
    align-self: center;
    width: 100%;

    @media (min-width: 350px) {
        width: 98%;
    }

    @media (min-width: 399px) {
        width: 96%;
    }

    @media (min-width: 499px) {
        width: 95%;
    }

    span {
        color: $light-accent;
        &:hover {
            background-color: $primary-color;
        }
    }
}
</style>