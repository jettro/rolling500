package nl.gridshore.rolling500.recommender;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class RecommendationStatistics {
    private long amountOfUsers;
    private long amountOfUsersWithRecommendations;
    private long amountOfItemsToRecommend;
    private Map<Long, RecommendedAlbumStatistics> allRecommendedAlbumStatistics;

    public RecommendationStatistics(long amountOfUsers, long amountOfItemsToRecommend) {
        this.amountOfUsers = amountOfUsers;
        this.amountOfItemsToRecommend = amountOfItemsToRecommend;
        this.allRecommendedAlbumStatistics = new HashMap<>();
    }

    public RecommendationStatistics addUserWithRecommendations() {
        this.amountOfUsersWithRecommendations++;
        return this;
    }

    public RecommendationStatistics addRecommendation(long sequence, long position, double score) {
        RecommendedAlbumStatistics recommendedAlbumStatistics = this.allRecommendedAlbumStatistics.get(sequence);
        if (recommendedAlbumStatistics == null) {
            recommendedAlbumStatistics = new RecommendedAlbumStatistics(sequence);
            allRecommendedAlbumStatistics.put(sequence, recommendedAlbumStatistics);
        }

        recommendedAlbumStatistics.addRecommendation(position, score);

        return this;
    }

    public long getAmountOfUsers() {
        return amountOfUsers;
    }

    public long getAmountOfUsersWithRecommendations() {
        return amountOfUsersWithRecommendations;
    }

    public long getAmountOfItemsToRecommend() {
        return amountOfItemsToRecommend;
    }

    public List<RecommendedAlbumStatistics> getSortedAlbumStatistics() {
        return this.allRecommendedAlbumStatistics.values().stream()
                .sorted((o1, o2) -> (o1.getNumberOfRecommendations() - o2.getNumberOfRecommendations() < 0) ? -1 : 1)
                .collect(Collectors.toList());
    }
}
