import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from '../src/config/passport.js';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import repositoryRouter from './routes/repository.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/repositories', repositoryRouter);

app.get('/', (req, res) => {
    res.send('Pull Critique is working Fine!');
});

app.listen(PORT, () => {
    console.log(`Pull Critique is running on PORT : `, PORT);
    connectDB();
});