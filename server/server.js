const express = require('express');
const morgan =require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 3000 ;
const config = require('./config');

const app =express();
mongoose.Promise =global.Promise;

mongoose.connect(config.database, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('connected to database');
	}
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(express.static(__dirname + '/client/AngularAmazono/dist/AngularAmazono/index.html'));
app.use(morgan('dev'));
app.use(cors());

const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');
const sellerRoutes =require('./routes/seller');


app.use('/api', mainRoutes);
app.use('/api/accounts', userRoutes);
app.use('/api/seller', sellerRoutes);

app.get('*',(req,res)=>{
	res.sendFile(path.json(__dirname + '/client/AngularAmazono/dist/AngularAmazono/index.html'));
});


app.listen(port, err => {
	console.log('server is running on port:' + config.port);
})



