export default class Gene {
  constructor(code) {
    this.code = code || '';
    this.cost = 9999;
  }

  random(length) {
    let loop = length;
    while (loop) {
      this.code += String.fromCharCode(Math.floor(Math.random() * 255));
      loop -= 1;
    }
  }

  calcCost(compareTo) {
    let cost = 0;
    for (let i = 0; i < this.code.length; i++) {
      const diff = this.code.charCodeAt(i) - compareTo.charCodeAt(i);
      cost += diff * diff;
    }
    this.cost = cost;
  }

  crossover(gene) {
    const pivot = Math.round(this.code.length / 2) - 1;

    const child1 = this.code.substr(0, pivot) + gene.code.substr(pivot);
    const child2 = gene.code.substr(0, pivot) + this.code.substr(pivot);

    return [new Gene(child1), new Gene(child2)];
  }

  mutate(chance) {
    if (Math.random() > chance) {
      return;
    }

    const index = Math.floor(Math.random() * this.code.length);
    const charCode = this.code.charCodeAt(index);
    const upOrDown = Math.random();
    let nextCharCode = charCode + 1;

    if (upOrDown < 0.5) {
      nextCharCode = charCode - 1;
    }

    const nextChar = String.fromCharCode(nextCharCode);
    this.code = this.code.substr(0, index) + nextChar + this.code.substr(index + 1);
  }
}
