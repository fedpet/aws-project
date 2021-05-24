db = new Mongo().getDB("aws")
db.createCollection('accounts')

const acc1 = new ObjectId()
const acc2 = new ObjectId()
db.accounts.insert([
    // admin admin
    { email: "admin", password: "$2y$04$OXSMXZRmxkCh8vpB16a2NuUkxNRxPv/UD.NcBPIa9FG4tBsi9u1Qu", role: "admin" },
    // user1 user1
    { email: "user1", password: "$2y$04$43ZuEY1MralRFFdTxsUaeunvaZN8wk/L74TE/cMAwiQDCw5BxCp3.", role: "user" },
    // user2 user2
    { email: "user2", password: "$2y$04$BKJutNXXRw/JOuf2d3g/0e6cLeYOq63Qz/by0jUFmlx6jpEfVpRRa", role: "user" },
])
db.waste.insert([
    { type: "paper", quantity: 1, account: acc1, date: new Date("2020-06-01") },
    { type: "paper", quantity: 2, account: acc1, date: new Date("2020-06-02") },
    { type: "plastic", quantity: 3, account: acc1, date: new Date("2020-06-03") },
    { type: "plastic", quantity: 4, account: acc1, date: new Date("2020-06-04") },
    { type: "glass", quantity: 5, account: acc1, date: new Date("2020-06-05") },
    { type: "glass", quantity: 6, account: acc1, date: new Date("2020-06-06") },

    { type: "paper", quantity: 2, account: acc2, date: new Date("2020-06-07") },
    { type: "paper", quantity: 4, account: acc2, date: new Date("2020-06-08") },
    { type: "plastic", quantity: 10, account: acc2, date: new Date("2020-06-09") },
    { type: "plastic", quantity: 4, account: acc2, date: new Date("2020-06-10") },
    { type: "glass", quantity: 1, account: acc2, date: new Date("2020-06-11") },
    { type: "glass", quantity: 1, account: acc2, date: new Date("2020-06-12") },
])