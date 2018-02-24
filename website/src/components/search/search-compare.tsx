import * as React from "react";
import { Container,  } from 'semantic-ui-react';
import SearchCompareBox from './search-compare-box';

export class SearchCompare extends React.Component {

    render() {

        return (
            <Container>
                <SearchCompareBox/>
            </Container>
        );
    }
}
