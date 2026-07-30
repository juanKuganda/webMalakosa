import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function emptyBucket(bucketName: string, folderPath: string = "") {
  console.log(`Scanning bucket '${bucketName}' in folder '${folderPath}'...`);
  
  const { data: list, error } = await supabase.storage.from(bucketName).list(folderPath, {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    console.error("Error listing bucket:", error);
    return;
  }

  if (!list || list.length === 0) {
    console.log(`Bucket folder is already empty.`);
    return;
  }

  const filesToRemove = list.map((x) => (folderPath ? `${folderPath}/${x.name}` : x.name));
  
  console.log(`Found ${filesToRemove.length} files. Deleting...`);
  const { data, error: deleteError } = await supabase.storage.from(bucketName).remove(filesToRemove);
  
  if (deleteError) {
    console.error("Error deleting files:", deleteError);
  } else {
    console.log(`Successfully deleted ${data?.length} files from bucket '${bucketName}'.`);
  }
}

async function main() {
  console.log("Starting Storage Cleanup (Production Mode)...");
  // Uploads happen to 'wisata' folder, we'll try emptying the whole bucket or 'wisata'
  await emptyBucket("malakosa", "wisata");
  await emptyBucket("malakosa", "");
  console.log("Cleanup finished.");
}

main();
