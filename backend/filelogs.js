import path from 'path';
import fs from 'fs';

export async function fetch(folderInfo, logName) {
  const log = path.join(folderInfo.folder, logName);
  return fs.createReadStream(log);
}
