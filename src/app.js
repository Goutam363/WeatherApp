const path = require('path')
const geoCode=require('./utils/geoCode.js')
const forecast=require('./utils/forecast.js')
const express = require('express')
const app=express()
const port=process.env.PORT || 3000
const hbs=require('hbs')

//Define path for express config
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebar's engine, views location & partials location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'goutam363'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'goutam363'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'goutam363'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address...'
        })
    }
    geoCode(req.query.address,(error,{location,latitude,longitude}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,{forecastData,weatherIcon}={})=>{
            if(error){
                return res.send({error})
            }
            return res.send({
                weatherIcon,
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/about/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'goutam363',
        error:'About page not found...'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'goutam363',
        error:'Help page not found...'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'goutam363',
        error:'Page not found...'        
    })
})

app.listen(port,()=>{
    console.log('Server is up at the port '+port+'...')
})