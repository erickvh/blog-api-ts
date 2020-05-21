import { routes } from './routes';
import { ServerResponse } from 'http';
import { RESPONSE_CODES } from '../enums/responseCodes';

// resolve routes and methods
export const router = async (
    path: string,
    method: string,
    res: ServerResponse
) => {
    // check if a route match with method and path
    const isAnExistedRoute = routes.some((route) => {
        return route.regex.test(path);
    });

    if (isAnExistedRoute) {
        const isAnAllowedMethod = routes.some((route) => {
            return route.method === method;
        });
        isAnAllowedMethod || response(res, 405);
    }
    // if it's false generate a response 404
    isAnExistedRoute || response(res, 404);
};

const response = (res: ServerResponse, code: number, message?: string) => {
    res.writeHead(code, {
        'content-Type': 'application/json',
    });
    res.write(
        JSON.stringify({
            status: code,
            message: message ? message : RESPONSE_CODES[code],
        })
    );
};
