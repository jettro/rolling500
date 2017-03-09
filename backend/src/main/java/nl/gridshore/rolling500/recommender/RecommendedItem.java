package nl.gridshore.rolling500.recommender;

public class RecommendedItem {
    private long albumId;
    private double score;

    public RecommendedItem() {
    }

    public RecommendedItem(long albumId, double score) {
        this.albumId = albumId;
        this.score = score;
    }

    public long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(long albumId) {
        this.albumId = albumId;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
