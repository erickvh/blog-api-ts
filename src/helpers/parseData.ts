import { IncomingMessage } from 'http';

export const parseData = async (req: IncomingMessage) => {
    let data: string = '';
    await req.on('data', (chunk: string) => {
        data += chunk;
    });
    return JSON.parse(data);
};
