package nl.gridshore.rolling500.searchstats;

public class ClickRegistrationRequest {
    private String queryId;
    private long albumId;
    private String searchString;

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

    public ClickRegistrationRequest setSearchString(String searchString) {
        this.searchString = searchString;
        return this;
    }
}
