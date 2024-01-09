const express = require('express')

const fsService = require('./fs.service');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users', async (req, res) => {
    try {
        const users = await fsService.readerDataBase();
        if (!users) {
            throw new Error('internal server error');
        }
        res.json(users);
    } catch (e) {
        res.status(500).json(e.message);
    }
});

app.post('/users', async (req, res) => {
    try {
        const {name, age, email} = req.body;

        if (name.length < 2) {
            throw new Error('user name must be longer than 3 characters');
        }
        if (age < 1) {
            throw new Error('user age - not less than zero');
        }

        const users = await fsService.readerDataBase();
        const lastId = users[users.length - 1].id;
        const newUser = {id: lastId + 1, name, age, email};
        users.push(newUser);

        await fsService.writeDataBase(users);

        res.status(201).json(newUser);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const users = await fsService.readerDataBase();
        const user = users.find((user) => user.id === Number(id));

        if (!user) {
            throw new Error('user not found');
        }

        res.json(user);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name, age, email} = req.body;

        if (!name || name.length < 2) {
            throw new Error('user name must be longer than 3 characters');
        }
        if (!age || age < 1) {
            throw new Error('user age - not less than zero');
        }
        if (!email || !email.includes('@')) {
            throw new Error('user email address is not valid');
        }

        const users = await fsService.readerDataBase();
        const user = users.find((user) => user.id === Number(id));

        if (!user) {
            throw new Error('user not found');
        }

        user.name = name;
        user.age = age;
        user.email = email;

        await fsService.writeDataBase(users);

        res.status(201).json(user);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

app.patch('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name, age, email} = req.body;

        const users = await fsService.readerDataBase();
        const user = users.find((user) => user.id === Number(id));

        if (!user) {
            throw new Error('user not found');
        }

        if (name && (!name || name.length < 2)) {
            throw new Error('user name must be longer than 3 characters');
        }
        if (name) user.name = name;

        if (age && (!age || age < 1)) {
            throw new Error('user age - not less than zero');
        }
        if (age) user.age = age;

        if (email && (!email || !email.includes('@'))) {
            throw new Error('user email address is not valid');
        }
        if (email) user.email = email;

        await fsService.writeDataBase(users);

        res.status(201).json(user);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const users = await fsService.readerDataBase();
        const user = users.findIndex((user) => user.id === Number(id));

        if (!user) {
            throw new Error('user not found');
        }

        users.splice(user, 1);

        await fsService.writeDataBase(users);

        res.sendStatus(204);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    fsService.createDataBase().then();
    console.log(`Server has started on PORT ${PORT}`);
});
