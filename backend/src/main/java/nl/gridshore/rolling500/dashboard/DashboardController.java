package nl.gridshore.rolling500.dashboard;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import eu.luminis.elastic.search.SearchService;
import org.apache.http.entity.StringEntity;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final RestClient restClient;
    private final ObjectMapper jacksonObjectMapper;
    private final SearchService searchService;

    @Autowired
    public DashboardController(RestClient restClient, ObjectMapper jacksonObjectMapper, SearchService searchService) {
        this.restClient = restClient;
        this.jacksonObjectMapper = jacksonObjectMapper;
        this.searchService = searchService;
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
        List<KeyValuePair<Long>> ratings = new ArrayList<>();

        String body = "{\n" +
                "  \"fields\": [\n" +
                "    \"ratings\"\n" +
                "  ],\n" +
                "  \"offsets\": false,\n" +
                "  \"payloads\": false,\n" +
                "  \"positions\": false,\n" +
                "  \"term_statistics\": true,\n" +
                "  \"field_statistics\": false\n" +
                "}";
        try {
            Response response = restClient.performRequest(
                    "GET",
                    "/ratings/rating/37cb0c5b-4d07-4124-b421-eea9a1b4c903/_termvectors",
                    new HashMap<>(),
                    new StringEntity(body, Charset.defaultCharset()));

            JsonNode jsonNode = jacksonObjectMapper.readTree(response.getEntity().getContent());

            JsonNode jsonNode1 = jsonNode.findValue("term_vectors").findValue("ratings").findValue("terms");
            ratings.add(new KeyValuePair<>("Good", jsonNode1.findValue("3").findValue("term_freq").asLong()));
            ratings.add(new KeyValuePair<>("Neutral", jsonNode1.findValue("2").findValue("term_freq").asLong()));
            ratings.add(new KeyValuePair<>("Bad", jsonNode1.findValue("1").findValue("term_freq").asLong()));

            return ratings;

        } catch (IOException e) {
            throw new RuntimeException();
        }
    }
}
