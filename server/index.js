import express from 'express';
import { config } from './config.js';
import { ensureDataDir } from './utils/fileStorage.js';
import unitsRouter from './routes/units.js';
import projectsRouter from './routes/projects.js';
import settingsRouter from './routes/settings.js';

// Initialize data directory
await ensureDataDir();

const app = express();
app.use(express.json());

// API routes
app.use('/api/units', unitsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/settings', settingsRouter);

// Serve static files in production
if (config.isProd) {
  app.use(express.static(config.distDir));
  app.get('*', (req, res) => {
    res.sendFile(join(config.distDir, 'index.html'));
  });
}

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});