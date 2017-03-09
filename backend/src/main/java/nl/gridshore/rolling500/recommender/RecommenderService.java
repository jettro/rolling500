package nl.gridshore.rolling500.recommender;

import nl.gridshore.rolling500.ratings.Rating;
import nl.gridshore.rolling500.ratings.RatingsService;
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
import org.grouplens.lenskit.transform.threshold.AbsoluteThreshold;
import org.grouplens.lenskit.transform.threshold.RealThreshold;
import org.grouplens.lenskit.transform.threshold.Threshold;
import org.grouplens.lenskit.vectors.similarity.CosineVectorSimilarity;
import org.grouplens.lenskit.vectors.similarity.VectorSimilarity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RecommenderService {

    private final RatingsService ratingsService;

    private Map<String,Long> userIdMapping = new HashMap<>();

    @Autowired
    public RecommenderService(RatingsService ratingsService) {
        this.ratingsService = ratingsService;
    }

    public List<Long> recommend(String userId) {

        try {
            LenskitRecommender recommender = LenskitRecommender.build(configureUserSimilarity());

            ItemRecommender irec = recommender.getItemRecommender();

            List<ScoredId> recommended = irec.recommend(userIdMapping.get(userId), 5);

            return recommended.stream()
                    .map(scoredId -> {
                        // Let op dat we dus aan prediction doen, een score van 1 is dus een do not like en een score van 3 is een like.
                        System.out.println(scoredId.getId() + " : " + scoredId.getScore());
                        return scoredId.getId();
                    })
                    .collect(Collectors.toList());
        } catch (RecommenderBuildException e) {
            throw new RuntimeException(e);
        }
    }

    public LenskitConfiguration configureUserSimilarity() {
        LenskitConfiguration config = new LenskitConfiguration();
        config.bind(ItemScorer.class)
                .to(UserUserItemScorer.class);

        config.bind(BaselineScorer.class, ItemScorer.class)
                .to(UserMeanItemScorer.class);

        config.bind(UserSimilarityThreshold.class, Threshold.class).to(new RealThreshold(0.5));

        config.bind(UserMeanBaseline.class, ItemScorer.class)
                .to(ItemMeanRatingItemScorer.class);

        config.bind(UserVectorNormalizer.class)
                .to(BaselineSubtractingUserVectorNormalizer.class);

        config.within(UserVectorSimilarity.class).bind(VectorSimilarity.class).to(CosineVectorSimilarity.class);

        List<MutableRating> ratings = obtainRatings();

        config.bind(EventDAO.class).to(EventCollectionDAO.create(ratings));

        return config;
    }

    private long userId = 1;
    private long userId() {
        return userId++;
    }

    private List<MutableRating> obtainRatings() {

        // For now we obtain the ratings on each question
        List<Rating> foundRatings = ratingsService.listAllRatings();

        List<MutableRating> ratings = new ArrayList<MutableRating>();

        foundRatings.forEach(rating -> {
            String userIdString = rating.getUserId();

            long userId = (this.userIdMapping.containsKey(userIdString)) ? this.userIdMapping.get(userIdString) : userId();
            this.userIdMapping.put(userIdString, userId);
            for(int i = 0; i < rating.getRatings().length; i++) {
                if (rating.getRatings()[i] > 0) {
                    ratings.add(createRating(i, rating.getRatings()[i], userId));
                }
            }
        });

//        ratings.add(createRating(1, 1, 1));
//        ratings.add(createRating(2, 3, 1));
//        ratings.add(createRating(3, 3, 1));
//        ratings.add(createRating(4, 1, 1));
//        ratings.add(createRating(5, 1, 1));
//
//        ratings.add(createRating(1, 3, 2));
//        ratings.add(createRating(2, 1, 2));
//        ratings.add(createRating(3, 1, 2));
//        ratings.add(createRating(4, 3, 2));
//        ratings.add(createRating(5, 3, 2));
//
//        ratings.add(createRating(1, 1, 3));
//        ratings.add(createRating(2, 3, 3));
//        ratings.add(createRating(3,1,3));
//        ratings.add(createRating(4, 1, 3));
//        ratings.add(createRating(5,3,3));

//        ratings.add(createRating(1,3,2));
//        ratings.add(createRating(2,1,2));
//        ratings.add(createRating(3, 1, 4));
//        ratings.add(createRating(4, 3, 4));
//        ratings.add(createRating(5, 2, 4));
//
//        ratings.add(createRating(1, 2, 5));
//        ratings.add(createRating(2, 3, 5));
//        ratings.add(createRating(3, 3, 5));
//        ratings.add(createRating(4, 1, 5));
//        ratings.add(createRating(5, 1, 5));

        return ratings;
    }

    private MutableRating createRating(long item, long rating, long user) {
        MutableRating mutableRating = new MutableRating();
        mutableRating.setItemId(item);
        mutableRating.setRating(rating);
        mutableRating.setUserId(user);
        return mutableRating;
    }

}
