var errors = require('restify-errors')

const METERS_TO_YARDS_FACTOR = 1.0936

function measuresCalculator(req, res, next) {
  let from = req.params.from
  let to = req.params.to
  let value = req.params.value
  let result = undefined

  if(from === to)
    result = value
  else if(from === 'meters' && to === 'yards')
    result = value * METERS_TO_YARDS_FACTOR
  else if(from === 'yards' && to === 'meters')
    result = value / METERS_TO_YARDS_FACTOR
  
  if(result)
    res.send({
      "from": from,
      "to": to,
      "value": value,
      "result": result
    })
  else
    res.send(new errors.BadRequestError('Inavlid parameters sent'))

  next()
}

module.exports = {
  registerHandler: (server) => {
    server.get('/measures/:from/:to/:value', measuresCalculator)
  }
}