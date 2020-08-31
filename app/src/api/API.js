/** @todo validate */
export function API () {}

API.prototype.baseUrl = process.env.VUE_APP_BACKEND_HOST;
API.prototype.url = "";
API.prototype.request = {
  method: 'GET',
  headers: {
    'mode': 'cors',
    'Content-type': 'application/json',
  },
};

API.prototype.setUrl = function ( url ) {
  this.url = `${ this.baseUrl }${ url }`;
  return this;
}
API.prototype.setMethod = function ( method ) {
  this.request.method = method;
  return this;
}
API.prototype.setBody = function ( body ) {
  if ( !['GET','HEAD'].includes(this.request.method ) ) {
    this.request.body = JSON.stringify( body );
  }
  return this;
}

/**
 * @param { Object<{ uri: string, method: String, body: Object|null, response: String|null }>} endpointData
 * @return { Promise }
 **/
API.prototype.request = function( endpointData ) {
  const { uri, method = 'GET', body = {} } = endpointData;
  this.setUrl( uri )
    .setMethod( method )
    .setBody( body );

  return fetch( this.url, this.request );
}
