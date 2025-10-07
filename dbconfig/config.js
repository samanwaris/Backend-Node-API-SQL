//const sql = require('mssql');
//require('dotenv').config();
import sql from 'mssql'
import dotenv from "dotenv";
dotenv.config();

// SERVER
const config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
       cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
  },
};

async function getConnection() {
  try {
    const conn = sql.connect(config);
    if (!conn) throw new Error('Error trying to connect');

    return conn;
  } catch (err) {
    console.log(`Err \\: ${err.message}`);
  }
}

//module.exports = getConnection;
export default getConnection;