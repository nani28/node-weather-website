const request=require('request')

const geocode = (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmFpdGlrcHJhamFwYXRpOTEzMSIsImEiOiJjbDBnbGowcnMwMGY4M2VzNG5vN3czNnNoIn0.MK0CxToZ9VcU0ddQQVX-lA&limit=1'
    const json=true
    request({url,json},(error,{body})=>{
        if(error){
            callback('Unable to connect location services!',undefined)
            }
            else if(body.features.length ===0){
            callback('Unable to find location!',undefined)
            }   
            else{ 
                callback(undefined,{ 
                    latitude:body.features[0].center[1],
                    longitude:body.features[0].center[0],
                    place_name:body.features[0].place_name
                })
            }
})
}

module.exports=geocode