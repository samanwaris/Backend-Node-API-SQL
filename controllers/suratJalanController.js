import getConnection from "../dbconfig/config.js";
import sql from "mssql";

export const getSuratJalan = async (req, res) => {
  try {
    // console.log(req.pageNumber, req.pageSize, );
    const { pageNumber, pageSize, kriteria, filterValue } = req.body;
    const conn = await getConnection();
    const result = await conn
      .request()
      .input("pageNumber", sql.Int, pageNumber)
      .input("pageSize", sql.Int, pageSize)
      .input("kriteria", sql.VarChar, kriteria)
      .input("filterValue", sql.VarChar, filterValue)
      .query(
        "EXEC web_GetSuratJalanPage @pageNumber, @pageSize, @kriteria, @filterValue"
      );

    const dataSJ = result.recordsets[0];
    // console.log(dataSJ);
    if (!dataSJ[0])
      return res
        .status(404)
        .json({ message: "getSuratJalan : Data Not Found!" });

    res.status(200).json({
      status: "OK",
      data: dataSJ,
    });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: "getSuratJalan : " + err.message });
  }
};
