import Tone from "tone";

export const NOTE_LOWEST = 12; // F3
export const NOTE_HIGHEST = 27; // G5

export const play = (melody) => {
  const synth = new Tone.Synth().toMaster();
  const sequence = new Tone.Sequence(
    function (time, note) {
      try{
        synth.triggerAttackRelease(note, "4n", time);
      }
      catch(err) {
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
