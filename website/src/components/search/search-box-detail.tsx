import * as React from "react";
import {IHit} from "./search.model";
import {Item, List} from 'semantic-ui-react';
import {IMG_URL} from "../../api";

interface ISearchBoxDetailProps {
    hit: IHit
}

export const SearchBoxDetail: React.StatelessComponent<ISearchBoxDetailProps> = ({hit}) => {

    return (
        <Item>
            <Item.Image src={IMG_URL + hit.image}
                        size='tiny'/>
            <Item.Content>
                <Item.Header>{hit.album}</Item.Header>
                <Item.Meta>{hit.artist}</Item.Meta>
                <Item.Description>
                    <div dangerouslySetInnerHTML={{__html: hit.information}}/>
                </Item.Description>
            </Item.Content>
        </Item>
    );
};