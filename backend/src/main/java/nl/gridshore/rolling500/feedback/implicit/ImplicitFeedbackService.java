package nl.gridshore.rolling500.feedback.implicit;

import eu.luminis.elastic.search.SearchByTemplateRequest;
import eu.luminis.elastic.search.SingleClusterSearchService;
import eu.luminis.elastic.search.response.HitsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ImplicitFeedbackService {

    private static final String INDEX = "implicitfeedback";
    private static final String QUERY_ALL_QUERY_TMPL = "find_all_feedback_queries.twig";
    private static final String QUERY_ALL_CLICK_TMPL = "find_all_feedback_clicks.twig";

    private final SingleClusterSearchService searchService;

    @Autowired
    public ImplicitFeedbackService(SingleClusterSearchService searchService) {
        this.searchService = searchService;
    }

    public List<FeedbackQuery> getQueries() {
        SearchByTemplateRequest request = SearchByTemplateRequest.create()
                .setIndexName(INDEX)
                .setTemplateName(QUERY_ALL_QUERY_TMPL)
                .setTypeReference(new ImplicitFeedbackQueryTypeReference());
        HitsResponse<FeedbackQuery> hitsResponse = searchService.queryByTemplate(request);
        return hitsResponse.getHits();
    }

    public List<FeedbackClick> getClicks(String queryId) {
        Map<String, Object> params = new HashMap<>();
        params.put("query_id", queryId);

        SearchByTemplateRequest request = SearchByTemplateRequest.create()
                .setModelParams(params)
                .setIndexName(INDEX)
                .setTemplateName(QUERY_ALL_CLICK_TMPL)
                .setTypeReference(new ImplicitFeedbackClickTypeReference());
        HitsResponse<FeedbackClick> hitsResponse = searchService.queryByTemplate(request);

        return hitsResponse.getHits();
    }
}
