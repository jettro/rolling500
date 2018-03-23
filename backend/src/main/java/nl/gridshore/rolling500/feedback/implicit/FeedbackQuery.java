package nl.gridshore.rolling500.feedback.implicit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties
public class FeedbackQuery {

    @JsonProperty("request_page")
    private Integer requestPage;
    @JsonProperty("user_id")
    private String userId;
    @JsonProperty("search_string")
    private String searchString;
    @JsonProperty("event_time")
    private String eventTimestamp;
    @JsonProperty("request_size")
    private Integer requestSize;
    @JsonProperty("total_hits")
    private Long totalHits;
    @JsonProperty("album_id")
    private List<String> albumIds;
    @JsonProperty("query_id")
    private String queryId;

    public FeedbackQuery() {
    }

    public Integer getRequestPage() {
        return requestPage;
    }

    public FeedbackQuery setRequestPage(Integer requestPage) {
        this.requestPage = requestPage;
        return this;
    }

    public String getUserId() {
        return userId;
    }

    public FeedbackQuery setUserId(String userId) {
        this.userId = userId;
        return this;
    }

    public String getSearchString() {
        return searchString;
    }

    public FeedbackQuery setSearchString(String searchString) {
        this.searchString = searchString;
        return this;
    }

    public String getEventTimestamp() {
        return eventTimestamp;
    }

    public FeedbackQuery setEventTimestamp(String eventTimestamp) {
        this.eventTimestamp = eventTimestamp;
        return this;
    }

    public Integer getRequestSize() {
        return requestSize;
    }

    public FeedbackQuery setRequestSize(Integer requestSize) {
        this.requestSize = requestSize;
        return this;
    }

    public Long getTotalHits() {
        return totalHits;
    }

    public FeedbackQuery setTotalHits(Long totalHits) {
        this.totalHits = totalHits;
        return this;
    }

    public List<String> getAlbumIds() {
        return albumIds;
    }

    public FeedbackQuery setAlbumIds(List<String> albumIds) {
        this.albumIds = albumIds;
        return this;
    }

    public String getQueryId() {
        return queryId;
    }

    public FeedbackQuery setQueryId(String queryId) {
        this.queryId = queryId;
        return this;
    }
}
