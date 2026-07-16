// Imports 
const express = require('express')
const dotenv = require("dotenv").config() 
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')
const {MongoStore} = require("connect-mongo");

const connectToDB = require('./dbConnection.js')

const charts = require('chart.js')

// Controllers & Middleware Imports
const indexController = require('./controllers/index.controller')
const authController = require('./controllers/auth.controller')
const faqController = require('./controllers/faq.controller')
const statusController = require('./controllers/status.controller')
const ticketController = require('./controllers/ticket.controller')
const analysisController = require('./controllers/analysis.controller.js')

const isAdmin = require('./middleware/is-admin.js')
const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require("./middleware/pass-user-to-view.js");

const app = express()

// Middlewares
app.use(express.static('public')) // using public folder
app.use(express.urlencoded({ extended: false })) // to access the data in express
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

    store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: "sessions"
    }),

    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);


// Routes
app.use('/auth', authController)
app.use('/status', statusController)
app.use('/',indexController)
app.use('/admin', isAdmin, analysisController) // Restricted to admin role only
app.use('/faq', faqController)
app.use('/tickets', ticketController)


// connect to database and listen on Port 3000
async function startServer() {
    const PORT = process.env.PORT || 3000;
    await connectToDB();

    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    });
}


startServer();

