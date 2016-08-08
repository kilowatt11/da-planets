; (function () {

    let dataAdapter = require('./data-adapter'),
        uuid = dataAdapter.uuid,
        schemator = dataAdapter.schemator,
        DS = dataAdapter.DS

    let Planet = DS.defineResource({
        name: 'planet',
        filepath: __dirname + '/../data/planets.db',
        relations: {
            hasMany: {
                moon: {
                    localField: 'moons',
                    foreignKey: 'planetId'
                }
            },
            belongsTo: {
                galaxy: {
                    localField: 'galaxy',
                    foreignKey: 'galaxyId'
                }
            }
        }
    })

    schemator.defineSchema('Planet', {
        name: { type: 'string', nullable: false },
        galaxyId: { type: 'string', nullable: false }


    })
    function createPlanet(name, galaxyId, cb) {
        let planet = {
            id: uuid.v1(),
            name: name,
            galaxyId: galaxyId
        }
        let error = schemator.validateSync('Planet', planet);
        if (error) { return cb(error) }
        Planet.create(planet).then(cb)
    }

     function getAll(cb){
      let query = {}
      let options = {
          with: ['moon']
      }
     Planet.findAll(query, options).then(cb);
     }

    module.exports = {
        getAll,
        createPlanet
    }

} ());
