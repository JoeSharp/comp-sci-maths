import React from "react";
import midiToFreq from "./midiToFreq";

interface Props {
  noteOn: (note: number, velocity: number) => void;
  noteOff: (note: number) => void;
}

interface UseMidi {
  inputDevices: WebMidi.MIDIInputMap;
  selectedInputDeviceId?: string;
  onInputDeviceSelected: (id: string) => void;
  playNote: (frequency: number, volume: number, duration: number) => void;
  error: string;
}

// Create audio oscillator

const useMidi = ({ noteOn, noteOff }: Props): UseMidi => {
  const { gain, audio } = React.useMemo(() => {
    const audio = new window.AudioContext();
    var gain = audio.createGain()
    gain.connect(audio.destination) // so you actually hear the output

    return {
      audio, gain
    };
  }, [])

  const [inputDevices, setInputDevices] = React.useState(new Map());
  const [error, setError] = React.useState<string>("init");
  const [selectedInputDeviceId, onInputDeviceSelected] = React.useState<
    string | undefined
  >();

  React.useEffect(() => {
    if (!navigator.requestMIDIAccess !== undefined) {
      setError("WebMIDI is not supported in this browser.");
    }

    const onMIDISuccess = (midiAccess: WebMidi.MIDIAccess) => {
      setInputDevices(midiAccess.inputs);
    };

    const onMIDIFailure = () => {
      setError("Could not access Web MIDI, this only works in recent versions of Chrome");
    };

    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  }, [setInputDevices, setError]);

  React.useEffect(() => {
    if (!!selectedInputDeviceId) {
      const inputDevice = inputDevices.get(selectedInputDeviceId);
      if (!!inputDevice) {
        inputDevice.onmidimessage = (e: WebMidi.MIDIMessageEvent) => {
          // Mask off the lower nibble (MIDI channel, which we don't care about)
          switch (e.data[0] & 0xf0) {
            case 0x90: {
              if (e.data[2] !== 0) {
                // if velocity != 0, this is a note-on message
                noteOn(e.data[1], e.data[2]);
                return;
              } else {
                noteOff(e.data[1]);
              }
              break;
            }
            // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
            case 0x80: {
              noteOff(e.data[1]);
              return;
            }
          }
        };
      }

      return () => {
        inputDevice.onmidimessage = undefined;
      };
    }

    return () => { };
  }, [noteOn, noteOff, selectedInputDeviceId, inputDevices]);

  const playNote = function (note: number, volume: number, duration: number) {
    const frequency = midiToFreq(note);
    var halfPeriod = 1 / frequency / 2
    if (duration > halfPeriod) duration -= duration % halfPeriod
    else duration = halfPeriod

    var oscillator = audio.createOscillator()
    oscillator.connect(gain)
    
    oscillator.frequency.value = frequency
    gain.gain.value = volume
    oscillator.start(0)
    oscillator.stop(audio.currentTime + duration)
  }

  return { inputDevices, playNote, error, selectedInputDeviceId, onInputDeviceSelected };
};

export default useMidi;
