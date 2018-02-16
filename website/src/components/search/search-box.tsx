import * as React from 'react';
import {connect} from 'react-redux';
import {CardGroup, Card, Form, List, Image, Item} from 'semantic-ui-react';
import {IHit, IHits} from "./search.model";
import {executeSearch, registerSearchClick} from "./search.actions";

interface ISearchBoxProps {
    fetchSearchResults: any;
    registerClick: any;
    isLoading: boolean;
    hits: IHits;
}

interface ISearchBoxState {
    searchString: string;
    selectedHit: IHit;
}

class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {
    constructor(props: ISearchBoxProps) {
        super(props);
        this.state = {
            searchString: '',
            selectedHit: null
        };
    }

    handleSearchChange = (event: any) => {
        this.setState({
            searchString: event.target.value,
        })
    };

    handleExecuteSearch = () => {
        this.props.fetchSearchResults(this.state.searchString);
    };

    handleItemClick = (item: IHit) => {
        this.setState({
            searchString: this.state.searchString,
            selectedHit: item,
        });
        this.props.registerClick(item.id, this.props.hits.queryId);
    };

    render() {
        return (
            <CardGroup itemsPerRow={2}>
                <Card>
                    <Card.Content>
                        <Card.Header>
                            <Form onSubmit={this.handleExecuteSearch}>
                                <Form.Input icon={{name: 'search', circular: true}} placeholder='Search ...'
                                            onChange={this.handleSearchChange}/>
                            </Form>
                        </Card.Header>
                        <List divided relaxed>
                            {this.props.hits.hits ? this.props.hits.hits.map((hit: IHit) => {
                                    return (
                                        <List.Item key={hit.id} onClick={() => this.handleItemClick(hit)}>
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
                        <Card.Header content='Details'/>
                        {this.state.selectedHit ?
                            <Item>
                                <Item.Image src={'http://localhost:8080/images/' + this.state.selectedHit.image}
                                            size='tiny'/>
                                <Item.Content>
                                    <Item.Header>{this.state.selectedHit.album}</Item.Header>
                                    <Item.Meta>{this.state.selectedHit.artist}</Item.Meta>
                                    <Item.Description>
                                        <div dangerouslySetInnerHTML={{__html: this.state.selectedHit.information}}/>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                            :
                            <div>Please select a result first</div>}

                    </Card.Content>

                </Card>
            </CardGroup>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isLoading: state.search.isLoading,
    hits: state.search.hits,
});

const mapDispatchToProps = (dispatch: Function) => ({
    fetchSearchResults: (searchString: string) => dispatch(executeSearch(searchString)),
    registerClick: (albumId: number, queryId: string) => dispatch(registerSearchClick(albumId, queryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
