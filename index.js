const createSpeaker = require('audio-speaker/direct');
const createGenerator = require('audio-generator/direct');
const Buffer = require('audio-buffer-utils')

const buffer = Buffer.create(4096, 2, 44100)

let output = createSpeaker();
let generate = createGenerator(t => Math.sin(t * Math.PI * 2 * 440));

function noise (buffer) {
  const data = Buffer.data(buffer)
	for (let i = 0; i < 4096; i++) {
		data[0][i] = Math.random() - 0.5
		data[1][i] = Math.random() - 0.5
	}
  return buffer
}

(function loop (err, buf) {
	output(noise(buffer), loop);
})();