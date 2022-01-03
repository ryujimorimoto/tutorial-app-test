import { Client } from 'pg';

const client = new Client({
  user: 'techgeek',
  host: 'localhost',
  database: 'sampledb',
  password: '',
  port: 5432,
});

client.connect();

module.exports = {
  client,
}
