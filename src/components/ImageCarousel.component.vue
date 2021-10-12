<template>
<div class="centered image-carousel__container">
    <img class="image-carousel__image" v-bind:src="currentImage" v-bind:alt="`${ itemName }-Image-${ currentIndex }`">
    <div class="centered" id="image-carousel__buttons">
        <button class="image-carousel__button" @click="onPreviousImage">הקודם</button>
        <button class="image-carousel__button" @click="onNextImage">הבא</button>
    </div>    
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
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1276px-Placeholder_view_vector.svg.png';
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
        onNextImage(e) {
            e.stopPropagation();
            this.moveImage(1);
        },
        onPreviousImage(e) {
            e.stopPropagation();
            this.moveImage(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/_colors.style';

.image-carousel__container {
    width: 100%;
}
.image-carousel__image {
    width: 100%;
    height: 10rem;
}

.image-carousel__button {
    width: 50%;
    border: solid $dark-accent 0.1rem;
    color: $light-accent;
    background-color: $primary-color;
}

#image-carousel__buttons {
    flex-direction: row;
    justify-content: space-evenly;
}
</style>