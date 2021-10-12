<template>
    <div>
        <Item v-bind:item="selectedItem"></Item>
        <ContactForm v-bind:itemName="selectedItem.title"></ContactForm>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ContactForm from '@/components/ContactForm.component.vue';
import Item from '@/components/Item.component.vue';

export default {
    name: 'ItemPage',
    components: {
        Item,
        ContactForm
    },
    computed: {
        ...mapState([
            'selectedItem'
        ])
    }
}
</script>