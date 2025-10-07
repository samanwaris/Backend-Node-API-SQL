//import Users from '../models/usermodel';

//const bcrypt = require('bcryptjs');
//const getConnection = require('../dbconfig/config');
import getConnection from '../dbconfig/config.js';

export const getUsers = async(req, res) =>{
    try {
        const conn = await getConnection();
        const result = await conn.request()
        .query("SELECT KodePemakai AS UserID, NamaPemakai, KodeGroup, SandiPemakai FROM dbGeneral..UtilUser WHERE KodePemakai = 'sa'");
        
        const userdata = result.recordsets[0];
        if (!userdata[0]) return res.status(404).json({message: "getUsers : Data Not Found!"});

        res.status(200).json({
          status : 'OK',
          data : userdata
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: "getUsers : " + err.message});
    }
}
