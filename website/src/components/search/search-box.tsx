import * as React from 'react';
import {connect} from 'react-redux';
import {CardGroup, Card, Form} from 'semantic-ui-react';
import {IHit, IHits} from "./search.model";
import {executeSearch, registerSearchClick} from "./search.actions";
import {SearchResultsList} from "./search-results-list";
import {SearchBoxDetail} from "./search-box-detail";

interface ISearchBoxProps {
    fetchSearchResults: any;
    registerClick: any;
    isLoading: boolean;
    hits: IHits;
}

interface ISearchBoxState {
    searchString: string;
    selectedHit: IHit;
    enableLtr: boolean;
}

class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {
    constructor(props: ISearchBoxProps) {
        super(props);
        this.state = {
            searchString: '',
            selectedHit: null,
            enableLtr: false
        };
    }

    handleSearchChange = (event: any) => {
        this.setState({
            searchString: event.target.value,
        })
    };

    handleExecuteSearch = () => {
        this.props.fetchSearchResults(this.state.searchString, this.state.enableLtr);
    };

    handleItemClick = (item: IHit) => {
        this.setState({
            searchString: this.state.searchString,
            selectedHit: item,
            enableLtr: this.state.enableLtr,
        });
        this.props.registerClick(item.id, this.props.hits.queryId, this.state.searchString);
    };

    toggleLtr = (event: any) => {
        this.setState({
            enableLtr: !this.state.enableLtr,
        });
    };

    render() {
        return (
            <CardGroup itemsPerRow={2}>
                <Card>
                    <Card.Content>
                        <Card.Header>
                            <Form onSubmit={this.handleExecuteSearch}>
                                <Form.Group inline>
                                    <Form.Input placeholder='Search ...' width={12}
                                                onChange={this.handleSearchChange} focus/>
                                    <Form.Button basic circular color='blue' icon='search'
                                                 onClick={this.handleExecuteSearch}/>
                                </Form.Group>
                                <Form.Radio toggle onChange={this.toggleLtr} label='Enable Learning To Rank'
                                            content='test'/>
                            </Form>
                        </Card.Header>
                        <SearchResultsList hits={this.props.hits.hits} selectItem={this.handleItemClick}/>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header content='Details'/>
                        {this.state.selectedHit ?
                            <SearchBoxDetail hit={this.state.selectedHit}/>
                            :
                            <div>Please select a result first</div>
                        }
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
    fetchSearchResults: (searchString: string, enableLtr: boolean) => dispatch(executeSearch(searchString, enableLtr)),
    registerClick: (albumId: number, queryId: string, searchString: string) => dispatch(registerSearchClick(albumId, queryId, searchString)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
