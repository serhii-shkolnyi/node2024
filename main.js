const fs = require('node:fs/promises');
const path = require('node:path');

const equation = async () => {
    const basePath = path.join(process.cwd(), 'base-folder');

    const foldersArr = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
    const filesArr = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];

    try {
        await fs.readdir(basePath);
        await fs.rm(basePath, {recursive: true, force: true});
    } catch (e) {
        console.error(e.message);
    }

    await fs.mkdir(basePath, {recursive: true});

    await Promise.allSettled([
        ...foldersArr.map(async (folderName) => {
            const folderPath = path.join(basePath, folderName);
            await fs.mkdir(folderPath, {recursive: true});
        }),
        ...filesArr.map(async (fileName) => {
            const filePath = path.join(basePath, fileName);
            await fs.writeFile(filePath, `${fileName}`);
        }),
    ]);

    const filesNamesBaseFolder = await fs.readdir(basePath);

    filesNamesBaseFolder.map(async (fileNamesBaseFolder) => {
        const stat = await fs.stat(path.join(basePath, fileNamesBaseFolder));

        if (stat.isDirectory() === true) {
            console.log(fileNamesBaseFolder, `this is a folder`)
        }
        if (stat.isFile() === true) {
            console.log(fileNamesBaseFolder, `this is a file`)
        }
    })
}

equation().then();
