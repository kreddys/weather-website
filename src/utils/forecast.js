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

const forecast = (longitude,latitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=2d6bd6bfb982c81c259a767f97bb5c37&query='+latitude+','+longitude+'&units=f'
    request({url, json: true}, (err,{body}) => {
        if(err){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location! Please try with another location',undefined)
        }else{
            callback(undefined,
                {
                    report: (body.current.weather_descriptions[0] + '- It is currently '+ body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike +' degrees out. Humidity is '+body.current.humidity)
                })
        }        
    })
}

module.exports = forecast