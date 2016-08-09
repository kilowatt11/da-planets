;(function(){

  let uuid = require('node-uuid'),
  JsData = require('js-data'),
  Schemator = require('js-data-schema'),
  NeDbAdapter = require('js-data-nedb'),
  FirebaseAdapter = require('js-data-firebase')
  fbAdapter = new FirebaseAdapter({
    basePath:process.env.DBCONNECTION || 'https://starsandmoons-78919.firebaseio.com/'
  })
  schemator = new Schemator(),
  adapter = new NeDbAdapter(),
  DS = new JsData.DS();

  DS.registerAdapter('nedb', adapter, { default: true })

  module.exports = {
      DS,
      uuid,
      schemator
  }



}());