FROM    openjdk:jdk-alpine as build
WORKDIR /opt/app
ADD     ./ .
RUN     chmod +x ./mvnw && \
        ./mvnw clean install
FROM    openjdk:jre-alpine
COPY    --from=build /opt/app/target/rolling500-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE  8080
CMD     java -jar /app/app.jar