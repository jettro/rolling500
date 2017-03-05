package nl.gridshore.rolling500.evidence;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Evidence {
    @JsonProperty("user_id")
    private String userId;

    @JsonProperty("album_id")
    private long albumId;

    @JsonProperty("evidence_name")
    private String evidenceName;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(long albumId) {
        this.albumId = albumId;
    }

    public String getEvidenceName() {
        return evidenceName;
    }

    public void setEvidenceName(String evidenceName) {
        this.evidenceName = evidenceName;
    }
}
