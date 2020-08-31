<template>
   <div class="container">
      <div v-for="[ group, groupUsers ] in Object.entries( users )" :key="group">
        <div class="group">{{ group }}</div>
        <user-preview v-for="user in groupUsers" :key="user.id" :user="user" :onClick="selectUser"/>
      </div>
   </div>
</template>

<script>

  import UserPreview from '../components/UserPreview';
  import { mapActions } from 'vuex';
  import { SELECT_USER } from "@/store/constants";

  export default {
    name: 'UsersList.vue',
    props: {
      users: {
      type : Object,
     }
    },
    methods: {
      ...mapActions({ selectUser: SELECT_USER }),
    },
    components: { UserPreview }
  }
</script>

<style lang="scss" scoped>
   .container {
     border: 1px solid #b6ced4;
     border-top: none;
     border-left: none;
     color: #dddddd;

     .group {
       color: #6d6d6d;
       text-transform: uppercase;
       font-weight: bold;
       transition: border-color 0.3s;
       border-bottom: 1px solid #b6ced4;
       padding: 20px;
       box-sizing: border-box;
       margin: -1px -1px 0 0;
     }
   }
</style>
