;(function(){

let uuid = require('node-uuid'),
JsData = require('js-data'),
Schemator = require('js-data-schema'),
schemator = new Schemator(),
NeDbAdapter = require('js-data-nedb'),
 DS = new JsData.DS();
 adapter = new NeDbAdapter();

 DS.registerAdapter('nedb',adapter,{default: true})

let Planet = DS.defineResource({
    name: 'planet',
    filepath: __dirname+'/../data/planets.db',
    relations: {
        belongsTo: {
            galaxy:{
                localField: 'galaxy',
                foreignKey: 'galaxyId'
            }
        }
    }
})

schemator.defineSchema('Planet',{
    name: {type:'string', nullable: false},
    galaxyId: {type: 'string', nullable: false}


})
  function createPlanet(name,galaxyId,cb){
      let planet = {
          id:uuid.v1(),
          name:name,
          galaxyId: galaxyId
      }
      let error =  schemator.validateSync('Planet', planet);
      if (error) {return}   
  }

  function getAll(cb){
     Planet.findAll().then(function(planets){
return cb(planets)
     })
      
  }

  module.exports = {
      getAll,
      createPlanet
  }

}());
