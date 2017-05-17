const Buffer = require('audio-buffer-utils')

const buffer = Buffer.create(4096, 2, 44100)
var data = Buffer.data(buffer);