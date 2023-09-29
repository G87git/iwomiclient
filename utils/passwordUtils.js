import CryptoJs from 'crypto-js'

var iv = CryptoJs.enc.Utf8.parse("InitVectoryann21");
var key = CryptoJs.enc.Utf8.parse("iwomiNomencltKey");

export const Encrpt = (text) => {
    return CryptoJs.AES.encrypt(text, key, { iv: iv }).toString();
  };
  export const Decrypt = (encrypted) => {
    return CryptoJs.AES.decrypt(encrypted, key, { iv: iv }).toString(
        CryptoJs.enc.Utf8
    );
};
export const encode = text => CryptoJs.SHA512(text).toString();

export const encode64 = text => {
  let utf8 = CryptoJs.enc.Utf8.parse(text);
  return CryptoJs.enc.Base64.stringify(utf8); 
}