package nl.gridshore.rolling500.searchstats;

public class ClickRegistrationRequest {
    private String queryId;
    private long albumId;

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
}
