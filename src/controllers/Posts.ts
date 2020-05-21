import { ServerResponse, IncomingMessage } from 'http';
import { QueryResult, Query } from 'pg';
import client from '../db/db';
import { RESPONSE_CODES } from '../enums/responseCodes';
import { response } from '../router/response';
import { parseData } from '../helpers/parseData';

export const getPosts = async (res: ServerResponse) => {
    try {
        const result: QueryResult = await client.query(
            'select * from posts where deleted=false order by created_at desc'
        );

        response(res, 200, undefined, JSON.stringify(result.rows));
    } catch {
        response(res, 500);
    }
};

export const createPost = async (res: ServerResponse, req: IncomingMessage) => {
    console.log(req);
    let data = await parseData(req);
    let result: QueryResult = await client.query(
        `insert into posts values(default,'${data.title}','${data.content}','${data.description}',default,default,null)`
    );
    response(res, RESPONSE_CODES.CREATED, 'Post created sucessfully');
};
