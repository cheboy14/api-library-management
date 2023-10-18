import express from "express"
import http from "http"
import compression from "compression"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
const { Client } = require('pg');


const app = express()


app.use(cors({
    credentials: true
}));

app.use(compression());

app.use(bodyParser());

app.use(cookieParser());


const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');


})

const client = new Client({
    user: 'postgress',
    host: 'localhost',
    database: 'library_api',
    password: '1234',
    port: '5432' 
  });
  
 
  client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL');
    })
    .catch((err:any) => {
      console.error('Error connecting to PostgreSQL:', err);
    });