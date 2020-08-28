const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
const app = express();

const PORT = process.env.PORT || 8000; //When deplyoing Heroku will define which port the website runs

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(cors());
app.use(express.json());

try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB successfully');
} catch(error) {
    console.log(error);
}

app.use('/files', express.static(path.resolve(__dirname, "..", "files")));
app.use(routes);


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});