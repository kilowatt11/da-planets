;(function(){

let uuid = require('node-uuid'),
JsData = require('js-data'),
NeDbAdapter = require('js-data-nedb'),
 DS = new JsData.DS();
 adapter = new NeDbAdapter();

 DS.registerAdapter('nedb',adapter,{default: true})

let Galaxy = DS.defineResource({
    name: 'galaxy',
    filepath: __dirname+'/../data/galaxies.db',
    relations:{
        hasMany: {
            planet:{
                localField: 'planets',
                foriegnKey:'galaxyId'
            }
        }
    }
})


  function createGalaxy(name, cb){
      Galaxy.create({
          id:uuid.v1(),
          name:name
      }).then(cb)
   
  }

  function getAll(cb){
      let query = {}
      let options = {
          with: ['planet']
      }
     Galaxy.findAll({query, options}).then(cb);
     }
      
  

  module.exports = {
      getAll,
      createGalaxy
  }

}());
