import * as React from "react";
import {Image, List} from 'semantic-ui-react';
import {IHit} from "./search.model";
import {IMG_URL} from "../../api";

interface ISearchResultsListProps {
    hits: Array<IHit>,
    selectItem?: any
}

export const SearchResultsList: React.StatelessComponent<ISearchResultsListProps> = ({hits, selectItem}) => {

    const handleItemClick = (hit: IHit, position: number) => {
        if (selectItem) {
            selectItem(hit, position + 1); // prevent the zero based list, I want first item to be 1
        }
    };

    return (
        <List divided relaxed>
            {hits ? hits.map((hit: IHit, index: number) => {
                    return (
                        <List.Item key={hit.id} onClick={() => handleItemClick(hit, index)}>
                            <Image src={IMG_URL + 'thumbnails/' + hit.image} avatar/>
                            <List.Content>
                                <List.Header>{hit.album}</List.Header>
                                <List.Description>{hit.artist}</List.Description>
                            </List.Content>
                        </List.Item>
                    );
                })
                : []
            }
        </List>
    );
};