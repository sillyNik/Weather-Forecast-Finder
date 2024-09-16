const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGVlcGFuc2h1YmlzaHQ5OSIsImEiOiJjbDZxdHc0aGkwa2ZtM2Jvd2Z5czNpa3Z0In0.LmIzKuuMpYX58ni00LKTzg&limit=1'
    request({ url , json:true},(error,{body})=>{
      if(error) {
         callback('Unable to connect to locaton services',undefined)
      }
      else if(body.features.length === 0) {
         callback('Unable to find the location',undefined)
      }
      else{
         callback(undefined,{
             latitude :  body.features[0].center[1],
             longitude : body.features[0].center[0],
             location :  body.features[0].place_name
         })
      }
    })
 }
 module.exports = geocode