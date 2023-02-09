import Synthesizer, { lfoDestination, lfoWaveform, note, octave, waveform } from "@/components/synthesizer";
import { FC, useEffect, useRef, useState } from "react";

interface KeyProps {
  keyboardKey: string;
  note: note;
  octave: octave;
  onKeyDown: (note: note, octave: octave) => void;
  onKeyUp: () => void;
}

const Key: FC<KeyProps> = ({ keyboardKey, note, octave, onKeyDown, onKeyUp }) => {
  const [keyDown, setKeyDown] = useState(false);

  useEffect(() => {
    const onKeyDownEventListener = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === keyboardKey.toLowerCase() && !keyDown) {
        onKeyDown(note, octave);
        setKeyDown(true);
      }
    };

    const onKeyUpEventListener = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === keyboardKey.toLowerCase()) {
        onKeyUp();
        setKeyDown(false);
      }
    };

    const visibilityChangedEventListener = () => {
      if (document.hidden) {
        onKeyUp();
      }
    };

    document.addEventListener("keydown", onKeyDownEventListener);
    document.addEventListener("keyup", onKeyUpEventListener);
    document.addEventListener("visibilitychange", visibilityChangedEventListener);

    return () => {
      document.removeEventListener("keydown", onKeyDownEventListener);
      document.removeEventListener("keyup", onKeyUpEventListener);
      document.removeEventListener("visibilitychange", visibilityChangedEventListener);
    };
  }, [keyboardKey, keyDown, note, octave, onKeyDown, onKeyUp]);

  return (
    <div
      onMouseDown={() => onKeyDown(note, octave)}
      onMouseUp={() => onKeyUp()}
    >
      { note }
    </div>
  );
};

