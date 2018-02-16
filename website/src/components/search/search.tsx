import * as React from "react";
import { Container, Divider, List, Segment } from 'semantic-ui-react';
import SearchBox from './search-box';

export class Search extends React.Component {

    render() {

        return (
            <Container>
                <SearchBox />
            </Container>
        );
    }
}
