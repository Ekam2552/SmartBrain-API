const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, password, name } = req.body;
  if(!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }

  let hash = bcrypt.hashSync(password, 10);

  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        trx("users")
          .returning("name")
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(`User named ${user[0].name} registered successfully.`);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json(err));
};

module.exports = {
  handleRegister: handleRegister,
};
