<template>
  <div @click="handleSelectUser( user.id )"
      class="user__preview flex items-center"
      v-bind:class="{ active: isActive( user.id ) }"
    >
    <div class="photo"></div>
    <div class="info">
      <div class="fio">{{ `${ user.firstname } ${ user.lastname }` }}</div>
      <div class="login">{{ user.email }}</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'UserPreview.vue',
    props: {
      onClick: {
        type: Function
      },
      user: { 
        type : Object,
      },
    },

    methods: {
      handleSelectUser( id ) {
        if ( this.isActive( id ) ) {
          return;
        }
        this.$router.push({ name: 'Users', params: { id } });
        this.onClick( id )
      },
      isActive( id ) { 
        return ( Number( this.$route.params.id ) === Number( id ) )
      },
    }
  }
</script>

<style lang="scss" scoped>
   .user__preview {
      transition: border-color 0.3s;
      border-bottom: 1px solid #b6ced4;
      border-left: 4px solid transparent;
      padding: 15px;
      color: #dddddd;
      text-decoration: unset;
      box-sizing: border-box;
      margin: -1px -1px 0 0;

      .info {
        display: flex;
        margin-left: 2%;
        justify-content: space-around;
        flex-direction: column;

        .fio {
          font-weight: bold;
          color: black;
        }
      }

      cursor: pointer;
      &:hover {
        border-left-color: #184880;
      }
      &.active {
        border-left-color: #2f8cf7;
      }

      .photo {
        width: 50px;
        height: 50px;
        background-color: black;
        border-radius: 50%;
      }
  
    }

  .flex {
    display: flex;
    &.items_center{
      align-items: center;
    }
  }
   
</style>