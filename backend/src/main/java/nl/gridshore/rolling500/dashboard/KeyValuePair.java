package nl.gridshore.rolling500.dashboard;

/**
 * Make it easier to create a list of components that have a key and a value of certain type.
 */
public class KeyValuePair<T> {
    private String key;
    private T value;

    public KeyValuePair(String key, T value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }
}
