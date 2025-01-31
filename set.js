const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEUwN0RMVHFob2JYVGZzbzJXTFBCaTRGa1h5VW1BL3ZhT05udTFJVHBYaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWNJMGR5SDZLT3o5ZUN2b25CWkZKRmlNU2NWSmFKM2M1Zjc4ZjA4UVJTZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnTEZDY20ybjV1MmZlL2g0TjZncUV0blJob1M5K3hWdVc4NjFxeHlCU0ZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvSk1lc0ZCMlRLRHpMWXk3MktyWHplR3k4UlMyM3loa0tRY0s3NXRCbHc0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllOclg4MnVoWkltbWxFRWxKZXAxMFAxeDFDc3RrL2x1ZlN5Qjcya3h3bFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InN2VXptNHRtcGpTSzBCdUUrTDRINTlzdzZrOW1VckJWUzNUUjVicnRDMWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUtLZ1FwNmdXdVU5SXk4SVJEQXNEcGxnVFBsZElvazBLK1VLVmtIaWlYcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTFYdGFhMkFOZndndTNKZjk0SWFBcktlWHY5R3YvYUFrY1Mrd0dwWDBEST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1vWnZOK1Nackp3dmhJN29kR0ErOE0xQndhNUdSTmxTL2RZeHFPZHVaTmhtWmY1VEwzZzEwV2VXcUNIbDJ2QkVFU2IvZ2w2NVRKTUoxWFM1TWRPcEFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM1LCJhZHZTZWNyZXRLZXkiOiJLQ0tlckg3REp5RVd1bllLa2NXLzNhczhyQWI0VUkraE5DNzBhdWZHR1JnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1Njc1MTYxNzc4OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5NEI2RUQzRUNBOTBEODdGM0I4QjBGOTMwODc3MUEyRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM4MzY1NTIwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJWMTlOYm5JcFRJbWQweU96WDE4d1N3IiwicGhvbmVJZCI6ImNlOGJkYmYzLWM3ZGYtNDUwYS04ZDY3LWJjZGQ3MjRmYmQyZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmWVBTM3dQS3RSNWJIWitNT1EzL3BMMElqVWs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUxGb2RKc0JKckcvUGJwNnUvbkZMTmVwcnhRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IktBMzc5Wjk5IiwibWUiOnsiaWQiOiIyNTY3NTE2MTc3ODg6NTdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ08yNndja0JFTDYwOWJ3R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IncwdnhGekV4ZDlaZWM0RnZUclNEL1hqa1ExbkMwSmcxYTBGSGpOT0VwVms9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjZpTjEveVUvTExkOTJLRk9DTlp2L3Voa0luc1M3c1dudlFKOE9OVE9YU1NZaVppQjI4TXo2QW9QWUhrVkdTMk9tZ2dEeVRseSt1UlpRMDJERUtXeER3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJwVkptb3IzTXBld094dmI5UUY1THMzMVhZSlpWNWVWZVdnK0srZHhmY09LSFlRdkRRaU51cTlvTkRxNVhwYjJTR0VTcWVJbWJRaUtyUmRIaEducUhDUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1Njc1MTYxNzc4ODo1N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjTkw4UmN4TVhmV1huT0JiMDYwZy8xNDVFTlp3dENZTld0QlI0elRoS1ZaIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM4MzY1NTE2fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "> ZIK",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 256751617788",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'no', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


                  
