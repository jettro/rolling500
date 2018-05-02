import * as React from "react";
import {connect} from "react-redux";
import {Container, Header, Statistic} from 'semantic-ui-react';
import {requestRatingsDistribution} from "./rating.actions";
import {Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {RatingDistribution} from "./rating.model";


interface IRecommendationDashboardProps {
    ratingsDistribution: Array<RatingDistribution>;
    fetchRatingsDistribution: any;
}

interface IRecommendationDashboardState {

}

class RatingDashboard extends React.Component<IRecommendationDashboardProps, IRecommendationDashboardState> {

    componentDidMount(): void {
        this.props.fetchRatingsDistribution();
    }


    render() {
        return (
            <Container>
                <Header as='h2'>Ratings</Header>
                <BarChart width={600} height={400} data={this.props.ratingsDistribution}
                          margin={{top: 15, right: 30, left: 20, bottom: 20}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="rating">
                        <Label value="rating" offset={0} position="bottom" />
                    </XAxis>
                    <YAxis>
                        <Label value="Times used" angle={-90} position="insideLeft"/>
                    </YAxis>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="numRatings" fill="#8884d8" legendType="none"/>
                </BarChart>
            </Container>
        )
    };
}

const mapStateToProps = (state: any) => ({
    ratingsDistribution: state.rating.ratingsDistribution,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchRatingsDistribution: () => dispatch(requestRatingsDistribution()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingDashboard);
