import dotenv from "dotenv";
dotenv.config();

// SERVER
const config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
       cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
  },
};

export default config;