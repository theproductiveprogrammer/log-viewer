import path from 'path';
import fs from 'fs';
import { stat } from 'node:fs/promises';

import * as ftp from 'basic-ftp';

export async function fetch(dstFolder, ftpInfo, logName) {
  const client = new ftp.Client();
  //client.ftp.verbose = true;

  if(ftpInfo.secure) {
    if(!ftpInfo.secureOptions || ftpInfo.rejectUnauthorized === undefined) {
      ftpInfo.secureOptions = { ...ftpInfo.secureOptions, rejectUnauthorized: false };
    }
  }

  const dst = path.join(dstFolder, logName);
  let dstSz = 0;
  try {
    const dstInfo = await stat(dst);
    dstSz = dstInfo.size;
  } catch(e) { /* ignore */ }


  await client.access(ftpInfo);

  const logSz = await client.size(logName);

  if(logSz != dstSz) {
    await client.downloadTo(dst, logName, dstSz);
  }

  client.close();

  return fs.createReadStream(dst);
}
