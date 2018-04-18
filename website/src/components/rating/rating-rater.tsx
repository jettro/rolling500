import * as React from "react";
import {connect} from "react-redux";
import {Button, Card, CardGroup, Image} from 'semantic-ui-react';
import {requestRandomAlbums} from "./rating.actions";
import {IHit, IHits} from "../search/search.model";
import {IMG_URL} from "../../api";
import RatingBox from "../rating/rating-box";

interface IRatingRaterProps {
    fetchRandomAlbums: any,
    randomAlbums: IHits,
}

interface IRatingRaterState {

}


class RatingRater extends React.Component<IRatingRaterProps, IRatingRaterState> {

    componentDidMount(): void {
        this.props.fetchRandomAlbums();
    }

    render() {
        return (

            <CardGroup>
                {this.props.randomAlbums.hits ? this.props.randomAlbums.hits.map((hit: IHit) => {
                    return (
                        <Card key={hit.id} >
                            <Image src={IMG_URL + hit.image}/>
                            <Card.Content>
                                <Card.Header>{hit.album}</Card.Header>
                                <Card.Meta>{hit.artist}({hit.year})</Card.Meta>
                                <Card.Description><RatingBox hit={hit}/></Card.Description>
                            </Card.Content>
                        </Card>
                    );
                }) : []
                }
                <Card key='actions' color='yellow'>
                    <Card.Content>
                        <Card.Header>Refresh</Card.Header>
                        <Card.Meta>Get new random items</Card.Meta>
                        <Card.Description>
                            <Button icon='refresh' content='Refresh' onClick={this.props.fetchRandomAlbums}/>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </CardGroup>
        );
    }
}

const mapStateToProps = (state: any) => ({
    randomAlbums: state.rating.albums,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchRandomAlbums: () => dispatch(requestRandomAlbums()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingRater);
