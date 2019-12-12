const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//paths for express config
const pubilcDirectory = path.join(__dirname, '../public')
const tepmlatesDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', tepmlatesDirectory)
hbs.registerPartials(partialsDirectory)

//setup static directory to serve
app.use(express.static(pubilcDirectory))

app.get('', (req, res) => {
    res.render('index',{
        title: 'new title',
        name: 'Blake'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Blake'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'this is a help message',
        title: 'Help',
        name: 'Blake'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must supply an address'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({error})
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send({error})
                } else {
                    res.send({
                        location,
                        temperature: forecastData.temperature,
                        precipitation: forecastData.precipitation
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must supply a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404 page not found',
        name: 'Blake',
        error: 'help 404 message'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page not found',
        name: 'Blake',
        error: 'normal 404 message'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})