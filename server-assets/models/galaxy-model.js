; (function () {

    let dataAdapter = require('./data-adapter'),
        uuid = dataAdapter.uuid,
        schemator = dataAdapter.schemator,
        DS = dataAdapter.DS;

    let Galaxy = DS.defineResource({
        name: 'galaxy',
        filepath: __dirname + '/../data/galaxies.db',
        relations: {
            hasMany: {
                planet: {
                    localField: 'planets',
                    foreignKey: 'galaxyId'
                },
                star: {
                    localField: 'stars',
                    foriegnKey: 'galaxyId'
                },
                moon: {
                    localField: 'moons',
                    foriegnKey: 'galaxyId'
                }

            }
        }
    })


    function createGalaxy(name, cb) {
        Galaxy.create({
            id: uuid.v1(),
            name: name
        }).then(cb)

    }

    function getAll(cb) {
        let query = {}
        let options = {
            with: ['planet', 'star']
        }
        Galaxy.findAll(query, options).then(cb);
    }



    module.exports = {
        getAll,
        createGalaxy
    }

} ());
