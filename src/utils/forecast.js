const request = require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=9fa1fdaee7cb781611ce1a76e50638ef&query='+encodeURIComponent(latitude+','+longitude)+'&units=m'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the weather service...',undefined)
        }else if(body.error){
            callback('Error code: '+body.error.code+'\n'+response.error.type,undefined)
        }
        else{
            callback(undefined,{
                forecastData:body.current.weather_descriptions[0]+'.<br>It is currently '+body.current.temperature+'degree but feesl like '+body.current.feelslike+'degree out there.<br>Humidity feels like '+body.current.humidity+'.<br>Wind speed is around '+body.current.wind_speed+'knot from '+body.current.wind_dir+'.',
                weatherIcon:body.current.weather_icons[0]
            })
        }
    })
}

module.exports=forecast