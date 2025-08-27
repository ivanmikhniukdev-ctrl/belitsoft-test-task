
import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const dbDir = path.join(__dirname, '..', 'db');
const usersPath = path.join(dbDir, 'users.json');
const rolesPath = path.join(dbDir, 'roles.json');

type Role = { id: string; name: string };
type User = { id: string; name: string; email: string; roles: string[] };

const readJson = <T>(p: string): T => {
  const raw = fs.readFileSync(p, 'utf-8');
  return JSON.parse(raw) as T;
};

const writeJson = <T>(p: string, data: T) => {
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
};

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.get('/api/roles', (_req: Request, res: Response) => {
  const roles = readJson<Role[]>(rolesPath);
  setTimeout(() => {
    res.json(roles);
  }, 3000);
});

app.get('/api/users', (_req: Request, res: Response) => {
  const users = readJson<User[]>(usersPath);
  setTimeout(() => {
    res.json(users);
  }, 3000);
});

app.patch('/api/users/:id/roles', (req: Request, res: Response) => {
  const { id } = req.params;
  const incoming = req.body as { roles?: string[] };

  if (!incoming || !Array.isArray(incoming.roles)) {
    return res.status(400).json({ message: 'Invalid body. Expected { roles: string[] }' });
  }

  const roles = readJson<Role[]>(rolesPath);
  const validRoleIds = new Set(roles.map(r => r.id));

  for (const roleId of incoming.roles) {
    if (!validRoleIds.has(roleId)) {
      return res.status(400).json({ message: `Unknown role id: ${roleId}` });
    }
  }

  const users = readJson<User[]>(usersPath);
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (Math.random() < 0.10) {
    return res.status(500).json({ message: 'Randomized failure — please retry' });
  }

  const updated: User = { ...users[idx], roles: Array.from(new Set(incoming.roles)) };
  users[idx] = updated;
  writeJson(usersPath, users);

  setTimeout(() => {
    res.json(updated);
  }, 3000);
});


app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

app.use((_req, res, next) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store',
  });
  next();
});
