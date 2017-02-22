package nl.gridshore.rolling500;

import eu.luminis.elastic.RestClientConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(RestClientConfig.class)
public class Rolling500Application {

	public static void main(String[] args) {
		SpringApplication.run(Rolling500Application.class, args);
	}
}
