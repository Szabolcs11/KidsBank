const conn = require("./../mysql/index.js");
const bcrypt = require("bcryptjs");

const Authenticate = async (req, res, next) => {
  if (req.cookies.sessiontoken) {
    const user = await getUserByToken(req.cookies.sessiontoken);
    if (!user) return await returnError(req, res, "Nem vagy bejelentkezve");
    req.user = user;
    next();
  } else {
    return await returnError(req, res, "Nem vagy bejelentkezve");
  }
};

async function getUserByToken(Token) {
  const [res] = await (
    await conn
  ).query(
    "SELECT users.Id, users.Username FROM users INNER JOIN sessions ON sessions.UserID = users.Id AND sessions.Token=?;",
    [Token]
  );
  if (res.length == 0) return false;
  return res[0];
}

async function returnError(req, res, message) {
  return res.status(200).json({
    success: false,
    message: message,
  });
}
function generateToken(length) {
  var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

async function loginUser(username, password) {
  const [res] = await (await conn).query("SELECT * FROM users WHERE username = ?", [username]);
  if (res.length < 1) {
    return "UserNotFound";
  }
  const user = res[0];
  const match = await bcrypt.compare(password, user.Password);
  if (!match) {
    return "InvalidPass";
  }
  const token = generateToken(16);
  let sessionData = {
    Token: token,
    UserID: user.Id,
  };
  await (await conn).query("INSERT INTO sessions SET ?", [sessionData]);
  delete user.Password;
  return {
    user: user,
    token: token,
  };
}

async function createUser(username, email, password) {
  const [res] = await (await conn).query("SELECT * FROM users WHERE username = ?", [username]);
  if (res.length > 0) {
    return "UserAlreadyExists";
  }
  const hash = await bcrypt.hash(password, 10);
  const [dbres] = await (
    await conn
  ).query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hash]);
  if (dbres.affectedRows < 1) {
    return "DBError";
  }
  return dbres.insertId;
}

async function deleteUserSession(token) {
  const [res] = await (await conn).query("DELETE FROM sessions WHERE Token = ?", [token]);
  if (res.affectedRows < 1) {
    return false;
  }
  return true;
}

module.exports = {
  Authenticate,
  returnError,
  createUser,
  loginUser,
  deleteUserSession,
};
