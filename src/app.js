const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup static directory use
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Naitik'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Naitik'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Naitik'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,place_name}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude,longitude,(error,{description,temprature,feelslike}={})=>{
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    description,
                    temprature,
                    feelslike})
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Naitik',
        errorMessage:'Help article not found.'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Naitik',
        errorMessage:'Page not found.'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port'+ port)
})