export default function Home() {
  const initialVolume = 0.5;
  const initialFilterFrequency = 1000;
  const initialWaveform: waveform = "sawtooth";
  const initialLFOAmount = 0;
  const initialLFOSpeed = 5;
  const initialLFODestination: lfoDestination = "filterFrequency";

  const synthesizerRef = useRef<Synthesizer>();
  const [octave, setOctave] = useState<octave>(3);

  useEffect(() => {
    synthesizerRef.current = new Synthesizer({ initialVolume, initialFilterFrequency, initialWaveform, initialLFODestination });

    return () => {
      synthesizerRef.current?.off();
    };
  }, []);

  useEffect(() => {

    const octaveDownEventListener = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "z") {
        setOctave(s => s === 1 ? s : (s - 1) as octave);
      }
    };

    const octaveUpEventListener = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "x") {
        setOctave(s => s === 7 ? s : (s + 1) as octave);
      }
    };

    document.addEventListener("keypress", octaveDownEventListener);
    document.addEventListener("keypress", octaveUpEventListener);

    return () => {
      document.removeEventListener("keypress", octaveDownEventListener);
      document.removeEventListener("keypress", octaveUpEventListener);
    };
  }, [octave]);

  const setSynthVolume = (volume: number) => {
    if (synthesizerRef.current) {
      synthesizerRef.current.volume = volume;
    }
  };

  const setSynthFrequency = (frequency: number) => {
    if (synthesizerRef.current) {
      synthesizerRef.current.filterFrequency = frequency;
    }
  };

  const setWaveform = (waveform: waveform) => {
    if (synthesizerRef.current) {
      synthesizerRef.current.oscWaveform = waveform;
    }
  };

  const setLFOAmount = (amount: number) => {
    if (synthesizerRef.current) {
      synthesizerRef.current.lfoAmount = amount;
    }
  };

  const setLFOFrequency = (frequency: number) => {
    if (synthesizerRef.current) {
      synthesizerRef.current.lfoFrequency = frequency;
    }
  };

  const setLFOWaveform = (waveform: lfoWaveform) => {
    if (synthesizerRef.current) {
      synthesizerRef.current.lfoWaveform = waveform;
    }
  };

  const setLFODestination = (destination: lfoDestination) => {
    if (synthesizerRef.current) {
      synthesizerRef.current.lfoDestination = destination;
    }
  };

  return (
    <div>
      <div>
        <span>Volume: </span>
        <input type="range" min="0" max="100" step={1} defaultValue={initialVolume * 100} onChange={(e) =>  setSynthVolume(parseInt(e.target.value) / 100)} />
      </div>
      <div>
        <span>Filter Frequency: </span>
        <input type="range" min="0" max="1000" step={1} defaultValue={initialFilterFrequency} onChange={(e) => setSynthFrequency(parseInt(e.target.value))} />
      </div>
      <div>
        <span>LFO amount: </span>
        <input type="range" min="0" max="100" step={1} defaultValue={initialLFOAmount} onChange={(e) =>  setLFOAmount(parseInt(e.target.value))} />
      </div>
      <div>
        <span>LFO frequency: </span>
        <input type="range" min="0" max="50" step={1} defaultValue={initialLFOSpeed} onChange={(e) =>  setLFOFrequency(parseInt(e.target.value))} />
      </div>
      <div>
        <span>lfo waveform: </span>
        <select name="waveform" onChange={e => setLFOWaveform(e.target.value as lfoWaveform)} defaultValue="sine">
          <option value="sine">Sine</option>
          <option value="square">Square</option>
        </select>
      </div>
      <div>
        <span>LFO destination:</span>
        <input type="radio" name="lfoDestination" id="pitchLfoDestination" value="pitch" onChange={e => setLFODestination(e.target.value as lfoDestination)} />
        <label htmlFor="pitchLfoDestination">Pitch</label>
        <input type="radio" name="lfoDestination" id="frequencyLfoDestination" value="filterFrequency" checked onChange={e => setLFODestination(e.target.value as lfoDestination)} />
        <label htmlFor="frequencyLfoDestination">Frequency</label>
      </div>
      <div>
        <span>waveform: </span>
        <select name="waveform" onChange={e => setWaveform(e.target.value as waveform)} defaultValue="sawtooth">
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>
      <Key keyboardKey="A" note="C" octave={octave} onKeyUp={() => synthesizerRef.current?.stop()} onKeyDown={(note, octave) => synthesizerRef.current?.play(note, octave)} />
      <Key keyboardKey="W" note="C#" octave={octave} onKeyUp={() => synthesizerRef.current?.stop()} onKeyDown={(note, octave) => synthesizerRef.current?.play(note, octave)} />
      <Key keyboardKey="S" note="D" octave={octave} onKeyUp={() => synthesizerRef.current?.stop()} onKeyDown={(note, octave) => synthesizerRef.current?.play(note, octave)} />
      <Key keyboardKey="E" note="D#" octave={octave} onKeyUp={() => synthesizerRef.current?.stop()} onKeyDown={(note, octave) => synthesizerRef.current?.play(note, octave)} />
      <Key keyboardKey="D" note="E" octave={octave} onKeyUp={() => synthesizerRef.current?.stop()} onKeyDown={(note, octave) => synthesizerRef.current?.play(note, octave)} />
      <Key keyboardKey="F" note="F" octave={octave} onKeyUp={() => synthesizerRef.current?.stop()} onKeyDown={(note, octave) => synthesizerRef.current?.play(note, octave)} />
      <Key keyboardKey="T" note="F#" octave={octave} onKeyUp={() => synthesizerRef.current?.stop()} onKeyDown={(note, octave) => synthesizerRef.current?.play(note, octave)} />
      <Key keyboardKey="G" note="G" octave={octave} onKeyUp={() => synthesizerRef.current?.stop()} onKeyDown={(note, octave) => synthesizerRef.current?.play(note, octave)} />
      <Key keyboardKey="Y" note="G#" octave={octave} onKeyUp={() => synthesizerRef.current?.stop()} onKeyDown={(note, octave) => synthesizerRef.current?.play(note, octave)} />
      <Key keyboardKey="H" note="A" octave={octave} onKeyUp={() => synthesizerRef.current?.stop()} onKeyDown={(note, octave) => synthesizerRef.current?.play(note, octave)} />
      <Key keyboardKey="U" note="A#" octave={octave} onKeyUp={() => synthesizerRef.current?.stop()} onKeyDown={(note, octave) => synthesizerRef.current?.play(note, octave)} />
      <Key keyboardKey="J" note="B" octave={octave} onKeyUp={() => synthesizerRef.current?.stop()} onKeyDown={(note, octave) => synthesizerRef.current?.play(note, octave)} />
    </div>
  );
}
