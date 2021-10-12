<template>
    <div class="centered">
        <div class="centered card form__container" v-if="!formSentSuccessfully">
            <label for="itemName">המוצר:</label>
            <input type="text" name="itemName" disabled v-bind:value="itemName">
            <label for="email">מייל:</label>
            <input type="text" name="email" v-model="email" :class="{ error: showEmailError }" @keyup="touchInput('email')">
            <span v-if="showEmailError" class="error">אנא וודאו שהמייל שלכם תיקני.</span>
            <label for="phonenumber">מספר טלפון:</label>
            <input type="text" name="phonenumber" v-model="phonenumber" :class="{ error: showPhoneNumberError }" @keyup="touchInput('phonenumber')">
            <span v-if="showPhoneNumberError" class="error">אנא ודאו כי מספר הטלפון תקין.</span>
            <button @click="submitForm">שלח טופס</button>
            <span v-if="formSent && !formSentSuccessfully" class="error">שגיאה בשליחת הטופס, אנא נסו שוב מאוחר יותר.</span>
        </div>
        <div class="centered card" v-if="formSent && formSentSuccessfully">
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
        showEmailError() {
            return !this.validEmail && this.emailTouched;
        },
        showPhoneNumberError() {
            return !this.validPhonenumber && this.phonenumberTouched;
        },
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
                    .then(() => {
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

<style lang="scss" scoped>
@import '../styles/_colors.style';

.form__container {
    padding: 0 0.2rem;
    * {
        margin-bottom: 0.3rem;
    }

    button {
        background-color: $primary-color;
        border: $dark-accent 0.1rem solid;
        border-radius: 0.4rem;
        color: $light-accent;
    }
}

.centered {
    span {
        text-align: center;
    }
}

span.error {
    color: crimson;
}

input.error {
    border: crimson 0.1rem solid;
    box-shadow: 0 0.2rem 1.25rem crimson;
}
</style>