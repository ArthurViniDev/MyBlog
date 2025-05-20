const express = require('express');
const authRoutes = require('./routes/auth');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use('/auth', authRoutes);

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
