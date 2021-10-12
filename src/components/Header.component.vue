<template>
    <div class="centered">
        <router-link id="header__home-link" to="/">כלבו סנטר</router-link>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style lang="scss" scoped>
    #header__home-link {
        display: flex;
        justify-self: center;
        align-self: center;
        font-size: 300%;
        text-decoration: none;

        @media (min-width: 750px) {
            font-size: 500%;
        }
    }
</style>