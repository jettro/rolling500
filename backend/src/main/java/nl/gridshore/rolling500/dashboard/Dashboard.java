package nl.gridshore.rolling500.dashboard;

import java.util.List;

/**
 * Created by jettrocoenradie on 27/02/2017.
 */
public class Dashboard {
    private List<KeyValuePair<Long>> ratings;
    private long numUsers;
    private List<KeyValuePair<Long>> evidences;

    public List<KeyValuePair<Long>> getRatings() {
        return ratings;
    }

    public void setRatings(List<KeyValuePair<Long>> ratings) {
        this.ratings = ratings;
    }

    public long getNumUsers() {
        return numUsers;
    }

    public void setNumUsers(long numUsers) {
        this.numUsers = numUsers;
    }

    public List<KeyValuePair<Long>> getEvidences() {
        return evidences;
    }

    public void setEvidences(List<KeyValuePair<Long>> evidences) {
        this.evidences = evidences;
    }
}
