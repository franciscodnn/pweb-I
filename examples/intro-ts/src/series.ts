// https://ifpb.github.io/exercises/problems/basic-numbers-series/

function loadSeries(): void {
    for(let i: number = 0; i < 10; i++){
        let print: string = '';
        for(let j: number = 0; j < 10; j++){
            // print += i + '' + j;
            print += `${i}${j} `;
        }
        console.log(print);
    }
}

loadSeries();