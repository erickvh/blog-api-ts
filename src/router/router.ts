import { routes } from './routes';
import { ServerResponse, IncomingMessage } from 'http';
import { response } from './response';
// resolve routes and methods
export const router = async (
    path: string,
    method: string,
    res: ServerResponse,
    req: IncomingMessage
) => {
    // check if a route match with method and path
    let isAnAllowedMethod: boolean = false;
    let isAnExistedRoute: boolean = false;

    isAnExistedRoute = routes.some((route) => {
        return route.regex.test(path);
    });

    if (isAnExistedRoute) {
        isAnAllowedMethod = routes.some((route) => {
            return route.method === method;
        });

        isAnAllowedMethod || response(res, 405);
    }
    // if it's false generate a response 404
    isAnExistedRoute || response(res, 404);

    routes.forEach((route) => {
        if (route.method === method && route.regex.test(path)) {
            route.controller(res, req);
        }
    });
};
