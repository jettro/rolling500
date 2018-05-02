package nl.gridshore.rolling500.ratings;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class RatingDistribution {
    private Map<Integer, Long> ratings;

    public RatingDistribution() {
        ratings = new HashMap<>();
    }

    public void addRating(int rating) {
        if (rating > 0 && rating < 6) {
            long old = ratings.getOrDefault(rating, 0L);
            ratings.put(rating, ++old);
        }
    }

    public Map<Integer, Long> getRatings() {
        return Collections.unmodifiableMap(this.ratings);
    }
}
