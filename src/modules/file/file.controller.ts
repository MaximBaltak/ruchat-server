import {Controller, Get, HttpException, Param, Res} from '@nestjs/common';
import {Response} from "express";
import * as path from 'path';

@Controller('file')
export class FileController {
    @Get(':filename')
    getFile(@Res() response: Response, @Param('filename') fileName: string): void {
        const pathFile = path.join(process.cwd(), process.env.FILE_AVATAR_ROOT_DIR, fileName)
        response.sendFile(pathFile)
    }
}
