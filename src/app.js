const forecast=require('./utils/forecast')
const path=require('path')
const express=require("express")
const { title } = require('process')
const hbs=require('hbs')

    //Define paths for Exprss config
const app=express()
const port=process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name: 'Achref'
    })
})
//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Achref'

    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.adress){
        return res.send({
            error:'You must provide a location'
        })
    }
    forecast(req.query.adress, (error, data={}) => {
        if(error){
         res.send({
             error: error
             
         })
        }else{
        res.send({
            location:req.query.adress,
            forecast:data
        })
      }
      })
    // res.send({
    //     forecast:"Sunny",
    // location:"italy",
    // adress:req.query.adress})
})

// app.get('/products',(req,res)=>{
//     if(!req.query.location){
//         res.send({
//                 error:'You must';
                
//         })

//     }
//     req.query.location
//     res.send({
//         products:[]
//     })
// }
// )

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'this is some help text',
        title:'HELP',
        name:'Achref'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:404,
        errorMsg:'Help article not found',
        name:'Achref'
    })

})
app.get('*',(req,res)=>{
    res.render('404page',{
        title:404,
        errorMsg:'invalid URL',
        name:'Achref'

    })
})
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})