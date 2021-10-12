<template>
  <Header></Header>
  <router-view/>
</template>

<script>
import Header from '@/components/Header.component.vue';

export default {
  name: 'App',
  components: {
    Header
  },
  created() {
    document.querySelector('html').setAttribute('dir', 'rtl');
    this.$store.dispatch('initStore');
  },
  errorCaptured(err) {
    this.$router.replace('/');
    alert(err.message);
    return false;
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  @import './styles/_colors.style';

  * {
        box-sizing: border-box;
        font-family: 'Rubik', sans-serif;
  }

  body {
    min-width: 300px;
    padding: 0px;
    margin: 0px;
  }
  .centered {
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
  }

  .card {
      justify-content: space-evenly;
      margin: 0.5rem;
      border-radius: 0.3rem;
      background-color: rgb(223, 223, 223);
      box-shadow: 0 0.25rem 0.6rem black, 0 0.33rem 1.25rem 0 gray;
  }
</style>
