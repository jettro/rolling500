package nl.gridshore.rolling500.feedback.implicit;

import com.fasterxml.jackson.core.type.TypeReference;
import eu.luminis.elastic.search.response.query.ElasticQueryResponse;

public class ImplicitFeedbackClickTypeReference extends TypeReference<ElasticQueryResponse<FeedbackClick>> {
}
