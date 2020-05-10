const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000


//Define paths for express config
const publicDirPath = (path.join(__dirname,'../','public'))
const viewsDirPath = path.join(__dirname,'../templates/views')
const partialsDirPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsDirPath)

hbs.registerPartials(partialsDirPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kishore Reddy'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Kishore Reddy'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help page',
        name: 'Kishore Reddy'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(longitude, latitude, (err,{report}) => {
            if(err){
                return res.send({error})
            }
            res.send({
                address: req.query.address,
                location,
                forecast: report
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title : '404',
        errorMessage: 'Help article not found',
        name: 'Kisore Reddy'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title : '404',
        errorMessage: 'Page not found',
        name: 'Kisore Reddy'
    })
})

app.listen(port,() => {
    console.log('Sever is up on port', port)
})
