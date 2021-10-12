<template>
<div class="image-carousel__container">
    <img class="image-carousel__image" v-bind:src="currentImage" v-bind:alt="`${ itemName }-Image-${ currentIndex }`">
    <button class="image-carousel__button" id="right" @click="onPreviousImage">הקודם</button>
    <button class="image-carousel__button" id="left" @click="onNextImage">הבא</button>
</div>
</template>

<script>
export default {
    name: 'ImageCarousel',
    props: ['images', 'itemName'],
    data() {
        return {
            currentIndex: 0
        }
    },
    computed: {
        currentImage() {
            const localImage = this.images[this.currentIndex];
            if (localImage != null)
                return localImage.url;
            return '';
        }
    },
    methods: {
        moveImage(directionalValue) {
            const newIndex = this.currentIndex + directionalValue;
            switch (newIndex) {
                case -1:
                    this.currentIndex = (this.images.length - 1);
                    break;
                case this.images.length:
                    this.currentIndex = 0;
                    break;
                default:
                    this.currentIndex = newIndex;
                    break;
            }
        },
        onNextImage() {
            this.moveImage(1);
        },
        onPreviousImage() {
            this.moveImage(-1);
        }
    }
}
</script>

<style lang="scss" scoped>

.image-carousel__image {
    max-width: 70%;
    max-height: 70%;

    @media (min-width: 800px) {
        max-width: 50%;
        max-height: 50%;
    }
}

.image-carousel__button {
    border: solid white 0.2rem;
    border-radius: 10rem;
    opacity: 40%;
}

#left {
    position: relative;
    left: 0px;
}
</style>