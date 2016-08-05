

;(function(){

  const router = require('express').Router();
  const Planet = require('../models/planet-model')

  exports.mountPath = '/planets'
  exports.router = router;

  router.route('/:id?')
    .get(function(req, res){
      Planet.getAll(function(planets){
          res.send(planets);
      });
    })
    .post(function(req, res){
       Planet.createPlanet(req.body.name, req.body.galaxyId, function(planet){
         return res.send(planet)
       })
    })
    .put(function(req, res){
      res.send('We are working on it....')
    })
    .delete(function(req, res){
      res.send('We are working on it....')
    })



}());