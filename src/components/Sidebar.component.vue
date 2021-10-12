<template>
    <div class="side-bar__background" @click="toggle">
        <div class="home-categories__container" @click="(e) => e.stopPropagation()">
            <div id="side-bar__close-icon-container" @click="toggle">
                <Icon icon="times"></Icon>
            </div>
            <h3>קטגוריות</h3>
            <span class="home-categories__item" @click="onCategorySelected('הכל')">הכל</span>
            <span
            class="home-categories__item"
            v-for="category in categories"
            v-bind:key="category.id"
            @click="onCategorySelected(category.name)">
                {{ category.name }}
            </span>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Sidebar',
    props: ['toggle'],
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
@import '../styles/_colors.style';

h3 {
    margin: 0;
    font-size: 2rem;
    text-align: center;
}
#side-bar__close-icon-container {
        width: 1.7rem;
        height: 1.7rem;
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
        cursor: pointer;

    svg {
        color: $dark-accent;
        width: 100%;
        height: 100%;
    }
}
.home-categories__container {
    position: relative;
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.7rem;
    padding-top: 3rem;
    overflow-y: scroll;
    background-color: $light-accent;
    z-index: 400;

    span:last-child {
        border: none;
    }

    @media (min-width: 750px) {
        width: 18rem;
    }
}

.home-categories__item {
    display: block;
    padding: 0.2rem;
    font-size: 1.5rem;
    border-bottom: #999 0.1rem solid;
    margin-bottom: 0.2rem;
}

.side-bar__background {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(14, 14, 14, 0.671);
    z-index: 400;
}
</style>