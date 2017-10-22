var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment');
var app = express();

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var quotesSchema = new mongoose.Schema({
	name : String,
	quotes : String
},
	{timestamps:true

});

var Quotes = mongoose.model('Quote', quotesSchema);
mongoose.connect('mongodb://localhost/quote');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/quotes', function(req, res){
	var quotes = Quotes.find({}, function(err, quotes){
		res.render('main', {quotes: quotes, moment: moment});
	});
});

app.post('/quotes', function(req, res){
	var quote = new Quotes({name : req.body.name, quotes : req.body.quote});
	quote.save(function(error){
		if(error){
			console.log("Error.");
		}else{
			console.log("Success.");
		}
	});
	res.redirect('/quotes');
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})