import { Client, ClientConfig } from 'pg';
import { databaseSettings } from '../settings';

const clientConfig = databaseSettings as ClientConfig;
const client: Client = new Client(clientConfig);
client.connect();

export default client;
