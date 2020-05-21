import { IRoute } from '../interfaces/IRoute';
import {
    getPosts,
    createPost,
    getPost,
    updatePost,
} from '../controllers/Posts';
// list of available routes on api
export const routes: IRoute[] = [
    { regex: /^\/posts\/?$/, method: 'GET', controller: getPosts },
    { regex: /^\/posts\/?$/, method: 'POST', controller: createPost },
    { regex: /^\/posts\/([0-9]+)\/?$/, method: 'GET', controller: getPost },
    { regex: /^\/posts\/([0-9]+)\/?$/, method: 'PUT', controller: updatePost },
];
