import {Request} from "express";
import {FileFilterCallback} from "multer";
import {HttpException, HttpStatus} from "@nestjs/common";

/**
 * @public
 * @desc проверяет изображение
 * @param {Request} req - объёкт запроса
 * @param {Express.Multer.File} file - загруженное изображение
 * @param {FileFilterCallback} cd - функция решения фильтра
 * */
export const fileAvatarFilter = (req: Request, file: Express.Multer.File, cd: FileFilterCallback) => {
    if (!file) cd(null, true)
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cd(null, true)
    } else {
        cd(new HttpException('Не то тип файла', HttpStatus.BAD_REQUEST))
    }
}
