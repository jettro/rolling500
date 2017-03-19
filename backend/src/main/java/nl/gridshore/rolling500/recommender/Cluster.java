package nl.gridshore.rolling500.recommender;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by jettrocoenradie on 14/03/2017.
 */
public class Cluster {
    private long id;
    private Point centroid;
    private List<Point> points;

    public Cluster(long id, Point centroid) {
        this.id = id;
        this.centroid = centroid;
        this.points = new ArrayList<>();
    }

    public long getId() {
        return id;
    }

    public Point getCentroid() {
        return centroid;
    }

    public List<Point> getPoints() {
        return points;
    }

    public void addPoint(Point point) {
        this.points.add(point);
    }
}
