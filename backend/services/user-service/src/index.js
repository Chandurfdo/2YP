const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;


// Middleware - fix typo
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);


// Error handling middleware - add this after routes
app.use((req, res, next) => {
    res.status(404).json({
        message: `Route ${req.url} not found`
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!'
    });
});


// Root route
app.get('/', (req, res) => {
    res.send('User Service is running(Root Route)');
});



app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});