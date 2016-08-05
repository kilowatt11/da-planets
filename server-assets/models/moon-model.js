; (function () {

  let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    schemator = dataAdapter.schemator,
    DS = dataAdapter.DS;

  let Moon = DS.defineResource({
    name: 'moon',
    filepath: __dirname + '/../data/moons.db',
    relations: {
      belongsTo: {
        planet: {
          localField: 'planet',
          foreignKey: 'planetId'
        }
      }
    }
  })

  schemator.defineSchema('Moon', {
    name: { type: 'string', nullable: false },
    planetId: { type: 'string', nullable: false }
  })

  function createMoon(name, planetId, cb) {
    let moon = {
      id: uuid.v1(),
      name: name,
      planetId: planetId
    }
    let error = schemator.validateSync('Moon', moon);
    if (error) { return cb(error) }

    Moon.create(moon).then(cb)
  }

  function getAll(cb) {
    Moon.findAll().then(function (moons) {
      return cb(moons)
    })
  }

  module.exports = {
    getAll,
    createMoon
  }


} ());