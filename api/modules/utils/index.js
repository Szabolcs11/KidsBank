const { get } = require("../../routes/auth/loginUser.js");
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

async function createFamilyMember(nickname, birthDate, userId) {
  const [res] = await (
    await conn
  ).query("INSERT INTO family_children (nickname, birthDate, ControllerUserId) VALUES (?, ?, ?)", [
    nickname,
    birthDate,
    userId,
  ]);
  if (!res.insertId) {
    return false;
  }
  const [user] = await (await conn).query("SELECT * FROM family_children WHERE Id = ?", [res.insertId]);
  if (user.length < 1) {
    return false;
  }
  return user[0];
}

async function getFamilyChildren(userId) {
  const [res] = await (await conn).query("SELECT * FROM family_children WHERE ControllerUserId = ?", [userId]);
  if (res.length < 1) {
    return [];
  }
  return res;
}

async function updateChild(ChildId, Nickname, Points, bornDate) {
  const [res] = await (
    await conn
  ).query("UPDATE family_children SET nickname = ?, points = ?, birthDate = ? WHERE Id = ?", [
    Nickname,
    Points,
    bornDate,
    ChildId,
  ]);
  if (res.affectedRows < 1) {
    return false;
  }
  return true;
}

async function deleteChild(ChildId) {
  const [res] = await (await conn).query("DELETE FROM family_children WHERE Id = ?", [ChildId]);
  if (res.affectedRows < 1) {
    return false;
  }
  return true;
}

async function createTask(ChildId, TaskName, Deadline, Points, UserId) {
  const [res] = await (
    await conn
  ).query("INSERT INTO family_tasks (ChildId, Name, Deadline, Points, ControllerUserId) VALUES (?, ?, ?, ?, ?)", [
    ChildId,
    TaskName,
    Deadline,
    Points,
    UserId,
  ]);
  if (!res.insertId) {
    return false;
  }
  const task = await getTask(res.insertId);
  return task;
}

async function getTask(TaskId) {
  const [res] = await (
    await conn
  ).query(
    "SELECT family_tasks.Id, family_tasks.ChildId, family_tasks.Name, family_tasks.Deadline, family_tasks.Points, family_children.Nickname as ChildName FROM family_tasks INNER JOIN family_children ON family_tasks.ChildId = family_children.Id WHERE family_tasks.Id = ?",
    [TaskId]
  );
  if (res.length < 1) {
    return false;
  }
  return res[0];
}

async function getTasks(UserId) {
  const [res] = await (
    await conn
  ).query(
    "SELECT family_tasks.Id as Id, family_tasks.ChildId, family_tasks.Name, family_tasks.Deadline, family_tasks.Points, family_children.Nickname as ChildName FROM family_tasks INNER JOIN family_children ON family_tasks.ChildId = family_children.Id WHERE family_tasks.ControllerUserId = ?",
    [UserId]
  );
  if (res.length < 1) {
    return [];
  }
  return res;
}

async function removeTask(TaskId) {
  const [res] = await (await conn).query("DELETE FROM family_tasks WHERE Id = ?", [TaskId]);
  if (res.affectedRows < 1) {
    return false;
  }
  return true;
}

async function updateTask(ChildId, TaskName, Deadline, Points, TaskId) {
  const [res] = await (
    await conn
  ).query("UPDATE family_tasks SET ChildId = ?, Name = ?, Deadline = ?, Points = ? WHERE Id = ?", [
    ChildId,
    TaskName,
    Deadline,
    Points,
    TaskId,
  ]);
  if (res.affectedRows < 1) {
    return false;
  }
  return true;
}

async function getMeeting(MeetingId) {
  const [res] = await (await conn).query("SELECT * FROM family_meetings WHERE Id = ?", [MeetingId]);
  if (res.length < 1) {
    return false;
  }
  return res[0];
}

async function getMeetings(UserId) {
  const [res] = await (
    await conn
  ).query("SELECT * FROM family_meetings WHERE ControllerUserId = ? ORDER BY Date DESC", [UserId]);
  if (res.length < 1) {
    return [];
  }
  return res;
}

