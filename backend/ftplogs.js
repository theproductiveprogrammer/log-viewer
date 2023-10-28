import * as ftp from 'basic-ftp';

export async function fetch(ftpInfo) {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  ftpInfo.secure = true;
  ftpInfo.secureOptions = { rejectUnauthorized: false };

  await client.access(ftpInfo);

  console.log(await client.list());
  client.close();
}
