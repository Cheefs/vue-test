<template>
  <div class="page">
    <div class="page__body">
      <side-bar/>
      <router-view/>
    </div>
  </div>
</template>

<script>
  import SideBar from './_partial/SideBar';
  
  export default {
    name: 'MainLayout.vue',
    components: { SideBar }
  }
</script>

<style lang="scss">
  html, body {
    padding: 0;
    margin: 0;
  }
  .page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .page__body {
      flex-grow: 1;
      display: flex;
    }
  }
  .container {
    height: 100%;
  }
</style>