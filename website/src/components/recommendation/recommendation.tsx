import * as React from "react";
import {connect} from "react-redux";
import {Card, CardGroup, Divider, Header, Icon, Image, Label, List, Table} from 'semantic-ui-react';
import {IHit, IHits} from "../search/search.model";
import {IMG_URL} from "../../api";
import RatingBox from "../rating/rating-box";
import {requestRecommendations} from "./recommendation-actions";
import {Link} from "react-router-dom";

interface IRecommendationProps {
    fetchRecommendedAlbums: any,
    recommendedAlbums: IHits,
    ratings: Array<number>,
}

interface IRecommendationState {
    numOnes: number,
    numTwos: number,
    numThrees: number,
    numFours: number,
    numFives: number,
}

class Recommendation extends React.Component<IRecommendationProps, IRecommendationState> {


    constructor(props: IRecommendationProps) {
        super(props);
        this.state = {
            numOnes: 0,
            numTwos: 0,
            numThrees: 0,
            numFours: 0,
            numFives: 0,
        };
    }


    componentWillReceiveProps(nextProps: Readonly<IRecommendationProps>, nextContext: any): void {
        this.setState({
            numOnes: this.props.ratings.filter(value => value === 1).length,
            numTwos: this.props.ratings.filter(value => value === 2).length,
            numThrees: this.props.ratings.filter(value => value === 3).length,
            numFours: this.props.ratings.filter(value => value === 4).length,
            numFives: this.props.ratings.filter(value => value === 5).length,
        });
    }

    componentDidMount(): void {
        this.props.fetchRecommendedAlbums();
    }

    render() {
        return (
            <div>
                <CardGroup>
                    {(this.props.recommendedAlbums.hits && this.props.recommendedAlbums.hits.length > 0) ? this.props.recommendedAlbums.hits.map((hit: IHit) => {
                            return (
                                <Card key={hit.id}>
                                    <Image src={IMG_URL + hit.image}/>
                                    <Card.Content>
                                        <Card.Header>{hit.album}</Card.Header>
                                        <Card.Meta>{hit.artist}({hit.year})</Card.Meta>
                                        <Card.Description><RatingBox hit={hit}/></Card.Description>
                                    </Card.Content>
                                </Card>
                            );
                        }) :
                        <Card>
                            <Card.Content>
                                <Card.Description>Please add some ratings first, go to the
                                    <Label as={Link}
                                           to='/rate'>Rate
                                        page</Label>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    }
                </CardGroup>
                <Divider/>
                <Card>
                    <Card.Content>
                        <Card.Header>Meta data</Card.Header>
                        <Card.Meta>A bit a meta data about you as a user</Card.Meta>
                        <Card.Description>
                            <Header sub>user id</Header>
                            {localStorage.getItem('user_id')}
                            <Header sub>Number of given ratings</Header>
                            <List relaxed>
                                <List.Item><List.Content>{this.state.numOnes} - <Icon name='star'/></List.Content></List.Item>
                                <List.Item><List.Content>{this.state.numTwos} - <Icon name='star'/><Icon name='star'/></List.Content></List.Item>
                                <List.Item><List.Content>{this.state.numThrees} - <Icon name='star'/><Icon name='star'/><Icon
                                    name='star'/></List.Content></List.Item>
                                <List.Item><List.Content>{this.state.numFours} - <Icon name='star'/><Icon name='star'/><Icon
                                    name='star'/><Icon name='star'/></List.Content></List.Item>
                                <List.Item><List.Content>{this.state.numFives} - <Icon name='star'/><Icon name='star'/><Icon
                                    name='star'/><Icon name='star'/><Icon name='star'/></List.Content></List.Item>
                            </List>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    recommendedAlbums: state.recommendation.albums,
    ratings: state.rating.ratings
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchRecommendedAlbums: () => dispatch(requestRecommendations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
