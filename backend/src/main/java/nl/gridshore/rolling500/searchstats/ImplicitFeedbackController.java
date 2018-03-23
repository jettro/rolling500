package nl.gridshore.rolling500.searchstats;

import nl.gridshore.rolling500.feedback.implicit.FeedbackClick;
import nl.gridshore.rolling500.feedback.implicit.FeedbackQuery;
import nl.gridshore.rolling500.feedback.implicit.ImplicitFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/generateClickAggregations")
public class ImplicitFeedbackController {

    private ImplicitFeedbackService implicitFeedbackService;
    private SearchStatsService searchStatsService;

    @Autowired
    public ImplicitFeedbackController(ImplicitFeedbackService implicitFeedbackService, SearchStatsService searchStatsService) {
        this.implicitFeedbackService = implicitFeedbackService;
        this.searchStatsService = searchStatsService;
    }

    @GetMapping
    @ResponseBody
    public String aggregateClicks() {
        implicitFeedbackService.getQueries()
                .forEach(feedbackQuery -> {
                    String queryId = feedbackQuery.getQueryId();
                    String term = feedbackQuery.getSearchString();
                    List<String> clicks = implicitFeedbackService.getClicks(queryId).stream().map(FeedbackClick::getAlbumId).collect(Collectors.toList());
                    List<String> clicksTracker = extractClicks(feedbackQuery, clicks);
                    String response = buildResponse(feedbackQuery, queryId, term, clicksTracker);
                    searchStatsService.logStats(response);
                });
        return "Done!";
    }

    private List<String> extractClicks(FeedbackQuery feedbackQuery, List<String> clicks) {
        List<String> clicksTracker = new ArrayList<>();
        feedbackQuery.getAlbumIds().stream().map(albumId -> clicks.contains(albumId) ? "1" : "0").forEach(clicksTracker::add);
        return clicksTracker;
    }

    private String buildResponse(FeedbackQuery feedbackQuery, String queryId, String term, List<String> clicksTracker) {
        return queryId + "\t" +
                term + "\t" +
                0 + "\t" +
                0 + "\t" +
                "[" + feedbackQuery.getAlbumIds().stream().map(String::toString).collect(Collectors.joining(",")) + "]" + "\t" +
                "[" + clicksTracker.stream().map(e -> "false").collect(Collectors.joining(",")) + "]" + "\t" +
                "[" + clicksTracker.stream().collect(Collectors.joining(",")) + "]" + "\t";
    }

}
