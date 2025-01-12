// start.js setup from learnnode.com by Wes Bos
import express from 'express';
import * as dotenv from 'dotenv';
import net from 'net';
dotenv.config({ path: 'variables.env' });
import indexRouter from './routes/index.js';
import cors from "cors";

const app = express();
const defaultPort = 4010;
const port = process.env.TOKEN_SERVER_PORT || defaultPort;

function checkPort(port, callback) {
  const server = net.createServer();
  server.once('error', function (err) {
    if (err.code === 'EADDRINUSE') {
      callback(false);
    }
  });
  server.once('listening', function () {
    server.close();
    callback(true);
  });
  server.listen(port);
}

checkPort(defaultPort, function (isAvailable) {
  const finalPort = isAvailable ? defaultPort : 4020; // Use 4020 if 4010 is not available
  app.listen(finalPort, () => {
    console.log(`Pantry Server running on ${finalPort}...`);
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
