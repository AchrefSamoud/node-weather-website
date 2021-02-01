const request=require('request')
const forecast=(location,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(location)+'&appid=c9f615204adb75e9970443f592f3b0a9'
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to weather app Service')
        }else if(body.message){
           callback('Unable to find location!')
        }else{
            callback(undefined,body.weather[0].description+' It is currently: '+body.main.temp+' degrees out')
            
        }
    })
}



module.exports=forecast