import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PageHeader from './components/header/header';
import { Search } from './components/search/search';

import { Container, Divider, List, Segment } from 'semantic-ui-react';
import {SearchCompare} from "./components/search/search-compare";
import {connect} from "react-redux";
import {requestMyRatings} from "./components/rating/rating.actions";
import RatingRater from "./components/rating/rating-rater";
import Recommendation from "./components/recommendation/recommendation";

interface IAppProps {
    fetchRatings: any
}

class App extends React.Component<IAppProps, null> {

    componentDidMount() {
        this.props.fetchRatings();
    }

    render() {
        return (
            <Router>
                <div>
                    <PageHeader />

                    <Container style={{ marginTop: '7em' }}>
                        <Route exact path="/" component={Search} />
                        <Route exact path="/compare" component={SearchCompare} />
                        <Route exact path="/rate" component={RatingRater} />
                        <Route exact path="/recommendation" component={Recommendation} />
                    </Container>


                    <Segment
                        vertical
                        style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
                    >
                        <Container textAlign="center">
                            <Divider section />
                            <List horizontal divided link>
                                <List.Item as="a" href="#">
                                    Site Map
                                </List.Item>
                                <List.Item as="a" href="#">
                                    Contact Us
                                </List.Item>
                                <List.Item as="a" href="#">
                                    Terms and Conditions
                                </List.Item>
                                <List.Item as="a" href="#">
                                    Privacy Policy
                                </List.Item>
                            </List>
                        </Container>
                    </Segment>
                </div>
            </Router>
        );
    }
}

const mapDispatchToProps = (dispatch: Function) => ({
    fetchRatings: () => dispatch(requestMyRatings()),
});

export default connect(null, mapDispatchToProps)(App);
