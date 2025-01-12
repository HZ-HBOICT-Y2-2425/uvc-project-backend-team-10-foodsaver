const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

