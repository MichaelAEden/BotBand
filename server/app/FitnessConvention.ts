import { Bot } from "../models/Bot";

export const evaluate = (bots: Bot[]) => {
  let fitnesses = new Array()
  for(let j = 0; j < bots.length; j++){
    // MUSICAL FITNESS
    // Fitness will be determined from the combined fitness of
    // the musical rules
    let musical_fitness
    
    // Convention 1: All notes within an octave and a half
    let octave_fitness = 0
    let min_octave
    let max_octave
    let octave = new Array<String>()
    for(let i = 0; i<bots[i].melody.notes.length; i++){
      octave.push(bots[i].melody.notes[i].getOctave())
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
    let step_fitness = 0
    let note_diff
    for(let i = 0; i<bots[i].melody.notes.length-1; i++){
      note_diff.push(bots[i].melody.notes[i].compare(bots[i].melody.notes[i+1]))
      if(Math.abs(note_diff[i]) <= 1){
        step_fitness+=1
      }
    }
    if(step_fitness > bots[i].melody.notes.length*0.75){
      step_fitness = 1
    }else{
      step_fitness = step_fitness/bots[i].melody.notes.length
    }
    
    // Bonus points: "millenial whoop" (alternating between fifth and third notes in a major scale)
    let whoop_fitness = 0
    let mill_whoop = ['G','E','G','E','G','E','G','E']
    for(let i = 0; i<bots[i].melody.notes.length; i++){
      if(mill_whoop[i] == bots[i].melody.notes[i].getKey()){
        if (i > 0){
          if((octave[i] == octave[i-1]) && (bots[i].melody.notes[i-1].getKey() == mill_whoop[i-1])){
            whoop_fitness+=1
          }
        }else{
          whoop_fitness+=1
        }
      }
    }
    whoop_fitness = (2**whoop_fitness)/(2**bots[i].melody.notes.length)

    // Determine total fitness according to musical rules
    musical_fitness = ((octave_fitness + step_fitness)/2) + whoop_fitness
    if(musical_fitness > 1){
      musical_fitness = 1
    }

    fitnesses.push(musical_fitness)
  }

  return fitnesses
  //return bots.map(() => Math.random());
};
