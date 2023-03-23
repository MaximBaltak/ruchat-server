import {Injectable} from '@nestjs/common';
import {generateNameFile} from "../../utils/files/generateNameFile";
import {TypeFiles} from "../../enum/typeFiles";
import {join} from "path";
import * as fs from "fs";
import {SavedFile} from "./types/savedFile";

@Injectable()
export class FileService {
    /**
     * @public
     * @desc сохраняет файл на сервере
     * @param {Express.Multer.File} file - загруженный файл
     * @param {string} userName - имя пользователя
     * @return {SavedFile} - информация сохранённого файла
     * */
    public saveFile(file: Express.Multer.File, userName: string): SavedFile {
        const fileName: string = generateNameFile(file.mimetype as TypeFiles, userName)
        const pathFile: string = join(process.cwd(), process.env.FILE_AVATAR_ROOT_DIR, fileName)

        try {
            fs.accessSync(pathFile)
            throw Error('файл существует')
        } catch {
            if (fs.existsSync(join(process.cwd(), process.env.FILE_AVATAR_ROOT_DIR))) {
                fs.open(pathFile, 'w', (err) => {
                    if (err) throw err
                    fs.writeFileSync(pathFile, file.buffer)
                })
            } else {
                fs.mkdir(join(process.cwd(), process.env.FILE_AVATAR_ROOT_DIR), () => {
                    fs.open(pathFile, 'w', (err) => {
                        if (err) throw err
                        fs.writeFileSync(pathFile, file.buffer)
                    })
                })
            }

            return {
                extension: fileName.match(/\w+$/i)[0],
                pathFileServer: pathFile,
                fileName
            }
        }

    }

}
