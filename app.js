var express= require("express");
var stripe= require("stripe")("sk_test_LxFXRsxnoaNeykNC7ucJ3ztg006XowH6fy");
var hbs= require("hbs"); 
var  bodyParser= require("body-parser");

const port =9999


var app = express();
app.set('view engine', 'hbs');
app.set('views',__dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :false}));

app.get('/',function(req ,res){
res.render('index',{

});
});

app.get('/paysucess',function(req ,res){
    res.render('paysucess',{
    
    });
    });
    

app.post('/charge',function(req ,res){
    console.log("charge Method");
   var token=req.body.stripeToken;
   var chargeAmount=req.body.chargeAmount;
   var charge=stripe.charges.create({
       amount: chargeAmount,
       currency:"bgp",
       source:token
   },function(err,charge){
       if(err & err.type==="StripeCardError"){
           console.log("Your card was Decliend");
       
   }

   });

   console.log("your payment sucessfully done");
   res.redirect('/paysucess');
});

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))