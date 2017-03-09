package nl.gridshore.rolling500.recommender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/recommender")
public class RecommenderController {
    private final RecommenderService recommenderService;

    @Autowired
    public RecommenderController(RecommenderService recommenderService) {
        this.recommenderService = recommenderService;
    }


    @GetMapping("/user/{id}")
    public List<Long> obtainRecommendations(@PathVariable String id) {
        return this.recommenderService.recommend(id);
    }
}
