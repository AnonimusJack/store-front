<template>
    <div class="centered header__container">
        <div class="centered" id="header">
            <router-link id="header__home-link" to="/">כלבו סנטר</router-link>
            <div id="header__side-bar-toggle-container" v-if="homePage" @click="toggleSidebar">
                <Icon id="header__side-bar-toggle" icon="bars"></Icon>
            </div>
            <Sidebar v-if="homePage && sidebarOpen" v-bind:toggle="toggleSidebar"></Sidebar>
        </div>
        <SearchBar v-if="homePage"></SearchBar>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.component.vue';
import SearchBar from "@/components/SearchBar.component.vue";

export default {
    name: 'Header',
    components: {
        Sidebar,
        SearchBar
    },
    data() {
        return {
            sidebarOpen: false
        }
    },
    computed: {
        homePage() {
            const currentRoute = this.$route.name;
            return currentRoute === 'Home';
        }
    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/_colors.style';

    .header__container {
        top: 0;
        position: sticky;
        width: 100%;
    }
    #header {
        position: relative;
        background-color: $dark-accent;
        z-index: 100;
    }
    #header__side-bar-toggle-container {
        width: 20%;
        height: 55%;
        position: absolute;
        top: 21%;
        right: 0.5%;
        z-index: 101;
        cursor: pointer;

        @media (min-width: 750px){
            width: 10%;
        }
    }
    #header__side-bar-toggle {
        color: $light-accent;
        width: 100%;
        height: 100%;
    }
    #header__home-link {
        color: $light-accent;
        display: flex;
        justify-self: center;
        align-self: center;
        font-size: 2.5rem;
        text-decoration: none;

        @media (min-width: 750px) {
            font-size: 4rem;
        }
    }
</style>