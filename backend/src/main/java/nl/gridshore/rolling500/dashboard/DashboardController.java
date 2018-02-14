package nl.gridshore.rolling500.dashboard;

import eu.luminis.elastic.search.SearchByTemplateRequest;
import eu.luminis.elastic.search.SearchService;
import eu.luminis.elastic.search.SingleClusterSearchService;
import eu.luminis.elastic.search.response.HitsAggsResponse;
import eu.luminis.elastic.search.response.aggregations.bucket.TermsAggregation;
import nl.gridshore.rolling500.evidence.Evidence;
import nl.gridshore.rolling500.evidence.EvidenceTypeReference;
import nl.gridshore.rolling500.ratings.Rating;
import nl.gridshore.rolling500.ratings.RatingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final SingleClusterSearchService searchService;
    private final RatingsService ratingsService;

    @Autowired
    public DashboardController(SingleClusterSearchService searchService, RatingsService ratingsService) {
        this.searchService = searchService;
        this.ratingsService = ratingsService;
    }

    @GetMapping
    public Dashboard obtainDashboard() {
        Dashboard dashboard = new Dashboard();
        dashboard.setRatings(obtainRatings());
        dashboard.setNumUsers(obtainNumUsers());
        dashboard.setEvidences(evidenceAggregation());
        return dashboard;
    }

    private long obtainNumUsers() {
        return searchService.countByIndex("ratings");
    }

    private List<KeyValuePair<Long>> evidenceAggregation() {
        SearchByTemplateRequest request = SearchByTemplateRequest.create()
                .setIndexName("evidences")
                .setTemplateName("evidence_aggregation.twig")
                .setTypeReference(new EvidenceTypeReference());

        HitsAggsResponse<Evidence> response = searchService.aggsByTemplate(request);

        TermsAggregation aggregation = (TermsAggregation) response.getAggregations().get("evidenceAgg");

        return aggregation.getBuckets().stream()
                .map(termsBucket -> new KeyValuePair<>(termsBucket.getKey(), termsBucket.getDocCount()))
                .collect(Collectors.toList());
    }

    private List<KeyValuePair<Long>> obtainRatings() {
        Map<String, LongKeyValuePair> values = new HashMap<>();
        values.put("1", new LongKeyValuePair("1", 0L));
        values.put("2", new LongKeyValuePair("2", 0L));
        values.put("3", new LongKeyValuePair("3", 0L));

        List<Rating> userRatings = ratingsService.listAllRatings();

        userRatings.forEach(rater -> {
            Arrays.stream(rater.getRatings())
                    .filter(value -> value != 0)
                    .forEach(value -> {
                        values.get(String.valueOf(value)).increase();
                    });
        });

        return new ArrayList<>(values.values());
    }
}
