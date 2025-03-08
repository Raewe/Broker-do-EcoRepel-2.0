import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function checkIfPagesExist(file: string): Boolean {
    let filename = path.basename(file, ".ejs");

    if (filename === "/" || filename === "") {
        console.error("The page name is invalid!");
        return false;
    } else if (!filename.startsWith("/")) {
        filename = `/${filename}`;
    }

    if (fs.existsSync(path.join(__dirname, `../views/pages${filename}.ejs`))) {
        return true;
    } else {
        console.error("Page not found !");
        return false;
    }
}
