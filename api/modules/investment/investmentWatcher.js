require("dotenv").config();
const mysql = require("mysql2/promise");
const schedule = require("node-schedule");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT,
});

const watchInvestments = async () => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [investments] = await connection.execute(
      "SELECT * FROM family_investments WHERE ExpireAt < NOW() FOR UPDATE"
    );
    if (investments.length === 0) {
      await connection.commit();
      return;
    }
    for (const investment of investments) {
      const [result] = await connection.execute("UPDATE family_children SET Points = Points + ? WHERE Id=?", [
        investment.Points * (investment.Interest + 1),
        investment.ChildId,
      ]);
      if (result.affectedRows === 0) {
        throw new Error("Error while updating points");
      }
      const [result2] = await connection.execute("DELETE FROM family_investments WHERE Id=?", [investment.Id]);
      if (result2.affectedRows === 0) {
        throw new Error("Error while deleting investment");
      }
    }
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

// schedule.scheduleJob("0 0 * * *", () => {
schedule.scheduleJob("*/30 * * * * *", () => {
  watchInvestments();
});
