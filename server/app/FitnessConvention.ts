import { Bot } from "../models/Bot";

export const evaluate = (bots: Bot[]) => {
  // MUSICAL FITNESS
  // Fitness will be determined from the combined fitness of
  // the musical rules
  var musical_fitness
  
  // Convention 1: All notes within an octave and a half
  var octave_fitness = 0
  var min_octave
  var max_octave
  var octave = new Array<String>()
  for(var i = 0; i<this.melody.notes.length; i++){
    octave.push(this.melody.notes[i].getOctave())
    if(i==0){
      min_octave = octave[i]
        max_octave = octave[i]
    }else{
      if(octave[i] > max_octave){
        max_octave = octave[i]
      }else if(octave[i] < min_octave){
        min_octave = octave[i]
      }
    }
  }
  if(max_octave-min_octave <3){
    octave_fitness = 1
  }else{
    octave_fitness = 1.0/(max_octave-min_octave)
  }

  // Convention 2: Mostly stepwise motion (few leaps)
  var step_fitness = 0
  var note_diff
  for(var i = 0; i<this.melody.notes.length-1; i++){
    note_diff.push(this.melody.notes[i].compare(this.melody.notes[i+1]))
    if(Math.abs(note_diff[i]) <= 1){
      step_fitness+=1
    }
  }
  if(step_fitness > this.melody.notes.length*0.75){
    step_fitness = 1
  }else{
    step_fitness = step_fitness/this.melody.notes.length
  }
  
  // Bonus points: "millenial whoop" (alternating between fifth and third notes in a major scale)
  var whoop_fitness = 0
  var mill_whoop = ['G','E','G','E','G','E','G','E']
  for(var i = 0; i<this.melody.notes.length; i++){
    if(mill_whoop[i] == this.melody.notes[i].getKey()){
      if (i > 0){
        if((octave[i] == octave[i-1]) && (this.melody.notes[i-1].getKey() == mill_whoop[i-1])){
          whoop_fitness+=1
        }
      }else{
        whoop_fitness+=1
      }
    }
  }
  whoop_fitness = (2**whoop_fitness)/(2**this.melody.notes.length)

  // Determine total fitness according to musical rules
  musical_fitness = ((octave_fitness + step_fitness)/2) + whoop_fitness
  if(musical_fitness > 1){
    musical_fitness = 1
  }




  return bots.map(() => Math.random());
};
