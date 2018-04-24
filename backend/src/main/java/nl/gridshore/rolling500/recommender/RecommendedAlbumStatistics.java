package nl.gridshore.rolling500.recommender;

public class RecommendedAlbumStatistics {
    private long sequence;
    private long numberOfRecommendations;
    private double avgScore;
    private double avgPosition;

    public RecommendedAlbumStatistics(long sequence) {
        this.sequence = sequence;
    }

    public RecommendedAlbumStatistics addRecommendation(long position, double score) {
        this.avgScore = (this.avgScore * this.numberOfRecommendations + score)/(this.numberOfRecommendations + 1);
        this.avgPosition = (this.avgPosition * this.numberOfRecommendations + position)/ (this.numberOfRecommendations + 1);
        numberOfRecommendations++;
        return this;
    }

    public long getSequence() {
        return sequence;
    }

    public long getNumberOfRecommendations() {
        return numberOfRecommendations;
    }

    public double getAvgScore() {
        return avgScore;
    }

    public double getAvgPosition() {
        return avgPosition;
    }
}
