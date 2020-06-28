import { Melody } from './Melody';

export class Bot {
    // This will represent the usage count or the like / dislike depending on the GA interpretation.
    metric : number;
    melody: Melody;
    fitnessValue: number;

    constructor(usage: number, melody: Melody) {
        this.metric = usage;
        this.melody = melody;
    }

<<<<<<< HEAD
    // Determines part of fitness score from similarities in steps and leaps
    // between the bot and one of the highest-usage bots
    compareBot(best_bot){
        var comparedFitness = 0
        var diff = new Array()
        var diff_best = new Array()
        for(var i = 0; i<this.melody.num_notes-1; i++){
            diff.push(this.melody[i].compare(this.melody[i+1]))
            diff_best.push(best_bot.melody[i].compare(best_bot.melody[i+1]))
            if(Math.abs(diff[i]) > 1 == Math.abs(diff_best[i]) > 1){
                if(diff[i] < 0 == diff_best[i] < 0){
                    comparedFitness+=2
                }else{
                    comparedFitness+=1
                }
            }
        }
        return comparedFitness/(this.melody.num_notes*2)
    }

    compareWithConvention(){
        // All notes within an octave and a half

        // Mostly stepwise motion (few leaps)

        // Bonus points: "millenial whoop" (alternating between fifth and third notes in a major scale)
    }

    mutate() {
        var index = Math.floor(Math.random()*this.melody.num_notes);
        var note = String.fromCharCode('A'.charCodeAt(0) + Math.floor(Math.random()*('G'.charCodeAt(0) - 'A'.charCodeAt(0)))) + Math.floor(Math.random()*5).toString(); 
        this.melody[index].note = note;    // flip
    }

    evaluate(best_bots) {
        var fitness = 0;
        
        // Selection-based fitness component
        // (Comparing melody with selected melodies)
        for(var i = 0; i < best_bots.length; i++){
           var comparedFitness = this.compareBot(best_bots[i]);
           if (comparedFitness > fitness){
               fitness = comparedFitness;
           }
        }
        
        // Musical rules-based fitness component


        this.fitnessValue = fitness
        return fitness;
=======
    getMelody(): Melody {
        return this.melody;
    }

    getMetric(): number {
        return this.metric;
>>>>>>> 2dc4033e8d740e948e499e4ee17cc801d2985ff2
    }
}