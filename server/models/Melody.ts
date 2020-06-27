import { Note } from './Note';

const NOTES = ['A','B','C','D','E','F','G']

export class Melody {
    melody: Note[];
    num_notes: number;
    fitnessValue: number;

    constructor(melody: Note[]) {
        this.melody = melody;
    }

    compareIndividual(best_individual){
        var comparedFitness = 0;
        var diff = new Array();
        var diff_best = new Array();

        for(var i = 0; i<this.num_notes-1; i++) {
            diff.push(this.melody[i].compare(this.melody[i+1]));
            diff_best.push(best_individual.melody[i].compare(best_individual.melody[i+1]));

            if (Math.abs(diff[i]) > 1 == Math.abs(diff_best[i]) > 1) {
                if (diff[i] < 0 == diff_best[i] < 0) {
                    comparedFitness+=2;
                } else {
                    comparedFitness+=1;
                }
            }
        }

        return comparedFitness/(this.num_notes*2);
    }

    mutate() {
        var index = Math.floor(Math.random()*this.num_notes);
        var note = NOTES[Math.floor(Math.random()*NOTES.length)] + Math.floor(Math.random()*2 + 3).toString(); 
        // flip
        this.melody[index].note = note;    
    }

    evaluate(best_individuals) {
        var fitness = 0;
        
        // Selection-based fitness component
        // (Comparing melody with selected melodies)
        for (var i = 0; i < best_individuals.length; i++) {
           var comparedFitness = this.compareIndividual(best_individuals[i]);
           if (comparedFitness > fitness) {
               fitness = comparedFitness;
           }
        }
        
        // Musical rules-based fitness component

        this.fitnessValue = fitness
        return fitness;
    }
    
    getMelody(): Note[] {
        return this.melody;
    }
}