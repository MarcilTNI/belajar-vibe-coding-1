import { Elysia } from 'elysia';
import { db } from './db/index.js';
import { users } from './db/schema.js';

const app = new Elysia()
  .get('/', () => ({
    status: 'success',
    message: 'Welcome to ElysiaJS + Drizzle ORM + MySQL API',
  }))
  .get('/health', () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }))
  .get('/users', async () => {
    try {
      const allUsers = await db.select().from(users);
      return { status: 'success', data: allUsers };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  })
  .listen(process.env.PORT || 3000);

console.log(`🦊 Elysia server is running at ${app.server?.hostname}:${app.server?.port}`);
