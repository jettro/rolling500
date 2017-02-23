package nl.gridshore.rolling500.ratings;

import com.fasterxml.jackson.core.type.TypeReference;
import eu.luminis.elastic.document.response.GetByIdResponse;

public class RatingByIdTypeReference extends TypeReference<GetByIdResponse<Rating>> {
}
