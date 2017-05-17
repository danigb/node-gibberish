const createSpeaker = require('audio-speaker/direct');
const util = require('audio-buffer-utils')
const createGenerator = require('audio-generator');
const Gibberish = require('gibberish-dsp')

const output = createSpeaker();

const SIZE = 4096
const SR = 44100
const buffer = util.create(SIZE, 2, SR)
console.log('BUFFER', buffer)

function initGibberish () {
  Gibberish.out = new Gibberish.Bus2();
  Gibberish.out.codegen(); // make sure bus is first upvalue so that clearing works correctly
  Gibberish.dirty(Gibberish.out);
  Gibberish.context = {
    sampleRate: SR
  }
}

initGibberish()
const bass = new Gibberish.MonoSynth({
    attack: 44,
    decay: Gibberish.Time.beats(0.25),
    filterMult: 0.25,
    octave2: 0,
    octave3: 0
})
Gibberish.audioProcessFirefox(buffer)
output(buffer)

function generateSines (buffer) {

}


function loop (err, buf) {
  Gibberish.audioProcessFirefox(buffer)
	output(buffer, loop);
};