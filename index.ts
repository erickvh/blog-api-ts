import { Server, createServer, IncomingMessage, ServerResponse } from 'http';
import { port } from './src/settings';
import { dispatcher } from './src/router/dispatcher';

const server: Server = createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
        await dispatcher(req, res);
        res.end();
    }
);

server.listen(port, () => console.log(`Server runing on 127.0.0.1:${port}`));
