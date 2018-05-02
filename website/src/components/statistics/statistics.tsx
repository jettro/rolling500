import * as React from "react";
import {Container, Header} from 'semantic-ui-react';
import RecommendationDashboard from "../recommendation/recommendation-dashboard";
import RatingDashboard from "../rating/rating-dashboard";

export class Statistics extends React.Component {

    render() {

        return (
            <Container>
                <Header as='h1'>Statistics</Header>
                <RecommendationDashboard/>
                <RatingDashboard/>
            </Container>
        );
    }
}
