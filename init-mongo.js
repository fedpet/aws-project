db = new Mongo().getDB("aws")
db.createCollection('accounts')
db.accounts.insert([
    // admin admin
    { email: "admin", password: "$2y$04$OXSMXZRmxkCh8vpB16a2NuUkxNRxPv/UD.NcBPIa9FG4tBsi9u1Qu", role: "admin" },
])