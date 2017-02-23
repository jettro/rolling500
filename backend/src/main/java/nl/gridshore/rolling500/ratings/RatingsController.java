package nl.gridshore.rolling500.ratings;

import eu.luminis.elastic.document.DocumentService;
import eu.luminis.elastic.document.IndexRequest;
import eu.luminis.elastic.document.QueryByIdNotFoundException;
import eu.luminis.elastic.document.QueryByIdRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rating")
public class RatingsController {

    private static final String INDEX = "ratings";
    private static final String TYPE = "rating";
    private final DocumentService documentService;

    @Autowired
    public RatingsController(DocumentService documentService) {
        this.documentService = documentService;
    }


    @GetMapping("/{user_id}")
    public Rating obtainRating(@PathVariable("user_id") String userId) {
        QueryByIdRequest request = new QueryByIdRequest(INDEX, TYPE,userId);
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

    @PostMapping
    public void storeRating(@RequestBody Rating rating) {
        IndexRequest indexRequest = new IndexRequest(INDEX,TYPE,rating.getUserId());
        indexRequest.setEntity(rating);

        documentService.index(indexRequest);
    }
}
