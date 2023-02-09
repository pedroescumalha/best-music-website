import Synthesizer, { lfoDestination, lfoWaveform, note, octave } from "@/components/synthesizer";
import { FC, useEffect, useState } from "react";

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
  const [synth, setSynth] = useState<Synthesizer>();
  const [octave, setOctave] = useState<octave>(3);

  const setSynthParam = (setParam: (synthesizer: Synthesizer) => Synthesizer): void => {
    setSynth(s => {
      if (s) {
        return setParam(s);
      }
    });
  };

  useEffect(() => {
    setSynth(new Synthesizer({
      initialVolume: 0.5,
      initialFilterFrequency: 1000,
      initialLFODestination: "filterFrequency",
    }));

    return () => {
      synth?.off();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const setSynthVolume = (volume: number) => setSynthParam(s => {
    s.volume = volume;
    return s;
  });

  const setSynthFrequency = (frequency: number) => setSynthParam(s => {
    s.filterFrequency = frequency;
    return s;
  });

  const setLFOAmount = (amount: number) => setSynthParam(s => {
    s.lfoAmount = amount;
    return s;
  });

  const setLFOFrequency = (frequency: number) => setSynthParam(s => {
    s.lfoFrequency = frequency;
    return s;
  });

  const setLFOWaveform = (waveform: lfoWaveform) => setSynthParam(s => {
    s.lfoWaveform = waveform;
    return s;
  });

  const setLFODestination = (destination: lfoDestination) => setSynthParam(s => {
    s.lfoDestination = destination;
    return s;
  });

  return !synth ? <></> : (
    <div>
      <div>
        <span>Volume: </span>
        <input type="range" min="0" max="100" step={1} defaultValue={synth.volume * 100} onChange={(e) =>  setSynthVolume(parseInt(e.target.value) / 100)} />
      </div>
      <div>
        <span>Filter Frequency: </span>
        <input type="range" min="0" max="1000" step={1} defaultValue={synth.filterFrequency} onChange={(e) => setSynthFrequency(parseInt(e.target.value))} />
      </div>
      <div>
        <span>LFO amount: </span>
        <input type="range" min="0" max="100" step={1} defaultValue={synth.lfoAmount} onChange={(e) =>  setLFOAmount(parseInt(e.target.value))} />
      </div>
      <div>
        <span>LFO frequency: </span>
        <input type="range" min="0" max="50" step={1} defaultValue={synth.lfoFrequency} onChange={(e) =>  setLFOFrequency(parseInt(e.target.value))} />
      </div>
      <div>
        <span>lfo waveform: </span>
        <select name="waveform" onChange={e => setLFOWaveform(e.target.value as lfoWaveform)} defaultValue={synth.lfoWaveform}>
          <option value="sine">Sine</option>
          <option value="square">Square</option>
        </select>
      </div>
      <div>
        <span>LFO destination:</span>
        <input type="radio" name="lfoDestination" id="pitchLfoDestination" value="pitch" onChange={e => setLFODestination(e.target.value as lfoDestination)} />
        <label htmlFor="pitchLfoDestination">Pitch</label>
        <input type="radio" name="lfoDestination" id="frequencyLfoDestination" value="filterFrequency" onChange={e => setLFODestination(e.target.value as lfoDestination)} />
        <label htmlFor="frequencyLfoDestination">Frequency</label>
      </div>
      <Key keyboardKey="A" note="C" octave={octave} onKeyUp={() => synth.stop()} onKeyDown={(note, octave) => synth.play(note, octave)} />
      <Key keyboardKey="W" note="C#" octave={octave} onKeyUp={() => synth.stop()} onKeyDown={(note, octave) => synth.play(note, octave)} />
      <Key keyboardKey="S" note="D" octave={octave} onKeyUp={() => synth.stop()} onKeyDown={(note, octave) => synth.play(note, octave)} />
      <Key keyboardKey="E" note="D#" octave={octave} onKeyUp={() => synth.stop()} onKeyDown={(note, octave) => synth.play(note, octave)} />
      <Key keyboardKey="D" note="E" octave={octave} onKeyUp={() => synth.stop()} onKeyDown={(note, octave) => synth.play(note, octave)} />
      <Key keyboardKey="F" note="F" octave={octave} onKeyUp={() => synth.stop()} onKeyDown={(note, octave) => synth.play(note, octave)} />
      <Key keyboardKey="T" note="F#" octave={octave} onKeyUp={() => synth.stop()} onKeyDown={(note, octave) => synth.play(note, octave)} />
      <Key keyboardKey="G" note="G" octave={octave} onKeyUp={() => synth.stop()} onKeyDown={(note, octave) => synth.play(note, octave)} />
      <Key keyboardKey="Y" note="G#" octave={octave} onKeyUp={() => synth.stop()} onKeyDown={(note, octave) => synth.play(note, octave)} />
      <Key keyboardKey="H" note="A" octave={octave} onKeyUp={() => synth.stop()} onKeyDown={(note, octave) => synth.play(note, octave)} />
      <Key keyboardKey="U" note="A#" octave={octave} onKeyUp={() => synth.stop()} onKeyDown={(note, octave) => synth.play(note, octave)} />
      <Key keyboardKey="J" note="B" octave={octave} onKeyUp={() => synth.stop()} onKeyDown={(note, octave) => synth.play(note, octave)} />
    </div>
  );
}
