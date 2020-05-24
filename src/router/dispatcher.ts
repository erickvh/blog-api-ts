import { IncomingMessage, ServerResponse } from 'http';
import { UrlWithParsedQuery, parse } from 'url';
import { router } from './router';

// parse url and get method and path
export const dispatcher = async (req: IncomingMessage, res: ServerResponse) => {
    const urlParsed: UrlWithParsedQuery = parse(String(req.url), true);
    const path: string = String(urlParsed.path);
    const method: string = String(req.method);

    await router(path, method, res, req);
};
