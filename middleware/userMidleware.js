import getConnection from '../dbconfig/config.js';
import sql from 'mssql';

export const verifyUser = async (req, res, next) =>{
    try {
        if(!req.session.userId){
        return res.status(401).json({message: "Please login to your account!"});
    }
    const conn = await getConnection();
        const result = await conn.request()
        .input('kodePemakai', sql.VarChar, req.session.userId)
        .query("SELECT KodePemakai AS UserID, NamaPemakai, KodeGroup FROM dbGeneral..UtilUser WHERE KodePemakai = @kodePemakai");
        const user = result.recordsets[0];
        await conn.close();

    if(!user[0]) return res.status(404).json({message: "User not found"});

    req.userId = user[0].UserID;
    req.KodeGroup = user[0].KodeGroup; 
    next();
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: "verifyUser : " + err.message});
    }
}