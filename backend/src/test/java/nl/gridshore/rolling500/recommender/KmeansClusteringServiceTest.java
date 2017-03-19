package nl.gridshore.rolling500.recommender;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class KmeansClusteringServiceTest {
    private KmeansClusteringService service;

    @Before
    public void setUp() throws Exception {
        service = new KmeansClusteringService();
    }

    @Test
    public void check2DVectorDistance() {
        double distance = service.calcEuclideanDistance(new double[]{0D, 0D}, new double[]{3D, 4D});
        assertEquals(5, distance, 0.01);
    }

    @Test
    public void check3DVectorDistance() {
        double distance = service.calcEuclideanDistance(new double[]{0D, 0D, 0D}, new double[]{3D, 4D, 3D});
        assertEquals(5.83, distance, 0.01);
    }

    @Test
    public void find2DClosestCentroid() {
        List<Point> centroids = new ArrayList<>();
        centroids.add(new Point(1, new double[]{0, 0}));
        centroids.add(new Point(2, new double[]{1, 1}));
        centroids.add(new Point(3, new double[]{2, 2}));

        Point closestCentroid = service.findClosestCentroid(centroids, new Point(1, new double[]{3, 4}));
        assertEquals(3L, closestCentroid.getId());
        closestCentroid = service.findClosestCentroid(centroids, new Point(1, new double[]{1, 1}));
        assertEquals(2L, closestCentroid.getId());
        closestCentroid = service.findClosestCentroid(centroids, new Point(1, new double[]{1, 2}));
        assertEquals(2L, closestCentroid.getId());
        closestCentroid = service.findClosestCentroid(centroids, new Point(1, new double[]{1, 3}));
        assertEquals(3L, closestCentroid.getId());
    }

    @Test
    public void findClosestCluster() {
        List<Cluster> clusters = new ArrayList<>();
        clusters.add(new Cluster(1, new Point(1, new double[]{1, 1})));
        clusters.add(new Cluster(2, new Point(2, new double[]{1, 5})));
        clusters.add(new Cluster(3, new Point(3, new double[]{5, 5})));
        clusters.add(new Cluster(4, new Point(4, new double[]{5, 1})));

        Cluster cluster = clusters.get(0);
        cluster.addPoint(new Point(91, new double[]{0, 0}));
        cluster.addPoint(new Point(92, new double[]{0, 6}));
        cluster.addPoint(new Point(93, new double[]{6, 6}));
        cluster.addPoint(new Point(94, new double[]{6, 0}));

        ClustersRun clustersRun = service.executeRun(clusters);

        assertTrue(clustersRun.isChanged());
        for (Cluster cluster1 : clustersRun.getClusters()) {
            assertEquals(1, cluster1.getPoints().size());

            if (cluster1.getCentroid().getId() == 1) {
                assertEquals(91, cluster1.getPoints().get(0).getId());
            } else if (cluster1.getCentroid().getId() == 2) {
                assertEquals(92, cluster1.getPoints().get(0).getId());
            } else if (cluster1.getCentroid().getId() == 3) {
                assertEquals(93, cluster1.getPoints().get(0).getId());
            } else if (cluster1.getCentroid().getId() == 4) {
                assertEquals(94, cluster1.getPoints().get(0).getId());
            }
        }
    }
}