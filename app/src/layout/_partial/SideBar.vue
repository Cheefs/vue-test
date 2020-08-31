<template>
  <div class="sidebar">
    <div class="logo"  @click="handleSelect( 1 )" >[] Some Co LTD</div>
    <div class="menu">
      <div class="menu_header">Menu</div>
      <router-link
        class="menu_item"
        v-for="item in menuLinks" :key="item.id"
        v-bind:class="{ active: isActive( item.url ) }"
        :to="item.url"
      >
        {{ item.name }} 
      </router-link>
    </div>
  </div>
</template>

<script>
  import { SELECT_MENU_ITEM } from '@/store/constants';
  import { mapActions } from 'vuex';

  export default {
    name: "SideBar",
    data() { 
      return { 
        menuLinks: [ 
          { id: 1, name: 'Dashboard', url: '/dashboard' }, 
          { id: 2, name: 'Users', url: '/users' },
        ]
      }
    },
    computed: {},
    methods: {
      isActive ( itemUrl ) { 
        return (new RegExp( itemUrl )).test( this.$route.path );
      },
      ...mapActions({
        handleSelect: SELECT_MENU_ITEM
      })
    },
    components: {},
  };
</script>

<style lang="scss">
  .sidebar {
    min-width: 15%;
    background-color: #24292e;
    padding: 20px 0;
    color: #fff;

    .logo {
      padding: 0 12px 10px;
      font-weight: bold;
      border-bottom: 1px solid #3a3a3c;
    }

    .menu {
      margin: 10px 0 0;
      padding: 0 10px;

      &_header {
        padding: 8px 12px;
        text-transform: uppercase;
        color: #989898;
        font-weight: bold;
      }

      &_item {
        // cursor: pointer;
        text-decoration: none;
        color: #fff;
        display: block;
        padding: 8px 12px;
        /* border: 1px solid white; */
        border-radius: 4px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #2e4d75;
        }

        &.active {
          background-color: #126de4;
        }
      }
    }
  }
</style>