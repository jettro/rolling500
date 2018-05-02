export class IRating {
    sequence: number;
    value: number;
}

export class RatingDistribution {
    rating: number;
    numRatings: number;


    constructor(rating: number, numRatings: number) {
        this.rating = rating;
        this.numRatings = numRatings;
    }
}