package nl.gridshore.rolling500.feedback.implicit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties
public class FeedbackClick {

    @JsonProperty("album_id")
    private String albumId;
    @JsonProperty("event_time")
    private String eventTime;
    @JsonProperty("query_id")
    private String queryId;
    @JsonProperty("user_id")
    private String userId;

    public FeedbackClick() {
    }

    public String getAlbumId() {
        return albumId;
    }

    public FeedbackClick setAlbumId(String albumId) {
        this.albumId = albumId;
        return this;
    }

    public String getEventTime() {
        return eventTime;
    }

    public FeedbackClick setEventTime(String eventTime) {
        this.eventTime = eventTime;
        return this;
    }

    public String getQueryId() {
        return queryId;
    }

    public FeedbackClick setQueryId(String queryId) {
        this.queryId = queryId;
        return this;
    }

    public String getUserId() {
        return userId;
    }

    public FeedbackClick setUserId(String userId) {
        this.userId = userId;
        return this;
    }
}
