// Local server. 
const express = require('express');
const app = express();
const path = require('path');

// File pathways.
const apiRouter = require('./app/routing/apiRoutes');
const htmlRouter = require('./app/routing/htmlRoutes');

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const port = process.env.PORT || 8083;

//For handlebars
app.set('views', path.join(__dirname, '/app/data/public'));
app.engine('handlebars', exphbs({layoutsDir: path.join(__dirname, '/app/data/public')}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//For file pathways
app.use('/api', apiRouter);
app.use('/', htmlRouter);
app.use('*', htmlRouter);


app.listen(port, () => console.log(`Listenting on port ${port}`));