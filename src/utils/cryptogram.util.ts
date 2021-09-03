import * as crypto from 'crypto';

//随机盐
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/* 
使用盐加密明文密码
*/
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    crypto

      //1000代表迭代次数，16表示长度
      .pbkdf2Sync(password, tempSalt, 1000, 16, 'sha1')
      .toString('base64')
  );
}
