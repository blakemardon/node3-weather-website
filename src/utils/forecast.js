const request = require('request')

const forecast = (latitude, longitude, callback) => {
    url = 'https://api.darksky.net/forecast/b809f5e7d852be24902053296c2edb5c/' + latitude + ',' + longitude
    
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('could not connect to forecast server', undefined)
        } else if (response.body.error) {
            callback('Unable to find any results', undefined)
        } else {
            callback(undefined, {
                temperature: response.body.currently.temperature,
                precipitation: response.body.currently.precipProbability,
                feelsLike: response.body.currently.apparentTemperature
            })
        }
    })
}

module.exports = forecast