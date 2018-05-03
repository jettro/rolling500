import * as React from "react";
import {connect} from "react-redux";
import {Container, Divider, Rating} from 'semantic-ui-react';
import {IHit} from "../search/search.model";
import {requestPrediction} from "./recommendation-actions";

interface IPredictionProps {
    fetchPrediction: any,
    prediction: number,
    selectedAlbum: IHit,
}

interface IPredictionState {
}

class Prediction extends React.Component<IPredictionProps, IPredictionState> {

    componentDidMount(): void {
        this.props.fetchPrediction(this.props.selectedAlbum);
    }

    componentDidUpdate(prevProps: Readonly<IPredictionProps>, prevState: Readonly<IPredictionState>, snapshot?: any): void {
        this.props.fetchPrediction(this.props.selectedAlbum);
    }

    render() {
        return (
            <Container>
                <Divider horizontal>Our Prediction</Divider>
                <p>Using yours and others ratings we think you would rate this album as:</p>
                <Rating icon='star' rating={this.props.prediction} maxRating={5} disabled/>
            </Container>
        );
    }
}

const mapStateToProps = (state: any) => ({
    prediction: state.recommendation.prediction,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchPrediction: (selectedAlbum: IHit) => dispatch(requestPrediction(selectedAlbum)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);
