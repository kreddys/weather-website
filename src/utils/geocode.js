const request = require('postman-request')

// const url = 'http://api.weatherstack.com/current?access_key=2d6bd6bfb982c81c259a767f97bb5c37&query=36.1627,-86.7816&units=f'

// request({url: url, json: true}, (err,response) => {
//     if(err){
//         console.log('Unable to connect to weather service!')
//     }else if(response.body.error){
//         console.log('Unable to find location!')
//     }else{
//         console.log(response.body.current.weather_descriptions[0],'- It is currently', response.body.current.temperature,'degrees out. It feels like',response.body.current.feelslike,'degrees out.')
//     }
// })

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2lzaG9yZTUyMTQiLCJhIjoiY2s5cm40c2cwMGJwdjNlcnIyYTQwZmhxMSJ9.fPcfVmy4iCqjnjHfa_wUXg&limit=1'
    request({url, json: true}, (err,{body}) => {
        if(err){
            callback('Unable to connect to geocode service!',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location! Please try with another location',undefined)
        }else{
            callback(undefined,
                {
                    latitude    : body.features[0].center[1],
                    longitude   : body.features[0].center[0],
                    location    : body.features[0].place_name
                })
        }        
    })
}

module.exports = geocode