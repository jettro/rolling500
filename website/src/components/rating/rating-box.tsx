import * as React from 'react';
import {connect} from 'react-redux';
import {Container, Rating, Divider} from 'semantic-ui-react';
import {IHit} from "../search/search.model";
import {executeStoreRating} from "./rating.actions";

interface IRatingBoxProps {
    storeRating: any,
    hit: IHit,
    ratings: Array<number>,
}

interface IRatingBoxState {
}

class RatingBox extends React.Component<IRatingBoxProps, IRatingBoxState> {

    giveRating = (event:any,rating: any) => {
        this.props.storeRating(this.props.hit, rating.rating);
    };

    whatRating = ():number => {
        return this.props.ratings[this.props.hit.sequence];
    };

    render() {
        return (
            <Container>
                <Divider horizontal>Your Rating</Divider>
                <p>Please give us your rating for this album. Does not have to do anything with what you searched for.</p>
                <Rating icon='star' rating={this.whatRating()} maxRating={5} onRate={this.giveRating}/>
            </Container>
        );
    };
}

const mapStateToProps = (state: any) => ({
    ratings: state.rating.ratings,
});

const mapDispatchToProps = (dispatch: Function) => ({
    storeRating: (hit: IHit, rating: number) => dispatch(executeStoreRating(hit, rating)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingBox);
