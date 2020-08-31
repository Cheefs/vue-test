<template>
   <div class="container">
      <div class="control__panel">
          <div>Users</div>
          <div>
              <router-link to="/users/create" class="btn success">Add User</router-link>
          </div>
      </div>
      <preloader v-if="isFetching"/>
      <div v-else class="contacts__container">
         <div class="left">
            <users-list :users="contactsList"/>
         </div>
         <div class="right">
           <create-form v-if="isCreate()"/>
           <user-view v-if="user" :user="user" />
         </div>
      </div>
   </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  import UsersList from '../components/UsersList';
  import UserView from '../components/UserView';
  import CreateForm from '../components/CreateForm';
  import Preloader from '../components/Preloader';
  import { DESELECT_USER, FETCH_CONTACTS_LIST, SELECT_USER} from "../store/constants";

  export default {
    name: 'Users.vue',
    created() {
      const routeUserId = this.$route.params.id;
      this.fetchContacts().then( () => {
        if (routeUserId) {
          this.selectUser( Number( routeUserId ) );
        }
      });
    },
    computed: {
      contactsList() {
      /** @todo to helper */
      return Object.entries( this.getContacts() ).sort( (prev, next) => {
          if ( prev[0] !== next [0]) {
            return prev[ 0 ] > next[ 0 ] ? 1 : -1;
          }
          return 0;
        }).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
      },
      getFullPath() {
        return this.$route.path;
      },
      user() {
        return this.getSelectedUser();
      },
      isFetching() {
        return this.isContactsFetching();
      }
    },
    watch: {
      getFullPath() {
        this.isCreate();
      }
    },
    methods: {
      ...mapGetters(['getSelectedUser', 'getContacts', 'isContactsFetching']),
      ...mapActions({ selectUser: SELECT_USER, deselectUser: DESELECT_USER, fetchContacts: FETCH_CONTACTS_LIST }),
      isCreate() {
        const selected = this.getSelectedUser();
        const isCreate = ( this.$router.currentRoute.name === 'Create' );

        if ( selected && isCreate ) {
          this.deselectUser();
        }
        return isCreate;
      }
    },
    components: {
      UsersList, UserView, CreateForm, Preloader
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    // background: olive;

    .control__panel {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #b6ced4;
      font-weight: bold;
    }
    .contacts__container {
      display: flex;
      height: 100%;

      .left, .right {
        width: 50%;
      }
    }
  }

  .btn {
    cursor: pointer;
    transition: background-color 0.2s;
    padding: 8px 12px;
    border-radius: 4px;
    color: #ffffff;
    font-weight: bold;
    border: none;
    box-shadow: unset;
    outline: unset;
    text-decoration: none;
    font-size: 14px;

    &.success {
      background-color: #28c30e;
    }

    &:hover {
      background-color: #0e6900;
    }
  }

</style>
