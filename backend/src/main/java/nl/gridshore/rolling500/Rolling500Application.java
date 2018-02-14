package nl.gridshore.rolling500;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import eu.luminis.elastic.SingleClusterRestClientConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
@Import(SingleClusterRestClientConfig.class)
public class Rolling500Application {

    public static void main(String[] args) {
        SpringApplication.run(Rolling500Application.class, args);
    }

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();

        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return objectMapper;
    }

    /**
     * Disable CORS for the develop server for the frontend
     * @return Specific required return class
     */
    @Profile("dev")
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("HEAD", "GET", "OPTIONS", "POST", "PUT", "DELETE")
                        .allowedOrigins("http://localhost:9000");
            }
        };
    }


//    @Bean
//    public AggregationConfig aggregationConfig() {
//        AggregationConfig config = new AggregationConfig();
//        config.addConfig("evidenceAgg", TermsAggregation.class);
//        config.addConfig("artistsAgg", TermsAggregation.class);
//        config.addConfig("labelsAgg", TermsAggregation.class);
//
//        return config;
//    }
}
