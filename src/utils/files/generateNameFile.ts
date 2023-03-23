import {TypeFiles} from "../../enum/typeFiles";
/**
 * @public
 * @desc генерирует имя файла
 * @param {TypeFiles} typeFile - полный тип файла
 * @param {string} userName - имя пользователя
 * @return {string} - сгенерированное полное имя файла
 * */
export const generateNameFile = (typeFile: TypeFiles, userName: string): string => {
    const extension: string = typeFile.match(/\w+$/i)[0]
    const buffer = Buffer.from(`${new Date().toLocaleDateString()}`, 'utf-8')
    return `${buffer.toString('base64')}${userName}.${extension}`
}
