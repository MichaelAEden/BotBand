import Tone from "tone";

// TODO: enforce constraint in backend for this note range.
export const NOTE_LOWEST = 12; // E3
export const NOTE_HIGHEST = 31; // C5

export const play = (melody) => {
  const synth = new Tone.Synth({
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.3,
      release: 1,
    },
  }).toMaster();

  const sequence = new Tone.Sequence(
    function (time, note) {
      try {
        synth.triggerAttackRelease(note, "4n", time);
      } catch (err) {
        console.log(err.message);
      }
    },
    melody,
    "4n"
  );
  sequence.start(Tone.Transport.time);
  sequence.loop = false;
  Tone.Transport.start();
};
