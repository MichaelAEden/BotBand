const NOTES = ['A','B','C','D','E','F','G']

class Individual
{
    public static SIZE = 8;
    private genes = new Array(Individual.SIZE);
    private fitnessValue;

    public Individual(genes) {
        this.genes = genes;
    }

    public getFitnessValue() {
        return this.fitnessValue;
    }

    public setFitnessValue(fitnessValue) {
        this.fitnessValue = fitnessValue;
    }

    public getGene(index) {
        return this.genes[index];
    }

    public setGene(index, gene) {
        this.genes[index] = gene;
    }

    public makeGenes() {

    }

    public musicRules() {
        // Rule one - steps always allowed
        // Rule two - leap recovery
        // Rule three - no leaps by tritone
    }

    public noteDistance(cur_note, next_note){
        if(cur_note[1] == next_note[1]){
            return NOTES.indexOf(next_note[0]) - NOTES.indexOf(cur_note[0])
        }else{
            if(cur_note[1] > next_note[1]){
                return (NOTES.indexOf(next_note[0]) - NOTES.length) - NOTES.indexOf(cur_note[0]) - (cur_note[1]-next_note[1])*NOTES.length
            }else{
                return NOTES.indexOf(next_note[0]) + (NOTES.length - NOTES.indexOf(cur_note[0])) + (next_note[1]-cur_note[1])*NOTES.length
            }
        }
    }


    public compareIndividual(best_individual){
        var comparedFitness = 0
        var dist = new Array()
        var dist_best = new Array()
        for(var i = 0; i<Individual.SIZE-1; i++){
            dist.push(this.noteDistance(this.genes[i], this.genes[i+1]))
            dist_best.push(this.noteDistance(best_individual.genes[i], best_individual.genes[i-1]))
            if(Math.abs(dist[i]) > 1 == Math.abs(dist_best[i]) > 1){
                if(dist[i] < 0 == dist_best[i] < 0){
                    comparedFitness+=2
                }else{
                    comparedFitness+=1
                }
            }
        }
        return comparedFitness/Individual.SIZE
    }

    public mutate() {
        var index = Math.floor(Math.random()*Individual.SIZE);
        var note = NOTES[Math.floor(Math.random()*NOTES.length)] + Math.floor(Math.random()*2 + 3).toString(); 
        this.setGene(index, note);    // flip
    }

    public evaluate(best_individuals) {
        var fitness = 0;
        for(var i = 0; i < best_individuals.length; i++){
           var comparedFitness = this.compareIndividual(best_individuals[i]);
           if (comparedFitness > fitness){
               fitness = comparedFitness;
           }
        }
        
        this.setFitnessValue(fitness)

        return fitness;
    }
}