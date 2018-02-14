package nl.gridshore.rolling500.evidence;

import com.fasterxml.jackson.core.type.TypeReference;
import eu.luminis.elastic.search.response.query.ElasticQueryResponse;

public class EvidenceTypeReference extends TypeReference<ElasticQueryResponse<Evidence>> {
}
