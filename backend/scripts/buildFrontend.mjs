import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Prevent recursive execution when child npm commands run postinstall
if (process.env.NINETYPTE_BUILDING_FRONTEND === '1') {
  process.exit(0);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(__dirname, '..');
const repoRootDir = path.resolve(backendDir, '..');
const frontendDir = path.join(repoRootDir, 'frontend');
const frontendPkgJson = path.join(frontendDir, 'package.json');
const frontendDistDir = path.join(frontendDir, 'dist');
const backendPublicDir = path.join(backendDir, 'public');

if (!fs.existsSync(frontendPkgJson)) {
  console.log('[NinetyPTE Build] Skipping frontend build (frontend/package.json not found).');
  process.exit(0);
}

const childEnv = {
  ...process.env,
  NINETYPTE_BUILDING_FRONTEND: '1',
  // Ensure devDependencies (vite, tailwindcss, react plugin) install even when host sets NODE_ENV=production
  NODE_ENV: 'development',
};

const npmBin = process.platform === 'win32' ? 'npm.cmd' : 'npm';

console.log('[NinetyPTE Build] Installing frontend dependencies...');
execSync(`${npmBin} install --include=dev --no-audit --no-fund`, {
  cwd: frontendDir,
  env: childEnv,
  stdio: 'inherit',
});

console.log('[NinetyPTE Build] Building React frontend bundle...');
execSync(`${npmBin} run build`, {
  cwd: frontendDir,
  env: { ...process.env, NINETYPTE_BUILDING_FRONTEND: '1' },
  stdio: 'inherit',
});

if (fs.existsSync(path.join(frontendDistDir, 'index.html'))) {
  fs.rmSync(backendPublicDir, { recursive: true, force: true });
  fs.cpSync(frontendDistDir, backendPublicDir, { recursive: true });
  console.log('[NinetyPTE Build] Synced frontend/dist -> backend/public successfully.');
}
