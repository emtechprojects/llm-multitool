import Prompt from './prompt.js';
import SalesPrompt from './salesPrompt.js';
import { createDB, dropDB, showAllUsers, addUser, findUser, updateUser, delUser } from "./db_controller.js"; // NEED TO PASS db AS ARGS
import { GoogleGenAI } from "@google/genai";
import express from 'express';
import sqlite from 'sqlite3'
import dotenv from 'dotenv'
import path from 'path'
let sq = sqlite.verbose()
dotenv.config()

const port = process.env.PORT
const local = process.env.LOCAL
let loggedIn = false

const App = express()
App.set('view engine', 'ejs')
App.set('views', path.join(process.cwd(), '/views'));
App.use(express.json())
App.use(express.static(path.join(process.cwd(), "public")))

let sql
const db = new sq.Database("users.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err)
    console.log("Connection to database successfull.")
})
showAllUsers(db)

// const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// HOME
App.get('/', function (req, res) {
    res.render(path.join(process.cwd(), '/views/index.ejs'))
})
App.get('/index', function (req, res) {
    res.render(path.join(process.cwd(), '/views/index.ejs'))
})

// LOGGED IN
App.get('/auth-user', function (req, res) {
    if (loggedIn) {
        res.render(path.join(process.cwd(), '/views/authuser'))
    } else {
        res.render(path.join(process.cwd(), '/views/index'))
    }
})

// NEW USER
App.post('/user-signup', async function (req, res) {
    let foundName = false
    let { name, pwd } = await req.body.user
    sql = `SELECT OID, * FROM users`
    db.all(sql, [], (err, rows) => {
        if (err) throw err
        rows.map(row => {
            console.log(row)
            if (row.name == name) return foundName = true
        })
        if (foundName) return res.json({ validationError: "User name already exists" })
        sql = `INSERT INTO users(name, pwd) VALUES(?,?)`
        db.run(sql, [name, pwd], (err) => {
            if (err) return console.error(err)
            return res.json({ success: "User successfully added to database" })
        })
    })
})

// USER LOGIN
App.post('/user-login', function (req, res) {
    let { name, pwd } = req.body.user
    console.log(name,pwd)
    let foundName = false
    sql = `SELECT OID, * FROM users`
    db.all(sql, [], (err, rows) => {
        if (err) throw err
        rows.forEach(row => {
            if (row.name == name && row.pwd == pwd) return foundName = true
        });
        if (foundName) {
            loggedIn = true
            return res.json({ url: `${local}auth-user` })
        }
        return res.json({ validationError: "User name and password dont match!" })
    })
})

// MAKE REQUEST TO GEMINI WITH VARYING PAYLOADS
App.post('/send-form', async function (req, res) {
    if (req.body.obj) {
        const manuf = req.body.obj.man
        const numb = req.body.obj.num
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY1
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY});
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            //MAN, PART
            contents: Prompt(manuf, numb)
        });
        return res.json({ Response: response.text });
    }
    if (req.body.partName) {
        const partname = req.body.partName
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY2
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY});
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            //PART NAME
            contents: Prompt(null, null, partname),
        });
        return res.json({ Response: response.text });
    };
    if (req.body.salesAssistant) {
        const {name, id} = req.body.salesAssistant
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY3
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY});
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            //PART NAME
            contents: SalesPrompt(name, id),
        });
        return res.json({ Response: response.text });
    };
    
    return res.json({ Response: "User Input Error" });
})

App.get('*', function (req, res) {
    res.render(path.join(process.cwd(), '/views/index.ejs'))
})

App.listen(port, function () { console.log(`click here ${local}`) })