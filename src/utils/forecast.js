const request=require('request')

const forecast = (latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=f3ea7913beb5041616ae353dc8a95100&query='+latitude+','+longitude
    const json=true
    request({url,json},(error,{body})=>{
        if(error){
            callback('Unable to connect weather services!',undefined)
            }
            else if(body.error){
            callback('Unable to find location!',undefined)
            }   
            else{ 
                callback(undefined,{
                    description:body.current.weather_descriptions[0],
                    temprature:body.current.temperature,
                    feelslike:body.current.feelslike
                })
            }
})
}

module.exports=forecast