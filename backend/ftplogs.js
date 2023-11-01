import path from 'path';
import fs from 'fs';
import { stat } from 'node:fs/promises';

import * as ftp from 'basic-ftp';

const cache = {}

export async function fetch(dstFolder, ftpInfo, logName) {
  const now = Date.now();
  const dst = path.join(dstFolder, logName);
  let needsDownload = true;
  if(cache[dst]) {
    while(cache[dst].downloading) {
      await new Promise(res => setTimeout(() => res(), 500));
    }
    needsDownload = now - cache[dst].tm > 10000;
  }

  if(needsDownload) {
    cache[dst] = { tm: now, downloading: true };

    let dstSz = 0;
    try {
      const dstInfo = await stat(dst);
      dstSz = dstInfo.size;
    } catch(e) { /* ignore */ }


    try {
    const client = new ftp.Client();
    //client.ftp.verbose = true;
    if(ftpInfo.secure) {
      if(!ftpInfo.secureOptions || ftpInfo.rejectUnauthorized === undefined) {
        ftpInfo.secureOptions = { ...ftpInfo.secureOptions, rejectUnauthorized: false };
      }
    }

    await client.access(ftpInfo);

    const logSz = await client.size(logName);

    if(logSz != dstSz) {
      await client.downloadTo(dst, logName, dstSz);
    }
    cache[dst].downloading = false;

    client.close();
    } catch(e) {
      cache[dst].downloading = false;
      cache[dst].tm = 0;
      throw e;
    }
  }

  return fs.createReadStream(dst);
}
