<template>
  <div class="form__container">
    <h3>New Profile</h3>
    <div class="grid">
      <div class="form__group" v-for="[key, field] in Object.entries( formFields )" :key="key">
        <label :for="key">
          {{ field.label }}
          <span class="required">{{ field.required ? "*" : '' }}</span>
        </label>
        <component
          :id="key"
          :is="field.component"
          :type="field.type || ''"
          :value="field.value"
          class="input"
          @input="handleChange(key, $event)"
          v-bind:class="{ invalid: field.invalid }"
        />
        <div class="error">{{ field.invalid ? field.errorMessage : ''}}</div>
      </div>
    </div>
    <button class="btn success" @click="handleSave">Create</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {ADD_USER, CHANGE_FORM_DATA} from "../store/constants";

export default {
  name: "CreateForm",
  computed: {
    canSave: function () {
      return this.getCanSave();
    },
    formFields: function () {
      return this.getFormFields();
    }
  },
  watch: {
    canSave() {
      return this.canSave;
    }
  },
  methods: {
    ...mapGetters([
       'getFormFields', 'getCanSave'
    ]),
    ...mapActions({
      handleSave: ADD_USER,
      handleChangeFormData: CHANGE_FORM_DATA
    }),
    handleChange( key, event ) {
      const { target: { value } } = event;
      this.handleChangeFormData({ key, value });
    },
  }
}
</script>

<style lang="scss" scoped>
  .form__container {
    padding: 20px;

    .grid {
      display: grid;
      grid-column-gap: 10px;
      grid-template-columns: 50% 50%;
      margin-bottom: 15px;
      border-bottom: 1px solid #ddd;
    }

    .form__group {
      margin-bottom: 30px;
      position: relative;

      display: flex;
      flex-direction: column;

      .error {
        color: red;
        text-align: center;
        font-size: 0.8em;
        position: absolute;
        bottom: -22px;
      }

      .input {
        border-radius: 4px;
        padding: 8px 12px;
        border: 1px solid #ddd;

        &.invalid {
          border-color: red;
        }

        &:focus {
          outline: none;
        }
      }
    }
  }
  .required {
    color: red;
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