async function addMeeting(Title, Text, Date, UserId) {
  const [res] = await (
    await conn
  ).query("INSERT INTO family_meetings (Title, Text, Date, ControllerUserId) VALUES (?, ?, ?, ?)", [
    Title,
    Text,
    Date,
    UserId,
  ]);
  if (!res.insertId) {
    return false;
  }
  const meeting = await getMeeting(res.insertId);
  return meeting;
}

async function getReward(RewardId) {
  const [res] = await (
    await conn
  ).query(
    "SELECT family_rewards.Id as Id, family_rewards.Name, family_rewards.Points, family_children.Id as ChildId, family_children.Nickname as ChildName FROM family_rewards INNER JOIN family_children ON family_children.Id = family_rewards.ChildId WHERE family_rewards.Id = ?",
    [RewardId]
  );
  if (res.length < 1) {
    return false;
  }
  return res[0];
}

async function addReward(Name, Points, UserId, ChildId) {
  const [res] = await (
    await conn
  ).query("INSERT INTO family_rewards (ChildId, Name, Points, ControllerUserId) VALUES (?, ?, ?, ?)", [
    ChildId,
    Name,
    Points,
    UserId,
  ]);
  if (!res.insertId) {
    return false;
  }
  const reward = await getReward(res.insertId);
  return reward;
}

async function getRewards(UserId) {
  const [res] = await (
    await conn
  ).query(
    "SELECT family_rewards.Id as Id, family_rewards.Name, family_rewards.Points, family_children.Id as ChildId, family_children.Nickname as ChildName FROM family_rewards INNER JOIN family_children ON family_children.Id = family_rewards.ChildId WHERE family_rewards.ControllerUserId = ?",
    [UserId]
  );
  if (res.length < 1) {
    return [];
  }
  return res;
}

async function updateReward(RewardId, Name, Points, ChildId) {
  const [res] = await (
    await conn
  ).query("UPDATE family_rewards SET Name = ?, Points = ?, ChildId = ? WHERE Id = ?", [
    Name,
    Points,
    ChildId,
    RewardId,
  ]);
  if (res.affectedRows < 1) {
    return false;
  }
  const reward = await getReward(RewardId);
  return reward;
}

async function deleteReward(RewardId) {
  const [res] = await (await conn).query("DELETE FROM family_rewards WHERE Id = ?", [RewardId]);
  if (res.affectedRows < 1) {
    return false;
  }
  return true;
}

async function getChild(id) {
  const [res] = await (await conn).query("SELECT * FROM family_children WHERE Id = ?", [id]);
  if (res.length < 1) {
    return false;
  }
  return res[0];
}

async function reedemReward(RewardId) {
  const reward = await getReward(RewardId);
  const child = await getChild(reward.ChildId);
  if (child.Points < reward.Points) {
    return "NotEnoughPoints";
  }
  try {
    await (await conn).beginTransaction();
    const [rewardRows] = await (
      await conn
    ).execute("SELECT Points, ChildId FROM family_rewards WHERE id = ? FOR UPDATE", [RewardId]);
    const reward = rewardRows[0];

    if (!reward) {
      throw new Error("Reward not found");
    }
    await (
      await conn
    ).execute("UPDATE family_children SET Points = Points - ? WHERE id = ?", [reward.Points, reward.ChildId]);
    await (await conn).execute("DELETE FROM family_rewards WHERE id = ?", [RewardId]);
    await (await conn).commit();
  } catch (err) {
    await (await conn).rollback();
    return false;
  } finally {
    return true;
  }
}

async function completeTask(TaskId) {
  const task = await getTask(TaskId);
  if (!task) {
    return false;
  }
  try {
    await (await conn).beginTransaction();
    const [rewardRows] = await (
      await conn
    ).execute("SELECT Points, Id FROM family_children WHERE Id = ? FOR UPDATE", [task.ChildId]);
    const user = rewardRows[0];
    await (
      await conn
    ).execute("UPDATE family_children SET Points = Points + ? WHERE id = ?", [task.Points, task.ChildId]);

    await (await conn).execute("DELETE FROM family_tasks WHERE id = ?", [TaskId]);
    await (await conn).commit();
    if (!user) {
      throw new Error("User not found");
    }
  } catch (err) {
    await (await conn).rollback();
    return false;
  } finally {
    return true;
  }
}

