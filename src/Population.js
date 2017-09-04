import Gene from './Gene';

export default class Population {
  constructor(goal, size) {
    this.members = [];
    this.goal = goal;
    this.generationNumber = 0;

    let loop = size;

    while (loop) {
      const gene = new Gene();
      gene.random(this.goal.length);
      this.members.push(gene);
      loop -= 1;
    }
  }

  display() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Generation ${this.generationNumber} : ${this.members[0].code}`);
  }

  finish() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(`Generation ${this.generationNumber} : ${this.members[0].code}`);
  }

  sort() {
    this.members.sort((a, b) => a.cost - b.cost);
  }

  generation() {
    for (let i = 0; i < this.members.length; i++) {
      this.members[i].calcCost(this.goal);
    }

    const children = this.members[0].crossover(this.members[1]);
    this.members.splice(this.members.length - 2, 2, children[0], children[1]);

    for (let j = 0; j < this.members.length; j++) {
      this.members[j].mutate(0.5);
      this.members[j].calcCost(this.goal);
    }

    this.sort();
    this.display();

    if (this.members[0].code === this.goal) {
      this.sort();
      this.finish();
    } else {
      this.generationNumber += 1;
      setTimeout(() => {
        this.generation();
      }, 2);
    }
  }
}
