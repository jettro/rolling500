package nl.gridshore.rolling500.dashboard;

import com.fasterxml.jackson.databind.ObjectMapper;
import eu.luminis.elastic.search.SearchService;
import nl.gridshore.rolling500.ratings.Rating;
import nl.gridshore.rolling500.ratings.RatingsService;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final RestClient restClient;
    private final ObjectMapper jacksonObjectMapper;
    private final SearchService searchService;
    private final RatingsService ratingsService;

    @Autowired
    public DashboardController(RestClient restClient, ObjectMapper jacksonObjectMapper, SearchService searchService, RatingsService ratingsService) {
        this.restClient = restClient;
        this.jacksonObjectMapper = jacksonObjectMapper;
        this.searchService = searchService;
        this.ratingsService = ratingsService;
    }

    @GetMapping
    public Dashboard obtainDashboard() {
        Dashboard dashboard = new Dashboard();
        dashboard.setRatings(obtainRatings());
        dashboard.setNumUsers(obtainNumUsers());
        return dashboard;
    }

    private long obtainNumUsers() {
        return searchService.countByIndex("ratings");
    }

    private List<KeyValuePair<Long>> obtainRatings() {
        Map<String, LongKeyValuePair> values = new HashMap<>();
        values.put("1", new LongKeyValuePair("1",0L));
        values.put("2", new LongKeyValuePair("2",0L));
        values.put("3", new LongKeyValuePair("3",0L));

        List<Rating> userRatings = ratingsService.listAllRatings();

        userRatings.forEach(rater -> {
            Arrays.stream(rater.getRatings())
                    .filter(value -> value != 0)
                    .forEach(value -> {
                        values.get(String.valueOf(value)).increase();
                    });
        });

        return values.values().stream().collect(Collectors.toList());
    }
}
