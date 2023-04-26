import { useAppStoreWithOut } from '@/store/modules/app'
import smCrypto from 'sm-crypto'
import { customAlphabet } from 'nanoid'
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

/**
 * @desc 获取userName和userId
 */
export function getUserInfo(): { sysUserId: number; sysUsername: string } {
  const appStore = useAppStoreWithOut()
  const userInfo = appStore.userInfo
  return { sysUserId: userInfo.userId, sysUsername: userInfo.userName }
}

/**
 * @desc:  获取token
 */
export function getToken(): string {
  const appStore = useAppStoreWithOut()
  const userInfo = appStore.userInfo
  return userInfo.token
}

/**
 * @desc:  获取是否加密
 */
export function getEncryptEnable(): boolean {
  const appStore = useAppStoreWithOut()
  return appStore.encryptEnable
}

/**
 * @desc:  获取客户端公钥
 */
export function getClientPublicKey(): string {
  const appStore = useAppStoreWithOut()
  return appStore.encryptKey.publicKey
}

/**
 * @desc:  获取客户端私钥
 */
export function getClientPrivateKey(): string {
  const appStore = useAppStoreWithOut()
  return appStore.encryptKey.privateKey
}

/**
 * @desc:  获取随机字符串
 */
export function getRandomString(): string {
  const appStore = useAppStoreWithOut()
  return appStore.randomString
}

/**
 * @desc 生成secretKey
 */
export function generateSecretKey(): string {
  const appStore = useAppStoreWithOut()
  const encryptInstance = new JSEncrypt()
  const servePublicKey = appStore.servePublicKey
  // 公钥
  encryptInstance.setPublicKey(servePublicKey)
  const secretKey = encryptInstance.encrypt(getRandomString()) as string
  return secretKey
}

/**
 * @desc 生成摘要
 */
export function generateSignature(type: string | undefined, params: any) {
  const sm3 = smCrypto.sm3
  let signature = ''
  if (type === 'get') {
    signature = sm3(`query=${formatGetParams(params)}&body=&secretKey=${getRandomString()}`)
  } else {
    signature = sm3(`query=&body=${params ? JSON.stringify(params) : ''}&secretKey=${getRandomString()}`)
  }
  return signature
}

/**
 * @desc 返回xx位随机字符传
 */
export function randomString(e?: number) {
  const nanoid = customAlphabet('abcdef0123456789', e || 32)
  const randomId = nanoid()
  return randomId
}

/**
 * @desc RSA生成公钥和私钥
 */
export function generateKey() {
  const encryptInstance = new JSEncrypt()
  //公钥
  const publicKey = formatKey(encryptInstance.getPublicKey())
  //私钥
  const key = encryptInstance.getPrivateKey()
  const privateKey = formatKey(key)
  return { encryptInstance, publicKey, privateKey }
}

const formatKey = (key: string) => {
  const keyArray = key.split('\n')
  keyArray.splice(0, 1)
  keyArray.splice(keyArray.length - 1, 1)
  return keyArray.join('')
}

/**
 * @desc 公钥加密
 * @param encryptInstance 加密实例
 * @param publicKey 加密的公钥
 * @param plaintext 被加密的字符串
 */
export function publicKeyEncrypt(encryptInstance: any, publicKey: string, plaintext: Object | string) {
  if (plaintext instanceof Object) {
    plaintext = JSON.stringify(plaintext)
  }
  if (publicKey) {
    encryptInstance.setPublicKey(publicKey)
  }
  return encryptInstance.encrypt(plaintext)
}

/**
 * @desc 私钥解密
 */
export function privateKeyDecrypt(ciphertext: string, responseData: string) {
  const encryptInstance = new JSEncrypt()
  encryptInstance.setPrivateKey(getClientPrivateKey())
  const serverSecretKey = encryptInstance.decrypt(ciphertext) as string
  const sm4 = smCrypto.sm4
  // 解密需要的是16进制
  let decryptData = sm4.decrypt(base64ToHex(responseData), base64ToHex(serverSecretKey))
  // 判断解密结果如果是对象
  if (decryptData.charAt(0) === '{' || decryptData.charAt(0) === '[') {
    decryptData = JSON.parse(decryptData)
  }
  return decryptData
}

function base64ToHex(str: string) {
  const raw = window.atob(str)
  let result = ''
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16)
    result += hex.length === 2 ? hex : '0' + hex
  }
  return result
}

/**
 * @desc 使用sm4加密请求参数
 */
export function encryptRequestParams(method: string | undefined, params: any) {
  const sm4 = smCrypto.sm4
  let encryptParams = ''
  if (method === 'GET') {
    if (params && Object.keys(params).length > 0) {
      console.log(formatGetParams(params))
      encryptParams = sm4.encrypt(formatGetParams(params), getRandomString())
    }
  } else {
    if (params) {
      encryptParams = sm4.encrypt(JSON.stringify(params), getRandomString())
    }
  }
  return encryptParams
}

function formatGetParams(params: any) {
  let parameters = ''
  for (const key in params) {
    if (typeof params[key] === 'number' || params[key]) {
      parameters += `${key}=${params[key]}&`
    }
  }
  return parameters === '' ? '' : parameters.slice(0, parameters.length - 1)
}
