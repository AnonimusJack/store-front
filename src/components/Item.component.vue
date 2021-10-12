<template>
    <div class="centered item__container">
        <h3>{{ item.title }}</h3>
        <ImageCarousel v-bind:images="item.images" v-bind:itemName="item.title"></ImageCarousel>
        <h4>Price: {{ item.price }}₪</h4>
        <span>{{ item.desc }}</span>
    </div>
</template>

<script>
import ImageCarousel from '@/components/ImageCarousel.component.vue'

export default {
    name: 'Item',
    props: ['item'],
    components: {
        ImageCarousel
    }
}
</script>

<style lang="scss" scoped>
    .item__container {
        margin: 0.5rem;
        border: solid rgb(178, 233, 255) 0.1rem;
        border-radius: 0.3rem;
        background-color: rgb(216, 216, 216);
        box-shadow: 0 0.25rem 0.6rem black, 0 0.33rem 1.25rem 0 gray;
    }
</style>