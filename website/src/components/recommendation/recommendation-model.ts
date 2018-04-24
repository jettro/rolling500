export class RecommendationStatistics {
    amountOfUsers: number;
    amountOfUsersWithRecommendations: number;
    amountOfItemsToRecommend: number;
    albumStatistics: Array<RecommendedAlbumStatistics>;

    constructor() {
        this.albumStatistics = [];
    }
}

export class RecommendedAlbumStatistics {
    sequence: number;
    numberOfRecommendations: number;
    avgScore: number;
    avgPosition: number;
}