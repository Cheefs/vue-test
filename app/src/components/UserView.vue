<template>
  <div class="container">

    <div class="user__preview flex items-center">
      <div class="photo"></div>
      <div class="info">
        <div class="fio">{{ user.firstname }} {{ user.lastname }}</div>
        <div class="login">{{ user.email }}</div>
      </div>
    </div>

    <div class="profile__data">
      <div class="header">Basic Details</div>
      <div class="content">
         <a v-if="user.email" class="link" :href="`mailto:${ user.email }`">[] {{ user.email }}</a>
         <a v-if="user.phone" class="link" :href="`tel:${ user.phone }`">[] {{ user.phone }}</a>
      </div>
    </div>

    <div v-if="user.bio" class="profile__data">
      <div class="header">Bio</div>
      <div class="content">
        {{ user.bio }}
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'UserPreview.vue',
    props: {
      user: Object
    },
  }
</script>

<style lang="scss" scoped>
  .container {
      padding: 20px 0;

      .user__preview {
        padding: 0 20px;
        margin-bottom: 20px;

        color: #dddddd;

        .info {
          display: flex;
          margin-left: 5%;
          flex-direction: column;
          justify-content: center;

          .fio {
            font-weight: bold;
            color: black;
            margin-bottom: 10px;
          }
        }
        .photo {
          width: 100px;
          height: 100px;
          background-color: black;
          border-radius: 50%;
        }
      }

    .profile__data {
      margin: 10px 0;
      padding: 0 20px;
      .header {
        font-weight: bold;
        color: #dddddd;
        text-transform: uppercase;
      }
      .content {
        display: flex;
        justify-content: space-between;
        .link {
          display: block;
          text-decoration: unset;
          color: #6d6d6d;
        }
      }
    }

    .flex {
      display: flex;
      &.items_center{
        align-items: center;
      }
    }
  }


</style>
