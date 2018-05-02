import * as React from "react";
import {connect} from "react-redux";
import {Container, Header, Statistic} from 'semantic-ui-react';
import {requestRecommendationDashboard} from "./recommendation-actions";
import {RecommendationStatistics} from "./recommendation-model";
import {Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis} from "recharts";


interface IRecommendationDashboardProps {
    statistics: RecommendationStatistics;
    fetchRecommendationDashboard: any;
}

interface IRecommendationDashboardState {

}

class RecommendationDashboard extends React.Component<IRecommendationDashboardProps, IRecommendationDashboardState> {
    componentDidMount(): void {
        this.props.fetchRecommendationDashboard();
    }

    percentageUsersWithRecommendations(): string {
        return ((this.props.statistics.amountOfUsersWithRecommendations / this.props.statistics.amountOfUsers) * 100).toFixed(1);
    }

    percentageItemsRecommended(): string {
        return ((this.props.statistics.albumStatistics.length / this.props.statistics.amountOfItemsToRecommend) * 100).toFixed(1);
    }

    render() {
        return (
            <Container>
                <Header as='h2'>Recommendations</Header>
                <Statistic.Group widths='four'>
                    <Statistic>
                        <Statistic.Value content={this.props.statistics.amountOfUsers}/>
                        <Statistic.Label># Users</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value content={this.percentageUsersWithRecommendations()}/>
                        <Statistic.Label>% Recommendations for users</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value content={this.props.statistics.amountOfItemsToRecommend}/>
                        <Statistic.Label># items</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value content={this.percentageItemsRecommended()}/>
                        <Statistic.Label>% Recommended of all items</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <BarChart width={600} height={400} data={this.props.statistics.albumStatistics.reverse()}
                          margin={{top: 15, right: 30, left: 20, bottom: 20}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="sequence">
                        <Label value="Albums by sequence" offset={0} position="bottom" />
                    </XAxis>
                    <YAxis>
                        <Label value="Times recommended" angle={-90} position="insideLeft"/>
                    </YAxis>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="numberOfRecommendations" fill="#8884d8" legendType="none"/>
                </BarChart>
            </Container>
        )
    };
}

const mapStateToProps = (state: any) => ({
    statistics: state.recommendation.statistics,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchRecommendationDashboard: () => dispatch(requestRecommendationDashboard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationDashboard);
