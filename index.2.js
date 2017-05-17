const createSpeaker = require('audio-speaker/direct');
const createGenerator = require('audio-generator/direct');
const Buffer = require('audio-buffer-utils')


const buffer = Buffer.create(4096, 2, 44100)
let output = createSpeaker();
const sin = freq => t => Math.sin(t * Math.PI * 2 * freq)
let generate = createGenerator(sin(440))

let gen = (buffer) => {
	const data = Buffer.data(buffer)
	for (let i = 0; i < 4096; i++) {
		data[0][i] = Math.random() - 0.5
		data[1][i] = Math.random() - 0.5
	}
}

(function loop (err, buf) {
	gen(buffer);
	output(buffer, loop);
})();