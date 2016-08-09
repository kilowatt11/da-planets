;(function(){

  let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  schemator = dataAdapter.schemator,
  DS = dataAdapter.DS;

  let Planet = require('./planet-model').Planet;

  let Species = DS.defineResource({
      name: 'species',
      endpoint: 'species',
      filepath: __dirname + '/../data/species.db',
      relations: {
          hasMany: {
              planet: {
                  localField: 'planets',
                  localKeys: 'planetIds'
              },
              galaxy: {
                  localField: 'galaxies',
                  localKeys: 'galaxyIds'
              }
          }
      }
  })

}());