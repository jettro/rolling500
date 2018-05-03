import * as React from "react";
import {IHit} from "./search.model";
import {Item, List} from 'semantic-ui-react';
import {IMG_URL} from "../../api";
import RatingBox from "../rating/rating-box";
import Prediction from "../recommendation/prediction";

interface ISearchBoxDetailProps {
    hit: IHit
}

export const SearchBoxDetail: React.StatelessComponent<ISearchBoxDetailProps> = ({hit}) => {

    return (
        <Item>
            <Item.Image src={IMG_URL + hit.image} size='tiny'/>
            <Item.Content>
                <Item.Header>{hit.album}</Item.Header>
                <Item.Meta>{hit.artist}</Item.Meta>
                <Item.Description>
                    <div dangerouslySetInnerHTML={{__html: hit.information}}/>
                    <RatingBox hit={hit}/>
                </Item.Description>
                <Item.Description>
                    <Prediction selectedAlbum={hit}/>
                </Item.Description>
            </Item.Content>
        </Item>
    );
};