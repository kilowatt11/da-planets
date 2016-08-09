; (function () {

  let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    schemator = dataAdapter.schemator,
    DS = dataAdapter.DS;

  let Moon = DS.defineResource({
    name: 'moon',
    endpoint: 'moons',
    filepath: __dirname + '/../data/moons.db',
    relations: {
      belongsTo: {
        planet: {
          localField: 'planet',
          foreignKey: 'planetId',
          parent: true
        },
        galaxy: {
          localField: 'galaxy',
          foreignKey: 'galaxyId'
        }
      }
    }
  })

  schemator.defineSchema('Moon', {
    id: { type: 'string', nullable: false },
    name: { type: 'string', nullable: false },
    planetId: { type: 'string', nullable: false },
    galaxyId: { type: 'string', nullable: false }
  })

  function createMoon(name, planetId, galaxyId, cb) {
    let moon = {
      id: uuid.v1(),
      name: name,
      planetId: planetId,
      galaxyId: galaxyId
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