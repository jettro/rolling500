package nl.gridshore.rolling500.ratings;

import eu.luminis.elastic.document.DocumentService;
import eu.luminis.elastic.document.IndexRequest;
import eu.luminis.elastic.document.QueryByIdNotFoundException;
import eu.luminis.elastic.document.QueryByIdRequest;
import eu.luminis.elastic.search.SearchByTemplateRequest;
import eu.luminis.elastic.search.SearchService;
import nl.gridshore.rolling500.albums.AlbumEntityTypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingsService {
    private static final String INDEX = "ratings";
    private static final String TYPE = "rating";
    private static final String QUERY_ALL_TMPL = "find_all_ratings.twig";

    private final DocumentService documentService;
    private final SearchService searchService;

    @Autowired
    public RatingsService(DocumentService documentService, SearchService searchService) {
        this.documentService = documentService;
        this.searchService = searchService;
    }

    public Rating obtainRating(String userId) {
        QueryByIdRequest request = new QueryByIdRequest(INDEX, TYPE, userId);
        request.setTypeReference(new RatingByIdTypeReference());

        Rating rating;
        try {
            rating = documentService.queryById(request);
        } catch (QueryByIdNotFoundException exception) {
            rating = new Rating();
            rating.setUserId(userId);
            rating.setRatings(new int[500]);
        }

        return rating;
    }

    public void storeRating(Rating rating) {
        IndexRequest indexRequest = new IndexRequest(INDEX, TYPE, rating.getUserId());
        indexRequest.setEntity(rating);

        documentService.index(indexRequest);
    }

    public List<Rating> listAllRatings() {
        SearchByTemplateRequest request = SearchByTemplateRequest.create()
                .setIndexName(INDEX)
                .setTemplateName(QUERY_ALL_TMPL)
                .setTypeReference(new RatingTypeReference());

        return searchService.queryByTemplate(request);

    }

}
