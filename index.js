const createSpeaker = require('audio-speaker/direct');
const Buffer = require('audio-buffer-utils')
const Gibberish = require('gibberish-dsp')

const buffer = Buffer.create(4096, 2, 44100)
const empty = Buffer.create(4096, 2, 44100)

let output = createSpeaker();

// example of how to use the buffers
function stereoNoise (buffer) {
  const data = Buffer.data(buffer)
	for (let i = 0; i < 4096; i++) {
		data[0][i] = Math.random() - 0.5
		data[1][i] = Math.random() - 0.5
	}
  return buffer
}

function initGibberish () {
  Gibberish.out = new Gibberish.Bus2();
  Gibberish.out.codegen(); // make sure bus is first upvalue so that clearing works correctly
  Gibberish.dirty(Gibberish.out);
  // mock AudioContext
  Gibberish.context = {
    sampleRate: 44100
  }
}

initGibberish()
const pluck = new Gibberish.KarplusStrong({ damping: 0.6 }).connect();
pluck.note(220);

const e = { outputBuffer: buffer, inputBuffer: empty }

function loop (err, buf) {
  Gibberish.audioProcess(e)
	output(buffer, loop);
};

loop()