package nl.gridshore.rolling500.albums;

import nl.gridshore.rolling500.dashboard.KeyValuePair;

import java.util.List;
import java.util.UUID;

/**
 * Result from a search request
 */
public class SearchResult {
    private long totalNumberOfResults;
    private List<Album> foundAlbums;
    private List<KeyValuePair<Long>> artists;
    private List<KeyValuePair<Long>> labels;
    private String queryId;

    public SearchResult() {
        queryId = UUID.randomUUID().toString();
    }

    public long getTotalNumberOfResults() {
        return totalNumberOfResults;
    }

    public void setTotalNumberOfResults(long totalNumberOfResults) {
        this.totalNumberOfResults = totalNumberOfResults;
    }

    public List<Album> getFoundAlbums() {
        return foundAlbums;
    }

    public void setFoundAlbums(List<Album> foundAlbums) {
        this.foundAlbums = foundAlbums;
    }

    public List<KeyValuePair<Long>> getArtists() {
        return artists;
    }

    public void setArtists(List<KeyValuePair<Long>> artists) {
        this.artists = artists;
    }

    public List<KeyValuePair<Long>> getLabels() {
        return labels;
    }

    public void setLabels(List<KeyValuePair<Long>> labels) {
        this.labels = labels;
    }

    public String getQueryId() {
        return queryId;
    }

    public void setQueryId(String queryId) {
        this.queryId = queryId;
    }
}
