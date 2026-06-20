require('dotenv').config();
const express = require('express');
const cors = require('cors');
const githubRoutes = require("./routes/githubRoutes");

const envObj = require('./config/env');

const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'https://rasheed-port-folio.vercel.app',
        ],
    })
);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Portfolio Backend Running');
});

app.use('/api', contactRoutes);
app.use('/api/github', githubRoutes);

const port = envObj.port || 4000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});