package nl.gridshore.rolling500;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import eu.luminis.elastic.RestClientConfig;
import eu.luminis.elastic.search.response.Aggregation;
import eu.luminis.elastic.search.response.AggregationDeserializer;
import eu.luminis.elastic.search.response.TermsAggregation;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(RestClientConfig.class)
public class Rolling500Application {

	public static void main(String[] args) {
		SpringApplication.run(Rolling500Application.class, args);
	}

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();

        AggregationDeserializer deserializer = new AggregationDeserializer();
        deserializer.register("evidenceAgg", TermsAggregation.class);

        SimpleModule module = new SimpleModule("AggregationDeserializer",
                new Version(1, 0, 0, null, "eu.luminis.elastic", "aggregation-elastic"));
        module.addDeserializer(Aggregation.class, deserializer);

        objectMapper.registerModule(module);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return objectMapper;
    }

}
