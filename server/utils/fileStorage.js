import fs from 'fs/promises';
import { join } from 'path';
import { config } from '../config.js';

export async function ensureDataDir() {
  try {
    await fs.access(config.dataDir);
  } catch {
    await fs.mkdir(config.dataDir);
  }
}

export async function readJsonFile(filename) {
  try {
    const data = await fs.readFile(join(config.dataDir, filename));
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export async function writeJsonFile(filename, data) {
  await fs.writeFile(
    join(config.dataDir, filename),
    JSON.stringify(data, null, 2)
  );
}