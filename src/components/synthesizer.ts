type sineWave = "sine";
type squareWave = "square";
type sawWave = "sawtooth";
type triangleWave = "triangle";

export type lfoWaveform = sineWave | squareWave;
export type lfoDestination = "pitch" | "filterFrequency";
export type waveform = sineWave | squareWave | sawWave | triangleWave;
export type note = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";
export type octave = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ISynthesizer {
  volume: number;
  filterFrequency: number;
  oscWaveform: waveform;
  lfoAmount: number; // between 0 and 100
  lfoFrequency: number; // between 0.1 and 100
  lfoWaveform: lfoWaveform;
  off: () => void;
  play: (note: note, octave: octave) => void;
  stop: () => void;
}

interface SynthesizerConfig {
  initialVolume: number;
  initialFilterFrequency: number;
  initialWaveform: waveform;
}

type keyboard = {
  [key in note]: { [key in octave]: number; };
};

const keyboardFrequencies: keyboard = {
  "C": {
    1: 32.70,
    2: 65.41,
    3: 130.81,
    4: 261.63,
    5: 523.25,
    6: 1046.50,
    7: 2093
  },
  "C#": {
    1: 34.65,
    2: 69.30,
    3: 138.59,
    4: 277.18,
    5: 554.37,
    6: 1108.73,
    7: 2217.50
  },
  "D": {
    1: 36.71,
    2: 73.42,
    3: 146.83,
    4: 293.66,
    5: 587.33,
    6: 1174.66,
    7: 2349.32
  },
  "D#": {
    1: 38.89,
    2: 77.78,
    3: 155.56,
    4: 311.13,
    5: 622.25,
    6: 1244.51,
    7: 2489.02
  },
  "E": {
    1: 41.20,
    2: 82.41,
    3: 164.81,
    4: 329.63,
    5: 659.25,
    6: 1318.51,
    7: 2637.02
  },
  "F": {
    1: 43.65,
    2: 87.31,
    3: 174.61,
    4: 349.23,
    5: 698.46,
    6: 1396.91,
    7: 2793.83
  },
  "F#": {
    1: 46.25,
    2: 92.50,
    3: 185.00,
    4: 369.99,
    5: 739.99,
    6: 1479.98,
    7: 2959.96
  },
  "G": {
    1: 49,
    2: 98.00,
    3: 196.00,
    4: 392.00,
    5: 783.99,
    6: 1567.98,
    7: 3135.97
  },
  "G#": {
    1: 51.9,
    2: 103.83,
    3: 207.65,
    4: 415.30,
    5: 830.61,
    6: 1661.22,
    7: 3322.44
  },
  "A": {
    1: 55,
    2: 110.00,
    3: 220.00,
    4: 440.00,
    5: 880.00,
    6: 1760.00,
    7: 3520
  },
  "A#": {
    1: 58.27,
    2: 116.54,
    3: 233.08,
    4: 466.16,
    5: 932.33,
    6: 1864.66,
    7: 3729.31
  },
  "B": {
    1: 61.74,
    2: 123.47,
    3: 246.94,
    4: 493.88,
    5: 987.77,
    6: 1975.53,
    7: 3951.07
  },  
};

export default class Synthesizer implements ISynthesizer {
  private readonly _context: AudioContext;
  private readonly _gainNode: GainNode;
  private readonly _lfo: OscillatorNode;
  private readonly _lfoGain: GainNode;
  private readonly _filter: BiquadFilterNode;
  private _oscillator: OscillatorNode | undefined;

  constructor(config: SynthesizerConfig) {
    this._context = new AudioContext();
  
    this._gainNode = this._context.createGain();
    this._gainNode.gain.value = config.initialVolume;
    this._gainNode.connect(this._context.destination);
  
    this._filter = this._context.createBiquadFilter();
    this._filter.type = "lowpass";
    this._filter.frequency.value = config.initialFilterFrequency;
    this._filter.connect(this._gainNode);

    this._lfo = this._context.createOscillator();
    this._lfo.frequency.value = 5;
    this._lfo.type = "sine";
    this._lfoGain = this._context.createGain();
    this._lfoGain.gain.value = 0;
    this._lfo.connect(this._lfoGain);
    this._lfo.start();
    this._lfoGain.connect(this._filter.frequency);
  
    this.oscWaveform = config.initialWaveform;
  }

  get volume() {
    return this._gainNode.gain.value;
  }

  set volume(value: number) {
    this._gainNode.gain.value = value;
  }

  get filterFrequency() {
    return this._filter.frequency.value;
  }

  set filterFrequency(frequency: number) {
    this._filter.frequency.value = frequency;
  }

  get lfoAmount() {
    return this._lfoGain.gain.value;
  }

  set lfoAmount(amount: number) {
    this._lfoGain.gain.value = amount;
  }

  get lfoFrequency() {
    return this._lfo.frequency.value;
  }

  set lfoFrequency(frequency: number) {
    this._lfo.frequency.value = frequency;
  }

  get lfoWaveform() {
    return this._lfo.type as lfoWaveform;
  }

  set lfoWaveform(waveform: lfoWaveform) {
    this._lfo.type = waveform;
  }

  oscWaveform: waveform;

  off() {
    if (this._oscillator) {
      this._oscillator.disconnect();
    }
  
    this._filter.disconnect();
    this._gainNode.disconnect();
    this._context.close();    
  }

  play(note: note, octave: octave) {
    if (this._oscillator) {
      this._oscillator.stop();
      this._oscillator.disconnect();
    }
  
    this._oscillator = this._context.createOscillator();
    this._oscillator.connect(this._filter);
    this._oscillator.frequency.value = keyboardFrequencies[note][octave];
    this._oscillator.type = this.oscWaveform;
    // this._lfoGain.connect(this._oscillator.frequency);
    this._oscillator.start();    
  }
  
  stop() {
    if (this._oscillator) {
      this._oscillator.stop();
      this._oscillator.disconnect(this._filter);
      this._oscillator = undefined;  
    }
  }
}