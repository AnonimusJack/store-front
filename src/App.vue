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
  .centered {
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
  }
</style>
