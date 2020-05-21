import { IRoute } from '../interfaces/IRoute';
import { getPosts, createPost } from '../controllers/Posts';
// list of available routes on api
export const routes: IRoute[] = [
    { regex: /^\/posts\/?$/, method: 'GET', controller: getPosts },
    { regex: /^\/posts\/?$/, method: 'POST', controller: createPost },
];
