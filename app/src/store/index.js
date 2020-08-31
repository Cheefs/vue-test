import Vue from "vue";
import Vuex from "vuex";
import createLogger from 'vuex/dist/logger';
import {
  SELECT_MENU_ITEM,
  SELECT_USER,
  ADD_USER,
  CHANGE_FORM_DATA,
  DESELECT_USER,
  VALIDATE_ERROR,
  FETCH_CONTACTS_LIST,
  FETCH_CONTACTS_LIST_SUCCESS, FETCH_CONTACTS_LIST_ERROR
} from "./constants";
import { API } from "@/api/API";
import { addContact, getContacts } from "@/api/contacts";

Vue.use( Vuex );

/** Список плагинов приложения */
const plugins = [];
const api = new API();

/** Подключаем все что нужно для разработки **/
if ( process.env.NODE_ENV !== 'production' ) {
  plugins.push( createLogger() );
}

export const initialState = Object.freeze({
  contactsFetching: true,
  selectedUser: null,
  contactsList: {},
  canSave: true,
  formFields: {
    firstname: {
      label : 'First name',
      value: '',
      type: 'text',
      component: 'input',
      required: true,
      errorMessage: 'Field cannot be blank',
      validator: function( value ) {
        return Boolean(value);
      }
    },
    lastname: {
      label : 'Last name',
      value: '',
      type: 'text',
      component: 'input',
    },
    email: {
      label : 'Email',
      value: '',
      type: 'email',
      component: 'input',
      required: true,
      errorMessage: 'Email is not valid',
      validator: function( value ) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test( value );
      }
    },
    phone: {
      label : 'Phone',
      value: '',
      type: 'phone',
      component: 'input',
    },
    position: {
      label : 'Position',
      value: '',
      type: 'text',
      component: 'input',
    },
    bio: {
      label : 'Bio',
      value: '',
      component: 'textarea',
    }
  }
});

/**
 * Состояние всего приложения, так как скорее всего разработка будет модульной, станарные ключи были убранны
 * @type { object } Vuex.Store
 **/
const store = new Vuex.Store({
  state: { ...initialState  },
  getters: {
    activeItem: ({ selectedMenu }) => selectedMenu,
    getSelectedUser: ({ selectedUser }) => selectedUser,
    getFormFields: ({ formFields }) => formFields,
    getCanSave: ({ canSave }) => canSave,
    getContacts: ({ contactsList }) => ({ ...contactsList }),
    isContactsFetching: ({ contactsFetching }) => contactsFetching
  },
  setters: {},
  mutations: {
    [ FETCH_CONTACTS_LIST_SUCCESS ]: ( state, payload ) => {
      state.contactsFetching = false;
      state.contactsList = payload;
    },
    [ FETCH_CONTACTS_LIST_ERROR ]: ( state, payload ) => {
      state.contactsFetching = false;
      state.errors.push( payload );
      console.error( payload );
    },
    [ SELECT_MENU_ITEM ]: (state, payload) => {
      state.selectedMenu = payload;
    },
    [ SELECT_USER ]: (state, id) => {
      const user = Object.values( state.contactsList )
        .flat()
        .find(({ id: userID }) => Number( userID ) === Number( id ) );

      if ( !user ) {
        return;
      }
      state.selectedUser = user;
    },
    [ DESELECT_USER ]: ( state ) => {
      state.selectedUser = null
    },
    [ ADD_USER ]: ( state, contactId ) => {
      const { firstname } = state.formFields;
      const group = isNaN( Number(firstname.value[ 0 ]) ) ? firstname.value[ 0 ] : '#';
      const contactsList = { ...state.contactsList };

      state.canSave = true;

      const selected = contactsList[ group.toLowerCase() ] || [];

      state.contactsList = {
        ...contactsList, [ group.toLowerCase() ]: [
          ...selected,
          addNewUser( contactId, state.formFields )
        ]
      };
      state.formFields = initialState.formFields;
    },
    [ VALIDATE_ERROR ]: ( state, payload ) => {
      state.canSave = false;
      state.formFields = { ...payload };
    },
    [ CHANGE_FORM_DATA ]: ( state, payload ) => {
      const { key, value } = payload;
      const link = state.formFields[ key ];

      if ( !link ) {
        console.warn({ key, message: 'wrong'});
        return;
      }
      link.value = value;
    },
  },
  actions: {
    [ SELECT_MENU_ITEM ]: ({ commit }, payload ) => {
        commit( SELECT_MENU_ITEM, payload )
    },
    [ SELECT_USER ]: ({ commit }, payload ) => {
        commit( SELECT_USER , payload )
    },
    [ DESELECT_USER ]: ({ commit }) => {
      commit( DESELECT_USER )
    },
    [ FETCH_CONTACTS_LIST ]: async ({ commit }) => {
      const response = await api.request( getContacts() );
      const data = await response.json();

      if ( response.status !== 200 ) {
        return commit( FETCH_CONTACTS_LIST_ERROR, data );
      }
      commit( FETCH_CONTACTS_LIST_SUCCESS, data );
    },

    [ ADD_USER ]: async ({ commit , getters }) => {
      const formFields = getters.getFormFields;

      if ( isValid( formFields ) ) {
        const requestData = Object.entries( formFields ).reduce(( acc, [key, field]) => ({
          ...acc, [ key ]: field.value
        }), {});

        const request = await api.request( addContact( requestData ) );
        const contactId = await request.json();

        commit( ADD_USER, contactId );
        return true;
      }
      commit( VALIDATE_ERROR, formFields);
      return false
    },
    [ CHANGE_FORM_DATA ]: ({ commit }, payload ) => {
      commit( CHANGE_FORM_DATA, payload )
    },
  },
  plugins
});

function addNewUser( contactId, formFields ) {
  const { firstname, lastname, bio, email, phone, position } = formFields;
  return {
    id: contactId,
    firstname: firstname.value,
    lastname: lastname.value,
    bio: bio.value,
    email: email.value,
    phone: phone.value,
    position: position.value
  }
}

function isValid( formFields ) {
  const errorKeys = [];
  Object.entries( formFields ).forEach(([ key, item ]) => {
    const { value, required, validator } = item;
    item.invalid = validator ? !validator( value ) : false;

    if ( required && item.invalid ) {
      errorKeys.push( key );
    }
  });

  return errorKeys.length === 0;
}

export default store;
