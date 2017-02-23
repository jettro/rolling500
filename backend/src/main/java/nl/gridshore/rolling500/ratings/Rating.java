package nl.gridshore.rolling500.ratings;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Rating {
    @JsonProperty("user_id")
    private String userId;
    private int[] ratings;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int[] getRatings() {
        return ratings;
    }

    public void setRatings(int[] ratings) {
        this.ratings = ratings;
    }
}
