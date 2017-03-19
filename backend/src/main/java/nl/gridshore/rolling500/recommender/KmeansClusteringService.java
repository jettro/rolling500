package nl.gridshore.rolling500.recommender;

import java.util.List;
import java.util.stream.Collectors;

public class KmeansClusteringService {

    public ClustersRun executeRun(List<Cluster> clusters) {
        List<Cluster> newClusters = clusters.stream()
                .map(cluster -> new Cluster(cluster.getId(), cluster.getCentroid()))
                .collect(Collectors.toList());

        List<Point> centroids = clusters.stream()
                .map(Cluster::getCentroid)
                .collect(Collectors.toList());

        boolean changeMade = false;

        for (Cluster cluster : clusters) {
            List<Point> points = cluster.getPoints();
            for (Point point : points) {
                Point closestCentroid = findClosestCentroid(centroids, point);
                if (closestCentroid.getId() != cluster.getCentroid().getId()) {
                    changeMade = true;
                }
                newClusters.forEach(cluster1 -> {
                    if (cluster1.getCentroid().getId() == closestCentroid.getId()) {
                        cluster1.addPoint(point);
                    }
                });
            }
        }

        return new ClustersRun(newClusters, changeMade);
    }

    public boolean assignmentClosestClusterChanged(List<Point> centroids, Point point, Point oldCentroid) {
        Point closestCentroid = findClosestCentroid(centroids, point);
        if (oldCentroid.getId() != closestCentroid.getId()) {
            return true;
        }
        return false;
    }

    public Point findClosestCentroid(List<Point> centroids, Point point) {
        Point closest = centroids.get(0);

        double distance = Double.MAX_VALUE;

        for (Point centroid : centroids) {
            double distance1 = calcEuclideanDistance(point.getCoord(), centroid.getCoord());
            if (distance1 < distance) {
                distance = distance1;
                closest = centroid;
            }
        }

        return closest;
    }

    /**
     * Calculate the euclidean distance between two points in space.
     *
     * @param coord  array of doubles representing coordinates of point to calculate distance to center for
     * @param center array of doubles representing coordinates of a cluster center point to calculate distance to
     * @return double representing the euclidean distance between the two points
     */
    public double calcEuclideanDistance(double[] coord, double[] center) {
        int len = coord.length;
        double sumSquared = 0.0;
        for (int i = 0; i < len; i++) {
            double v = coord[i] - center[i];
            sumSquared += v * v;
        }
        return Math.sqrt(sumSquared);
    }
}
