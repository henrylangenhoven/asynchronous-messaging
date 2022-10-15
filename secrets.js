import * as fs from "fs";

import * as path from "path";

const dir = "asynchronous-messaging-ui/src/environments";
const file = "environment.ts"
const prodFile = "environment.prod.ts"

const content = `${process.env.FIREBASE_CONFIG}`;

fs.access_token(dir, fs.constants.F_OK, (err) => {
    if (err) {
        console.log("src doesn't exist, creating now", process.cwd());
        // create /src
        fs.mkdir(dir, {recursive: true}, (err) => {
            if (err) throw err;
        });
    }
    // write to file
    try {
        fs.writeFileSync(dir + "/" + file, content);
        fs.writeFileSync(dir + "/" + prodFile, content);
        console.log("created successfully in ", process.cwd());
        if (fs.existsSync(dir + "/" + file)) {
            console.log("file is created", path.resolve(dir + "/" + file));
            const str = fs.readFileSync(dir + "/" + file).toString();
            console.log(str)
        }
    } catch (error) {
        console.error(error);
        process.exist(1);
    }
})
