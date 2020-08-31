<template>
    <component :is="layout">
      <router-view/>
    </component>
</template>

<script>
  import MainLayout from './layout/MainLayout'
  export default {
    computed: {
      layout: () => 'main-layout',
    },
    components: { MainLayout }
  }
</script>