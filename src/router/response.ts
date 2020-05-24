import { ServerResponse } from 'http';
import { RESPONSE_CODES } from '../enums/responseCodes';

export const response = async (
    res: ServerResponse,
    code: number,
    message?: string,
    data?: string
) => {
    res.writeHead(code, {
        'content-Type': 'application/json',
    });
    // response in this case is different
    if (code === 404 || code === 405 || code === 201 || code === 202) {
        res.write(
            JSON.stringify({
                status: code,
                message: message ? message : RESPONSE_CODES[code],
            })
        );
        res.end();
    } else {
        res.end(data);
    }
};
