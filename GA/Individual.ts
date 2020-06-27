const NOTES = ['A','B','C','D','E']

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


    public mutate() {
        var index = Math.floor(Math.random()*Individual.SIZE);
        var note = NOTES[Math.floor(Math.random()*NOTES.length)] + Math.floor(Math.random()*2 + 3).toString(); 
        this.setGene(index, note);    // flip
    }

    public evaluate() {
        var fitness = 0;
        for(var i=0; i<Individual.SIZE; ++i) {
            fitness += this.getGene(i);
        }
        this.setFitnessValue(fitness);

        return fitness;
    }
}