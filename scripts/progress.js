class Progress {
    constructor(steps = 1){
        this.steps = steps
        this.progress = 0
        this.percent = 0
    }

    display() {
        this.progress = this.progress + 1
        this.percent = Math.round((this.progress / this.steps) * 100)
        return `${this.progress} de ${this.steps} (${this.percent.toString()}%)`
    }
}

module.exports = Progress