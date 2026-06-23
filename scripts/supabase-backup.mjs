import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const url = requiredEnv("SUPABASE_URL").replace(/\/+$/, "");
const key = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
const tables = requiredEnv("BACKUP_TABLES").split(",").map((table) => table.trim()).filter(Boolean);
const outputDir = process.env.BACKUP_OUTPUT_DIR || "backup";
const pageSize = Number(process.env.BACKUP_PAGE_SIZE || 1000);

await mkdir(outputDir, { recursive: true });

const backup = {
  created_at: new Date().toISOString(),
  source: url,
  tables: {},
};

for (const table of tables) {
  backup.tables[table] = await fetchAllRows(table);
  console.log(`${table}: ${backup.tables[table].length} rows`);
}

const stamp = backup.created_at.replaceAll(":", "-").replace(/\.\d{3}Z$/, "Z");
const filename = join(outputDir, `supabase-backup-${stamp}.json`);
await writeFile(filename, JSON.stringify(backup, null, 2));
await writeFile(join(outputDir, "manifest.json"), JSON.stringify({
  created_at: backup.created_at,
  source: url,
  tables: Object.fromEntries(Object.entries(backup.tables).map(([table, rows]) => [table, rows.length])),
  backup_file: filename.split("/").pop(),
}, null, 2));

async function fetchAllRows(table) {
  const rows = [];
  for (let offset = 0; ; offset += pageSize) {
    const page = await fetchRows(table, offset, offset + pageSize - 1);
    rows.push(...page);
    if (page.length < pageSize) return rows;
  }
}

async function fetchRows(table, start, end) {
  const response = await fetch(`${url}/rest/v1/${encodeURIComponent(table)}?select=*`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Range: `${start}-${end}`,
      "Range-Unit": "items",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`${table} backup failed: ${response.status} ${detail}`);
  }
  return response.json();
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}
