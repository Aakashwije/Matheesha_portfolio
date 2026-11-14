// Sets the admin dashboard password without ever storing it in plain text.
//
//   node scripts/set-admin-password.mjs
//
// Prompts for a password (input hidden), writes its scrypt hash to
// ADMIN_PASSWORD_HASH in .env.local, and creates ADMIN_AUTH_SECRET if it is
// missing. Copy both values into your host's environment variables (Vercel).
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const ENV_FILE = path.join(process.cwd(), ".env.local");
const MIN_LENGTH = 12;
const N = 2 ** 15;

function ask(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    // Hide what is typed.
    rl._writeToOutput = (text) => {
      if (text.startsWith(question)) process.stdout.write(question);
    };
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
  });
}

function upsert(contents, key, value) {
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, "m");
  return pattern.test(contents) ? contents.replace(pattern, line) : `${contents.replace(/\n*$/, "\n")}${line}\n`;
}

if (!process.stdin.isTTY) {
  console.error("Run this in an interactive terminal (not via a pipe or the Claude Code ! prefix).");
  process.exit(1);
}

const password = await ask("New admin password: ");
if (password.length < MIN_LENGTH) {
  console.error(`Password must be at least ${MIN_LENGTH} characters.`);
  process.exit(1);
}
if ((await ask("Repeat password: ")) !== password) {
  console.error("Passwords do not match.");
  process.exit(1);
}

const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(password, salt, 32, { N, maxmem: 256 * N * 8 });
const passwordHash = `scrypt:${N}:${salt.toString("base64url")}:${hash.toString("base64url")}`;

let contents = fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, "utf8") : "";
contents = upsert(contents, "ADMIN_PASSWORD_HASH", passwordHash);

const existingSecret = contents.match(/^ADMIN_AUTH_SECRET=(.+)$/m)?.[1]?.trim();
const secret = existingSecret && existingSecret.length >= 32 ? existingSecret : crypto.randomBytes(48).toString("base64url");
contents = upsert(contents, "ADMIN_AUTH_SECRET", secret);

fs.writeFileSync(ENV_FILE, contents, { mode: 0o600 });

console.log(`
Saved to .env.local. Add these two variables in Vercel (Settings → Environment Variables), then redeploy:

ADMIN_PASSWORD_HASH=${passwordHash}
ADMIN_AUTH_SECRET=${secret}
`);
