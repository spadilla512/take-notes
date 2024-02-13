//imports
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

//middleware for express
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static('public'));

app.use('/api', apiRoutes)
app.use('/', htmlRoutes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});