import * as React from 'react';
import {connect} from 'react-redux';
import {CardGroup, Card, Form, Container} from 'semantic-ui-react';
import {IHits, LtrModel} from "./search.model";
import {executeDoubleSearch, executeFetchLtrModels} from "./search.actions";
import {SearchResultsList} from "./search-results-list";

interface ISearchCompareBoxProps {
    fetchSearchDoubleResults: any;
    fetchLtrModels: any;
    isLoading: boolean;
    withLtrHits: IHits;
    withoutLtrHits: IHits;
    isFetchingLtr: boolean;
    ltrModels: Array<LtrModel>;
}

interface ISearchCompareBoxState {
    searchString: string;
    selectedLtrModel: string;
}

class SearchCompareBox extends React.Component<ISearchCompareBoxProps, ISearchCompareBoxState> {
    constructor(props: ISearchCompareBoxProps) {
        super(props);
        this.state = {
            searchString: '',
            selectedLtrModel: ''
        };

        this.props.fetchLtrModels();
    }

    handleSearchChange = (event: any) => {
        this.setState({
            searchString: event.target.value,
        })
    };

    handleSelectedLtrModelChange = (event: any, {value}: any) => {
        this.setState({
            selectedLtrModel: value,
        })
    };

    handleExecuteSearch = () => {
        this.props.fetchSearchDoubleResults(this.state.searchString, this.state.selectedLtrModel);
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleExecuteSearch}>
                    <Form.Group inline>
                        <Form.Select options={this.props.ltrModels.map((model: LtrModel) => {
                            return {key: model.id, text: model.name, value: model.id}
                        })} placeholder='select model'
                                     onChange={this.handleSelectedLtrModelChange}/>
                        <Form.Input icon={{name: 'search', circular: true}} placeholder='Search ...'
                                    onChange={this.handleSearchChange}/>
                    </Form.Group>
                </Form>
                <CardGroup itemsPerRow={2}>
                    <Card>
                        <Card.Content>
                            <Card.Header content='Normal'/>
                            <SearchResultsList hits={this.props.withoutLtrHits.hits}/>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header content='Learning To Rank'/>
                            <SearchResultsList hits={this.props.withLtrHits.hits}/>
                        </Card.Content>
                    </Card>
                </CardGroup>
            </Container>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isLoading: state.search.isFetching,
    withLtrHits: state.search.withLtrHits,
    withoutLtrHits: state.search.withoutLtrHits,
    ltrModels: state.search.ltrModels,
    isFetchingLtr: state.search.isFetchingLtr,
});

const mapDispatchToProps = (dispatch: Function) => ({
    fetchSearchDoubleResults: (searchString: string, ltrModel: string) => dispatch(executeDoubleSearch(searchString, ltrModel)),
    fetchLtrModels: () => dispatch(executeFetchLtrModels())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCompareBox);