async function getInvestment(InvestmentId) {
  const [res] = await (
    await conn
  ).query(
    "SELECT family_investments.Id as Id, family_investments.Name, family_investments.Points, family_investments.Days, family_investments.Interest, family_children.Id as ChildId, family_children.Nickname as ChildName FROM family_investments INNER JOIN family_children ON family_children.Id = family_investments.ChildId WHERE family_investments.Id = ?",
    [InvestmentId]
  );
  if (res.length < 1) {
    return false;
  }
  return res[0];
}

let getInterestByDays = (Days) => {
  switch (Days) {
    case 7:
      return 0.02;
    case 14:
      return 0.06;
    case 30:
      return 0.18;
    case 90:
      return 0.8;
    case 180:
      return 2.4;
    default:
      return 0;
  }
};

async function addInvestment(ChildId, Name, Points, Days, UserId) {
  let Interest = getInterestByDays(Days);
  let ExpireAt = new Date();
  ExpireAt.setDate(ExpireAt.getDate() + Days);
  let info = {
    ChildId,
    Name,
    Points,
    Days,
    Interest,
    Date: new Date(),
    ExpireAt,
    ControllerUserId: UserId,
  };
  try {
    await (await conn).beginTransaction();
    const [rewardRows] = await (
      await conn
    ).execute("SELECT Points, Id FROM family_children WHERE Id = ? FOR UPDATE", [ChildId]);

    const user = rewardRows[0];
    if (!user) {
      throw new Error("User not found");
    }
    if (user.Points < Points) {
      return "NotEnoughPoints";
    }
    await (await conn).execute("UPDATE family_children SET Points = Points - ? WHERE id = ?", [Points, ChildId]);

    await (await conn).commit();

    const [res] = await (await conn).query("INSERT INTO family_investments SET ?", [info]);
    if (!res.insertId) {
      return false;
    }
    const investment = await getInvestment(res.insertId);
    return investment;
  } catch (err) {
    await (await conn).rollback();
    return false;
  }
}

async function getInvestments(UserId) {
  const [res] = await (
    await conn
  ).query(
    "SELECT family_investments.Id as Id, family_investments.Name, family_investments.Points, family_investments.Days, family_investments.Interest, family_investments.Date, family_investments.ExpireAt, family_children.Id as ChildId, family_children.Nickname as ChildName FROM family_investments INNER JOIN family_children ON family_children.Id = family_investments.ChildId WHERE family_investments.ControllerUserId = ?",
    [UserId]
  );
  if (res.length < 1) {
    return [];
  }
  return res;
}

async function deleteInvestment(InvestmentId) {
  try {
    await (await conn).beginTransaction();
    const [investmentRows] = await (
      await conn
    ).execute("SELECT Points, ChildId FROM family_investments WHERE Id = ? FOR UPDATE", [InvestmentId]);
    const investment = investmentRows[0];

    if (!investment) {
      throw new Error("Investment not found");
    }
    await (
      await conn
    ).execute("UPDATE family_children SET Points = Points + ? WHERE Id = ?", [investment.Points, investment.ChildId]);
    await (await conn).execute("DELETE FROM family_investments WHERE Id = ?", [InvestmentId]);
    await (await conn).commit();
  } catch (err) {
    await (await conn).rollback();
    return false;
  } finally {
    return true;
  }
}

module.exports = {
  Authenticate,
  returnError,
  createUser,
  loginUser,
  deleteUserSession,
  createFamilyMember,
  getFamilyChildren,
  updateChild,
  deleteChild,
  createTask,
  getTasks,
  updateTask,
  removeTask,
  getMeetings,
  addMeeting,
  addReward,
  getRewards,
  updateReward,
  deleteReward,
  reedemReward,
  completeTask,
  addInvestment,
  getInvestments,
  deleteInvestment,
};
