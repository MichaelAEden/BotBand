import Tone from "tone";

export const play = (melody) => {
  Tone.Transport.clear();
  const synth = new Tone.Synth().toMaster();
  const sequence = new Tone.Sequence(
    function (time, note) {
      synth.triggerAttackRelease(note, "4n", time);
    },
    melody,
    "4n"
  );
  sequence.start(Tone.Transport.time);
  sequence.loop = false;
  Tone.Transport.start();
};
