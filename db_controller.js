function createID() {
    let randINT = ''
    for (let i = 1; i < 8; i++) { randINT += `${Math.ceil(Math.random() * 10)}` }
    return randINT
}

// CREATE
export function createDB(db) {
    let sql = `CREATE TABLE IF NOT EXISTS users(ID INTEGER PRIMARY KEY AUTOINCREMENT, uid, name, pwd)`
    db.run(sql, [], (err) => {
        if (err) return console.error(err)
        console.log("Table 'users' created successfully.")
    })
}

// DROP
export function dropDB(db) {
    let sql = `DROP TABLE users`
    db.run(sql, [], err => {
        if (err) return console.error(err)
        console.log(`users table has been dropped`)
    })
}

// SHOW ALL USERS
export function showAllUsers(db) {
    let sql = `SELECT OID, * FROM users`
    db.all(sql, [], (err, rows) => {
        if (err) throw err
        rows.forEach(row => console.log(row))
    })
}

// ADD USER
export function addUser(db, user, pwd) {
    let sql = `INSERT INTO users(uid, name, pwd) VALUES(?,?,?)`
    db.run(sql, [createID(), user, pwd], (err) => {
        if (err) return console.error(err)
        console.table({ success: "User successfully added to database" })
    })
}

// FIND USER
export function findUser(db, user) {
    let sql = 'SELECT *, OID FROM users WHERE NAME = ?'
    db.each(sql, user, (err, row) => {
        if (err) throw err
        console.log('\n',row)
        return row
    })
}

// UPDATE USER
export function updateUser(db, user, pwd) {
    let sql = `UPDATE users SET pwd = '${pwd}' WHERE name = '${user}'`
    db.run(sql, (err) => {
        if (err) throw err
    })
}

// DELETE USER
export function delUser(db, name) {
    let sql = 'DELETE FROM users WHERE name = ?'
    db.run(sql, name, (err) => {
        if (err) throw err
        console.log(`Entry ${name} was deleted`)
    })
}