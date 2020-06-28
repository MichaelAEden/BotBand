const INITIAL_MELODIES = [['C4', 'G4', 'D4', 'A4',  'B4', 'C5',	'C5', 'D5', 'B4', 'E5'],
   ['G4',	'G4',	'E4',	'B4',	'C5',	'F5',	'E5',	'D5',	'F5',	'D5'],
    ['A4',	'C5',	'A4',	'A4',	'E4',	'F4',	'G4',	'A4',	'B4',	'G4'],
    ['A3',	'G3',	'C4',	'E4',	'E4',	'B4',	'D5',	'D5',	'G4',	'A4'],
    ['B4',	'C5',	'F4',	'F4',	'E5',	'F5',	'B4',	'G4',	'G5',	'A4'],
    ['G3',	'B4',	'D4',	'E4',	'G3',	'D5',	'D5',	'D5',	'E5',	'C5'],
    ['G4',	'D5',	'F5',	'B4',	'F4',	'F4',	'F4',	'C5',	'E5',	'G4'],
    ['B3',	'A4',	'G4',	'G5',	'E4',	'B4',	'D4',	'E4',	'G5',	'E4'],
    ['E5',	'F4',	'D4',	'G4',	'D5',	'A4',	'F4',	'A4',	'A3',	'C4'],
    ['C5',	'C5',	'G5',	'B4',	'G4',	'C5',	'C5',	'G5',	'E5',	'G4'],
    ['F5',	'E5',	'A4',	'F4',	'B4',	'E5',	'G5',	'F5',	'C5',	'D5'],
    ['G4',	'C4',	'F4',	'B3',	'G3',	'B3',	'D4',	'E4',	'A3',	'D4'],
    ['G5',	'E5',	'D5',	'B4',	'F4',	'A4',	'G4',	'A4',	'E4',	'G4'],
    ['E4',	'C4',	'B3',	'B3',	'G3',	'B3',	'B3',	'A3',	'E4',	'E4'],
    ['C4',	'B3',	'E4',	'G4',	'F4',	'B3',	'D4',	'B3',	'B3',	'G3'],
    ['D5',	'F5',	'E5',	'C5',	'F5',	'B4',	'F4',	'A4',	'G4',	'C4'],
    ['A3',	'A3',	'D4',	'G3',	'A3',	'D4',	'A4',	'A4',	'A4',	'E5'],
    ['A4',	'F4',	'C5',	'G4',	'C5',	'F5',	'G5',	'E5',	'E5',	'F5'],
    ['B4',	'B4',	'E5',	'D5',	'F5',	'C5',	'F5',	'D5',	'A4',	'G4'],
    ['G3',	'D4',	'F4',	'C4',	'B3',	'F4',	'D4',	'F4',	'F4', 'D4']
    ]


class Population
{
    const static ELITISM_K = 5;
    const static POP_SIZE = 10;  // population size
    const static MUTATION_RATE = 0.5;     // probability of mutation

    private static m_rand = Math.random();  // random-number generator
    private cur_population;
    private totalFitness;

    public Population(population) {
        this.cur_population = new Array(Population.POP_SIZE);

        // init population
        if(population){
            for (var i = 0; i < Population.POP_SIZE; i++) {
                this.cur_population[i] = new Individual(population[i]);
                this.cur_population[i].randGenes();
            }
        }else{
            for (var i = 0; i < Population.POP_SIZE; i++) {
                this.cur_population[i] = new Individual();
                this.cur_population[i].makeGenes();
            }
        }

        // evaluate current population
        this.evaluate();
    }

    public setPopulation(newPop) {
        this.cur_population = newPop;
        //System.arraycopy(newPop, 0, this.cur_population, 0, POP_SIZE);
    }

    public getPopulation() {
        return this.cur_population;
    }

    public evaluate() {
        this.totalFitness = 0.0;
        for (var i = 0; i < Population.POP_SIZE; i++) {
            this.totalFitness += this.cur_population[i].evaluate();
        }
        return this.totalFitness;
    }

    public matingPoolSelection() {
        // Set up mating pool
        var matingProb = new Array();
        var matingPool = new Array();
        for (var i = 0; i < Population.POP_SIZE; i++) {
            var n = Math.floor(((this.cur_population[i].fitness/this.totalFitness) * 100));
            for (var j = 0; j < n; j++) {
                matingProb.push(this.cur_population[i]);
            }
        }

        // Select from mating pool
        for (var i = 0; i < Population.POP_SIZE; i++){
                matingPool.push(matingProb[Math.floor(Math.random()*100)])
        }
        return matingPool

    }

    public nextGeneration(){
        var matingPool = this.matingPoolSelection();
        for(var i = 0; i < Population.POP_SIZE; i++){
            if(Math.random() < Population.MUTATION_RATE){
                matingPool[i].mutate();
            }
        }
        this.cur_population = matingPool;
    }
}