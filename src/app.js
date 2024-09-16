const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//app.com
app.get('',(req,res)=>{
  res.render('index',{
      title : 'Weather',
      name : 'Deepanshu Bisht'
  })
})

//app.com/help
app.get('/help',(req,res)=>{
  res.render('help',{
    message : 'Do you need any kind of help !!',
    title : 'Help',
    name : 'Deepanshu Bisht'
  })
})

//app.com/about
app.get('/about',(req,res)=>{
  res.render('about',{
    title : 'About',
    name : 'Deepanshu Bisht'
  })
})
//app.com/weather
app.get('/weather',(req,res)=>{
  if(!req.query.address){
     return res.send({
      error : 'You need to provide an address'
     })
  }
  geocode(req.query.address,(error , {latitude,longitude,location} = {})=>{
     if(error){
      return res.send({error})
     }
     
     forecast(longitude,latitude,(error , forecastData )=>{
        if(error){
          return res.send({error})
        }
        res.send({
          forecast : forecastData ,
          location ,
          address : req.query.address
        })
     })
  })
 
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
      return res.send({
        error : 'You must provide a search term'
      })
    }
    console.log(req.query.search)
    res.send({
      product : []
    })
})

//routes :- basically they all are the express routes
app.get('/help/*' , (req,res)=>{
   res.render('error',{
     name : 'Deepanshu Bisht' ,
     title : '404',
     message : 'Help article not found'
   })
})

app.get('*' , (req,res)=>{
   res.render('error',{
    name : 'Deepanshu Bisht',
    title : '404',
    message : 'Page not found !'
   })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})