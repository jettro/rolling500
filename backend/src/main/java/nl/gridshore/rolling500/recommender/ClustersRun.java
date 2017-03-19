package nl.gridshore.rolling500.recommender;

import java.util.List;

/**
 * Created by jettrocoenradie on 14/03/2017.
 */
public class ClustersRun {
    private List<Cluster> clusters;
    private boolean changed;

    public ClustersRun(List<Cluster> clusters, boolean changed) {
        this.clusters = clusters;
        this.changed = changed;
    }

    public List<Cluster> getClusters() {
        return clusters;
    }

    public boolean isChanged() {
        return changed;
    }
}
