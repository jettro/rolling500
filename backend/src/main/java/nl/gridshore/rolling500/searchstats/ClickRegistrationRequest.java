package nl.gridshore.rolling500.searchstats;

public class ClickRegistrationRequest {
    private String queryId;
    private long albumId;
    private String searchString;
    private String userId;
    private int position;

    public String getQueryId() {
        return queryId;
    }

    public void setQueryId(String queryId) {
        this.queryId = queryId;
    }

    public long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(long albumId) {
        this.albumId = albumId;
    }

    public String getSearchString() {
        return searchString;
    }

    public void setSearchString(String searchString) {
        this.searchString = searchString;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getPosition() {
        return position;
    }

    public ClickRegistrationRequest setPosition(int position) {
        this.position = position;
        return this;
    }
}
