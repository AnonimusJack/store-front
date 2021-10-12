<template>
    <div class="centered card">
        <h3>{{ item.title }}</h3>
        <ImageCarousel id="item_image-carousel" v-bind:images="item.images" v-bind:itemName="item.title"></ImageCarousel>
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
    h4 {
        text-align: center;
    }

    h3 {
        text-align: center;
        font-size: 1rem;
        height: 3rem;
    }
</style>