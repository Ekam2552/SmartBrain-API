const handleProfileGET = (db) => (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where("id", id)
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json(`User with id ${id} not found.`);
      }
    })
    .catch((err) => res.status(400).json("Error getting user"));
};

module.exports = {
  handleProfileGET: handleProfileGET,
};
