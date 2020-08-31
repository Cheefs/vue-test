export function getContacts() {
  return { uri: 'v1/contacts', method: 'GET' };
}

export function addContact( contact ) {
  return {
    uri: 'v1/contacts',
    method: 'POST',
    body: contact
  };
}
