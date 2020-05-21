import { ServerResponse, IncomingMessage, Server } from 'http';
import { QueryResult, Query } from 'pg';
import client from '../db/db';
import { RESPONSE_CODES } from '../enums/responseCodes';
import { response } from '../router/response';
import { parseData } from '../helpers/parseData';
import { UrlWithParsedQuery, parse } from 'url';

export const getPosts = async (res: ServerResponse) => {
    try {
        const result: QueryResult = await client.query(
            'select * from posts where deleted=false order by created_at desc'
        );

        response(
            res,
            RESPONSE_CODES.OK,
            undefined,
            JSON.stringify(result.rows)
        );
    } catch {
        response(res, 500);
    }
};

export const createPost = async (res: ServerResponse, req: IncomingMessage) => {
    let data = await parseData(req);
    let result: QueryResult = await client.query(
        `insert into posts values(default,'${data.title}','${data.content}','${data.description}',default,default,null)`
    );
    response(res, RESPONSE_CODES.CREATED, 'Post created sucessfully');
};

export const getPost = async (res: ServerResponse, req: IncomingMessage) => {
    let result: QueryResult = await client.query(
        `select * from posts where id=${getId(req)}`
    );
    response(res, RESPONSE_CODES.OK, undefined, JSON.stringify(result.rows));
};

export const updatePost = async (res: ServerResponse, req: IncomingMessage) => {
    let data = await parseData(req);
    const id: number = getId(req);
    let result: QueryResult = await client.query(
        `update  posts set title='${data.title}', 
                    content='${data.content}',
                    description='${data.description}',
                    updated_at=now()
                    where id=${id}
                    `
    );

    response(
        res,
        RESPONSE_CODES['NO CONTENT'],
        `Post id: ${id} updated sucessfully`
    );
};

export const deletePost = async (res: ServerResponse, req: IncomingMessage) => {
    const id: number = getId(req);
    let result: QueryResult = await client.query(
        `delete from posts where id=${id}`
    );

    response(
        res,
        RESPONSE_CODES['NO CONTENT'],
        `Post id: ${id} was deleted sucessfully`
    );
};

const getId = (req: IncomingMessage) => {
    const urlParsed: UrlWithParsedQuery = parse(String(req.url), true);
    const path: string = String(urlParsed.path);
    let id: number = Number(path.split('/posts/')[1]);
    if (Number.isNaN(id)) {
        const includes_extra = path.split('/posts/')[1];
        id = Number(includes_extra.split('/')[0]);
    }

    return id;
};
