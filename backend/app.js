const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const auth = require('./routes/auth.routes');
const empl = require('./routes/employees.routes');
const deps = require('./routes/departments.routes');

const app = express();
app.use(cors());
mongoose.connect(
  'mongodb+srv://admin:adimiron1@cluster0-1ecvy.mongodb.net/ukeess?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
const port = 3000;
const dbConnection = mongoose.connection;

dbConnection.on('error', err => console.log('connection error ', err));
dbConnection.on('open', () => console.log('Open'));

app.use('/auth', auth);
app.use('/', [empl, deps]);

app.listen(port, err => {
  err ? console.log(err) : console.log('Server');
});
