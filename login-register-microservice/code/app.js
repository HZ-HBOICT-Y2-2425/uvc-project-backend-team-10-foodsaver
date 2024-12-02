// import express from 'express';
// import bodyParser from 'body-parser';
// import userRoutes from './routes/index.js';
// import cors from 'cors';

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api/users', userRoutes);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json()); // Para manejar JSON en el cuerpo de las solicitudes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
