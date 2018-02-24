import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PageHeader from './components/header/header';
import { Search } from './components/search/search';

import { Container, Divider, List, Segment } from 'semantic-ui-react';
import {SearchCompare} from "./components/search/search-compare";

export default class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <PageHeader />

                    <Container style={{ marginTop: '7em' }}>
                        <Route exact path="/" component={Search} />
                        <Route exact path="/compare" component={SearchCompare} />
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
