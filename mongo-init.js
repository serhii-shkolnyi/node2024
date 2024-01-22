db.createUser({
  user: "admin",
  pwd: "admin123",
  roles: [
    {
      role: "readWrite",
      db: "node2024",
    },
  ],
});
