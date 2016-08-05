;(function(){

  let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  schemator = dataAdapter.schemator,
  DS = dataAdapter.DS;

  let Star = DS.defineResource({
      name: 'star',
      filepath: __dirname + '/../data/stars.db',
      relations: {
          belongsTo: {
              galaxy: {
                  localField: 'galaxy',
                  foreignKey: 'galaxyId'
              }
          }
      }
  })
  schemator.defineSchema('Star', {
      name: {type: 'string', nullable: false},
      galaxyId: { type: 'string', nullable : false}
  })

function createStar(name, galaxyId, cb){
    let star = {
        id: uuid.v1(),
        name: name,
        galaxyId: galaxyId
    }
    let error = schemator.validateSync('Star', star);
    if(error){ return cb(error) }

    Star.create(star).then(cb)
}

function getAll(cb){
    Star.findAll().then(function(stars){
        return cb(stars)
    })
}

module.exports = {
    getAll,
    createStar
}

}());