const request = require('request')

const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGFsZGVyZ291dGFtMzYzIiwiYSI6ImNrcDZ5d2toYjB1eHAycXQ4aWxhcWUwZzMifQ.BM2qEuJVMWiu-SYI8IpW2A'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the geoLocation service...',undefined)
        }else if(body.features.length===0){
            callback(' Location not found!!!',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })    
}

module.exports=geoCode