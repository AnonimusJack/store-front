<template>
    <div class="centered item-page">
        <div class="centered item-page__container">
            <Item v-bind:item="selectedItem"></Item>
            <ContactForm v-bind:itemName="selectedItem.title"></ContactForm>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ContactForm from '@/components/ContactForm.component.vue';
import Item from '@/components/Item.component.vue';

export default {
    name: 'ItemPage',
    props: ['id'],
    components: {
        Item,
        ContactForm
    },
    mounted() {
        this.setItemId(this.id);
    },
    computed: {
        ...mapState([
            'selectedItem'
        ])
    },
    methods: {
        ...mapMutations([
            'setItemId'
        ])
    }
}
</script>

<style lang="scss" scoped>

.item-page {
    justify-content: start;
    width: 100%;
    height: 100vh;
}
.item-page__container {
    align-self: center;
    max-width: 25rem;
}
</style>