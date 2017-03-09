package nl.gridshore.rolling500.recommender;

import nl.gridshore.rolling500.albums.Album;

public class RecommendedAlbum extends Album {
    private Double score;

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }
}
