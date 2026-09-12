import Prompt from './prompt.js';
import SalesPrompt from './salesPrompt.js';
import { GoogleGenAI } from "@google/genai";
import express from 'express';
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

const port = process.env.PORT
const server = process.env.SERVER_URL
const pwd = process.env.LOGINPW

let loggedIn = false

const App = express()
App.set('view engine', 'ejs')
App.set('views', path.join(process.cwd(), '/views'));
App.use(express.json())
App.use(express.static(path.join(process.cwd(), "public")))

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
        res.render(path.join(process.cwd(), '/views/authuser.ejs'))
    } else {
        res.render(path.join(process.cwd(), '/views/index.ejs'))
    }
})

// NEW USER
App.post('/user-login', async function (req, res) {
    let PWD = req.body.user.pwd
    if (PWD === pwd) {
        loggedIn = true
        return res.json({ url: `${process.env.SERVER_URL}auth-user` })
    } else {
        return res.json({ validationError: "Incorrect Password." })
    }
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
        const {part, area} = req.body.salesAssistant
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY3
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY});
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            //PART NAME
            contents: SalesPrompt(part, area),
        });
        return res.json({ Response: response.text });
    };
    
    return res.json({ Response: "User Input Error" });
})

App.get('*', function (req, res) {
    res.render(path.join(process.cwd(), '/views/index.ejs'))
})

App.listen(port, ()=>console.log(server))