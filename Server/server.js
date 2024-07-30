import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Configurer CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Middleware pour gérer les données JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour servir les fichiers statiques du répertoire 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connecter MongoDB
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.URL;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});

// Routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
