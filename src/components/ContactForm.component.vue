<template>
    <div class="centered">
        <div class="centered" v-if="!formSentSuccessfully">
            <label class="" for="itemName">המוצר:</label>
            <input type="text" name="itemName" disabled v-bind:value="itemName">
            <label for="email">מייל:</label>
            <input type="text" name="email" v-model="email" @keyup="touchInput('email')">
            <span v-if="!validEmail && emailTouched">אנא וודאו שהמייל שלכם תיקני.</span>
            <label for="phonenumber">מספר טלפון:</label>
            <input type="text" name="phonenumber" v-model="phonenumber" @keyup="touchInput('phonenumber')">
            <span v-if="!validPhonenumber && phonenumberTouched">אנא ודאו כי מספר הטלפון תקין.</span>
            <button @click="submitForm">שלח טופס</button>
            <span v-if="formSent && !formSentSuccessfully">שגיאה בשליחת הטופס, אנא נסו שוב מאוחר יותר.</span>
        </div>
        <div class="centered" v-if="formSent && formSentSuccessfully">
            <span>הטופס נשלח בהצלחה!</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ContactForm',
    props: ['itemName'],
    data() {
        return {
            email: '',
            phonenumber: '',
            emailTouched: false,
            phonenumberTouched: false,
            formSent: false,
            formSentSuccessfully: false
        }
    },
    computed: {
        validEmail() {
            return /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(this.email);
        },
        validPhonenumber() {
            return /[0-9]{3}[-\s]?[0-9]{7}$/im.test(this.phonenumber);
        }
    },
    methods: {
        touchInput(input) {
            switch (input) {
                case 'email':
                    this.emailTouched = true;
                    break;
                case 'phonenumber':
                    this.phonenumberTouched = true;
                    break;
                default:
                    break;
            }
        },
        submitForm() {
            if (this.validEmail && this.validPhonenumber)
                axios.post(process.env.VUE_APP_MAIL_API_URL, { item: this.itemName, email: this.email, phonenumber: this.phonenumber } )
                    .then(result => {
                        console.log(result.data);
                        console.log('Here');
                        this.formSent = true;
                        this.formSentSuccessfully = true;
                    })
                    .catch(error => {
                        console.error(error);
                        this.formSent = true;
                    });
        }
    }
}
</script>