package nl.gridshore.rolling500.recommender;

import nl.gridshore.rolling500.albums.Album;
import nl.gridshore.rolling500.albums.AlbumService;
import nl.gridshore.rolling500.ratings.Rating;
import nl.gridshore.rolling500.ratings.RatingsService;
import nl.gridshore.rolling500.searchstats.SearchStatsService;
import org.grouplens.lenskit.ItemRecommender;
import org.grouplens.lenskit.ItemScorer;
import org.grouplens.lenskit.RecommenderBuildException;
import org.grouplens.lenskit.baseline.BaselineScorer;
import org.grouplens.lenskit.baseline.ItemMeanRatingItemScorer;
import org.grouplens.lenskit.baseline.UserMeanBaseline;
import org.grouplens.lenskit.baseline.UserMeanItemScorer;
import org.grouplens.lenskit.core.LenskitConfiguration;
import org.grouplens.lenskit.core.LenskitRecommender;
import org.grouplens.lenskit.data.dao.EventCollectionDAO;
import org.grouplens.lenskit.data.dao.EventDAO;
import org.grouplens.lenskit.data.event.MutableRating;
import org.grouplens.lenskit.knn.user.UserSimilarityThreshold;
import org.grouplens.lenskit.knn.user.UserUserItemScorer;
import org.grouplens.lenskit.knn.user.UserVectorSimilarity;
import org.grouplens.lenskit.scored.ScoredId;
import org.grouplens.lenskit.transform.normalize.BaselineSubtractingUserVectorNormalizer;
import org.grouplens.lenskit.transform.normalize.UserVectorNormalizer;
import org.grouplens.lenskit.transform.threshold.RealThreshold;
import org.grouplens.lenskit.transform.threshold.Threshold;
import org.grouplens.lenskit.vectors.similarity.CosineVectorSimilarity;
import org.grouplens.lenskit.vectors.similarity.VectorSimilarity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RecommenderService {
    public static final int NUM_RECOMMENDATIONS = 5;
    public static final double THRESHOLD_SIMILARITY = 0;
    private static final Logger logger = LoggerFactory.getLogger(RecommenderService.class);
    private final RatingsService ratingsService;
    private final SearchStatsService searchStatsService;
    private final AlbumService albumService;

    @Autowired
    public RecommenderService(RatingsService ratingsService, SearchStatsService searchStatsService, AlbumService albumService) {
        this.ratingsService = ratingsService;
        this.searchStatsService = searchStatsService;
        this.albumService = albumService;
    }

    /**
     * Moet hier meer terug gaan geven:
     * - Hoeveel gebruikers hebben er recommendations
     * - Hoeveel verschillende items worden er aanbevolen
     * - Welke worden het meest aanbevolen?
     *
     * @return
     */
    public RecommendationStatistics findRecommendationsForAllUsers() {
        LenskitRecommender recommender;
        Map<String, Long> userIdMapping = new HashMap<>();
        try {
            List<Rating> foundRatings = ratingsService.listAllRatings();
            LenskitConfiguration lenskitConfiguration = configureUserSimilarity(foundRatings, userIdMapping);
            recommender = LenskitRecommender.build(lenskitConfiguration);
        } catch (RecommenderBuildException e) {
            logger.error("Error when constructing a recommender.", e);
            throw new RecommendationException(e.getMessage());
        }
        ItemRecommender irec = recommender.getItemRecommender();


        RecommendationStatistics statistics = new RecommendationStatistics(userIdMapping.size(), 500);
        userIdMapping.keySet().forEach(s -> {
            long userValue = userIdMapping.get(s);
            List<ScoredId> recommended = irec.recommend(userValue, NUM_RECOMMENDATIONS);

            logger.info("I have {} recommendations for {}: [{}]", recommended.size(), userValue, recommended);

            if (!recommended.isEmpty()) {
                statistics.addUserWithRecommendations();
            }

            recommended.forEach(scoredId -> {
                statistics.addRecommendation(scoredId.getId(), 1, scoredId.getScore());
            });
        });

        return statistics;
    }


    public List<RecommendedAlbum> recommend(String userId) {
        // For now we obtain the ratings on each question
        List<Rating> foundRatings = ratingsService.listAllRatings();

        try {
            Map<String, Long> userIdMapping = new HashMap<>();
            LenskitRecommender recommender = LenskitRecommender.build(configureUserSimilarity(foundRatings, userIdMapping));

            ItemRecommender irec = recommender.getItemRecommender();
            if (null == userIdMapping.get(userId)) {
                logger.info("No ratings found for user {}, therefore we have no recommendations.", userId);
                return new ArrayList<>();
            }
            List<ScoredId> recommended = irec.recommend(userIdMapping.get(userId), NUM_RECOMMENDATIONS);

            if (recommended.isEmpty()) {
                logger.info("No recommendations found for user {}", userId);
            }

            List<RecommendedItem> recommendedItems = recommended.stream()
                    .map(scoredId -> new RecommendedItem(scoredId.getId(), scoredId.getScore()))
                    .collect(Collectors.toList());

            List<RecommendedAlbum> recommendedAlbums = obtainAlbumsBySequenceId(recommendedItems);

            if (!recommendedItems.isEmpty()) {
                searchStatsService.logRecommenderStats(userId, recommendedAlbums);
            }

            return recommendedAlbums;
        } catch (RecommenderBuildException e) {
            throw new RecommendationException("Error while trying to find recommendations", e);
        }
    }

    private List<RecommendedAlbum> obtainAlbumsBySequenceId(List<RecommendedItem> recommendedItems) {
        List<Long> ids = recommendedItems.stream()
                .filter(recommendedItem -> recommendedItem.getScore() > THRESHOLD_SIMILARITY)
                .map(RecommendedItem::getAlbumId)
                .collect(Collectors.toList());

        List<Album> recommendedAlbums = albumService.findAlbumBySequenceId(ids);

        return recommendedAlbums.stream().map(album -> {
            RecommendedAlbum recAlbum = new RecommendedAlbum();
            recAlbum.setArtist(album.getArtist());
            recAlbum.setAlbum(album.getAlbum());
            recAlbum.setYear(album.getYear());
            recAlbum.setSequence(album.getSequence());
            recAlbum.setId(album.getId());
            recAlbum.setImage(album.getImage());
            recAlbum.setLabel(album.getLabel());
            recAlbum.setOrder(album.getOrder());
            RecommendedItem item = recommendedItems.stream()
                    .filter(recommendedItem -> recommendedItem.getAlbumId() == album.getSequence())
                    .findFirst()
                    .get();
            recAlbum.setScore(item.getScore());

            return recAlbum;
        }).collect(Collectors.toList());
    }

    private LenskitConfiguration configureUserSimilarity(List<Rating> foundRatings, Map<String, Long> userIdMapping) {
        LenskitConfiguration config = new LenskitConfiguration();
        config.bind(ItemScorer.class)
                .to(UserUserItemScorer.class);

        config.bind(BaselineScorer.class, ItemScorer.class)
                .to(UserMeanItemScorer.class);

        config.bind(UserSimilarityThreshold.class, Threshold.class).to(new RealThreshold(THRESHOLD_SIMILARITY));

        config.bind(UserMeanBaseline.class, ItemScorer.class)
                .to(ItemMeanRatingItemScorer.class);

        config.bind(UserVectorNormalizer.class)
                .to(BaselineSubtractingUserVectorNormalizer.class);

        config.within(UserVectorSimilarity.class).bind(VectorSimilarity.class).to(CosineVectorSimilarity.class);

        List<MutableRating> ratings = obtainRatings(foundRatings, userIdMapping);

        config.bind(EventDAO.class).to(EventCollectionDAO.create(ratings));

        return config;
    }

    private List<MutableRating> obtainRatings(List<Rating> foundRatings, Map<String, Long> userIdMapping) {
        List<MutableRating> ratings = new ArrayList<>();

        CurrentUserId userId = new CurrentUserId();

        foundRatings.forEach(rating -> {
            String userIdString = rating.getUserId();

            long curUser = (userIdMapping.containsKey(userIdString)) ? userIdMapping.get(userIdString) : userId.getUserId();
            userIdMapping.put(userIdString, curUser);
            for (int i = 0; i < rating.getRatings().length; i++) {
                if (rating.getRatings()[i] > 0) {
                    ratings.add(createRating(i, rating.getRatings()[i], curUser));
                }
            }
        });

        return ratings;
    }

    private MutableRating createRating(long item, long rating, long user) {
        MutableRating mutableRating = new MutableRating();
        mutableRating.setItemId(item);
        mutableRating.setRating(rating);
        mutableRating.setUserId(user);
        return mutableRating;
    }

    private class CurrentUserId {
        private long userId = 0;

        public long getUserId() {
            return userId++;
        }
    }

}
