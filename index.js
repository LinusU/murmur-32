import encodeUtf8 from 'encode-utf8'
import fmix from 'fmix'

const C = new Uint32Array([
  0xcc9e2d51,
  0x1b873593
])

function rotl (m, n) {
  return (m << n) | (m >>> (32 - n))
}

function body (key, hash) {
  const blocks = (key.byteLength / 4) | 0
  const view32 = new Uint32Array(key, 0, blocks)

  for (let i = 0; i < blocks; i++) {
    view32[i] = Math.imul(view32[i], C[0])
    view32[i] = rotl(view32[i], 15)
    view32[i] = Math.imul(view32[i], C[1])

    hash[0] = (hash[0] ^ view32[i])
    hash[0] = rotl(hash[0], 13)
    hash[0] = Math.imul(hash[0], 5) + 0xe6546b64
  }
}

function tail (key, hash) {
  const blocks = (key.byteLength / 4) | 0
  const reminder = (key.byteLength % 4)

  let k = 0
  const tail = new Uint8Array(key, blocks * 4, reminder)
  switch (reminder) {
    case 3:
      k = (k ^ (tail[2] << 16))
      // fallthrough
    case 2:
      k = (k ^ (tail[1] << 8))
      // fallthrough
    case 1:
      k = (k ^ (tail[0] << 0))

      k = Math.imul(k, C[0])
      k = rotl(k, 15)
      k = Math.imul(k, C[1])
      hash[0] = (hash[0] ^ k)
  }
}

function finalize (key, hash) {
  hash[0] = (hash[0] ^ key.byteLength)
  hash[0] = fmix(hash[0])
}

export default function murmur (key, seed) {
  seed = (seed ? (seed | 0) : 0)

  if (typeof key === 'string') {
    key = encodeUtf8(key)
  }

  if (!(key instanceof ArrayBuffer)) {
    throw new TypeError('Expected key to be ArrayBuffer or string')
  }

  const hash = new Uint32Array([seed])

  body(key, hash)
  tail(key, hash)
  finalize(key, hash)

  return hash.buffer
}
