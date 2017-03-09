package nl.gridshore.rolling500.ratings;

import com.fasterxml.jackson.core.type.TypeReference;
import eu.luminis.elastic.search.response.QueryResponse;

public class RatingTypeReference extends TypeReference<QueryResponse<Rating>> {
}
