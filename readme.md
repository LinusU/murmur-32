# MurmurHash3 32-bit

MurmurHash3 x86 32-bit implemented in JavaScript.

## Installation

```sh
npm install --save murmur-32
```

## Usage

```js
import murmur32 from 'murmur-32'

murmur32('linus')
//=> ArrayBuffer { 4 }

murmur32(new ArrayBuffer(10))
//=> ArrayBuffer { 4 }
```

## API

### `murmur32(key)`

- `key` (`ArrayBuffer | string`, required)
- returns `ArrayBuffer`

Compute the 32-bit MurmurHash3 of the supplied `key`. If the `key` is given as a string it will be [encoded using the UTF8 encoding](https://github.com/LinusU/encode-utf8).

## See also

- [murmur-128](https://github.com/LinusU/murmur-128) - MurmurHash3 x86 128-bit implemented in JavaScript
