// Uploads public/assets/vedios/*.mp4 (and their posters) to Supabase Storage so
// they are served from Supabase's CDN instead of the Vercel deployment bundle.
//
//   node --env-file=.env.local scripts/move-videos-to-supabase.mjs            # upload only
//   node --env-file=.env.local scripts/move-videos-to-supabase.mjs --remove-local
//
// --remove-local deletes the local copies after a successful upload; the site
// lists local + Supabase videos together, so keep only one copy of each.
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "portfolio-assets";
const PREFIX = "videos";
const dir = path.join(process.cwd(), "public", "assets", "vedios");
const removeLocal = process.argv.includes("--remove-local");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (e.g. --env-file=.env.local).");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

async function existing(prefix) {
  const { data, error } = await supabase.storage.from(BUCKET).list(prefix, { limit: 1000 });
  if (error) throw error;
  return new Set(data.map((entry) => entry.name));
}

async function upload(localPath, objectPath, contentType, already) {
  const name = path.basename(objectPath);
  if (already.has(name)) {
    console.log(`skip  ${objectPath} (already uploaded)`);
    return true;
  }
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(objectPath, fs.readFileSync(localPath), { contentType, upsert: false });
  if (error) {
    console.error(`FAIL  ${objectPath}: ${error.message}`);
    return false;
  }
  console.log(`ok    ${objectPath}`);
  return true;
}

const videos = fs.readdirSync(dir).filter((name) => name.toLowerCase().endsWith(".mp4"));
const uploadedVideos = await existing(PREFIX);
const uploadedPosters = await existing(`${PREFIX}/posters`);

for (const video of videos) {
  const ok = await upload(path.join(dir, video), `${PREFIX}/${video}`, "video/mp4", uploadedVideos);
  const poster = `${video.replace(/\.mp4$/i, "")}.jpg`;
  const posterPath = path.join(dir, "posters", poster);
  if (fs.existsSync(posterPath)) {
    await upload(posterPath, `${PREFIX}/posters/${poster}`, "image/jpeg", uploadedPosters);
  }
  if (ok && removeLocal) {
    fs.unlinkSync(path.join(dir, video));
    console.log(`rm    public/assets/vedios/${video}`);
  }
}
