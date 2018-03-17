package nl.gridshore.rolling500.ratings;

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

    private final RatingsService ratingsService;

    @Autowired
    public RatingsController(RatingsService ratingsService) {
        this.ratingsService = ratingsService;
    }

    @GetMapping("/{user_id}")
    public Rating obtainRating(@PathVariable("user_id") String userId) {
        return ratingsService.obtainRating(userId);
    }

    @PostMapping
    public void storeRating(@RequestBody Rating rating) {
        ratingsService.storeRating(rating);
    }
}
