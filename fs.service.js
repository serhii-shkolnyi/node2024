const fs = require('node:fs/promises');
const path = require('node:path');

const dbPath = path.join(process.cwd(), 'dataBase.json');

const userTest = [{id: 1, name: 'name', age: 18, email: 'test@gmail.com'}];
const userJson = JSON.stringify(userTest);

const createDataBase = async () => {
    await fs.writeFile(dbPath, `${userJson}`);
}

const readerDataBase = async () => {
    const usersJson = await fs.readFile(dbPath, {encoding: 'utf-8'});
    return JSON.parse(usersJson);
}

const writeDataBase = async (user)=> {
    await fs.writeFile(dbPath, JSON.stringify(user));
}

module.exports = {
    createDataBase,
    readerDataBase,
    writeDataBase,
}