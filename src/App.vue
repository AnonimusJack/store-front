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
  @import './styles/_colors.style';

  * {
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
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
