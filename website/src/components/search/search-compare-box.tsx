import * as React from 'react';
import {connect} from 'react-redux';
import {CardGroup, Card, Form, List, Image, Container} from 'semantic-ui-react';
import {IHit, IHits} from "./search.model";
import {executeDoubleSearch} from "./search.actions";

interface ISearchCompareBoxProps {
    fetchSearchDoubleResults: any;
    isLoading: boolean;
    withLtrHits: IHits;
    withoutLtrHits: IHits;
}

interface ISearchCompareBoxState {
    searchString: string;
}

class SearchCompareBox extends React.Component<ISearchCompareBoxProps, ISearchCompareBoxState> {
    constructor(props: ISearchCompareBoxProps) {
        super(props);
        this.state = {
            searchString: ''
        };
    }

    handleSearchChange = (event: any) => {
        this.setState({
            searchString: event.target.value,
        })
    };

    handleExecuteSearch = () => {
        this.props.fetchSearchDoubleResults(this.state.searchString);
    };

    render() {
        return (
            <Container>
                <Card>
                    <Form onSubmit={this.handleExecuteSearch}>
                        <Form.Input icon={{name: 'search', circular: true}} placeholder='Search ...'
                                    onChange={this.handleSearchChange}/>
                    </Form>
                </Card>
                <CardGroup itemsPerRow={2}>
                    <Card>
                        <Card.Content>
                            <Card.Header content='Normal'/>
                            <List divided relaxed>
                                {this.props.withoutLtrHits.hits ? this.props.withoutLtrHits.hits.map((hit: IHit) => {
                                        return (
                                            <List.Item key={hit.id}>
                                                <Image src={'http://localhost:8080/images/thumbnails/' + hit.image} avatar/>
                                                <List.Content>
                                                    <List.Header>{hit.album}</List.Header>
                                                    <List.Description>{hit.artist}</List.Description>
                                                </List.Content>
                                            </List.Item>
                                        );
                                    })
                                    : []}
                            </List>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header content='Learning To Rank'/>
                            <List divided relaxed>
                                {this.props.withLtrHits.hits ? this.props.withLtrHits.hits.map((hit: IHit) => {
                                        return (
                                            <List.Item key={hit.id}>
                                                <Image src={'http://localhost:8080/images/thumbnails/' + hit.image} avatar/>
                                                <List.Content>
                                                    <List.Header>{hit.album}</List.Header>
                                                    <List.Description>{hit.artist}</List.Description>
                                                </List.Content>
                                            </List.Item>
                                        );
                                    })
                                    : []}
                            </List>
                        </Card.Content>
                    </Card>
                </CardGroup>
            </Container>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isLoading: state.search.isLoading,
    withLtrHits: state.search.withLtrHits,
    withoutLtrHits: state.search.withoutLtrHits,
});

const mapDispatchToProps = (dispatch: Function) => ({
    fetchSearchDoubleResults: (searchString: string) => dispatch(executeDoubleSearch(searchString))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCompareBox);
