import * as React from "react";
import {Image, List} from 'semantic-ui-react';
import {IHit} from "./search.model";
import {IMG_URL} from "../../api";

interface ISearchResultsListProps {
    hits: Array<IHit>,
    selectItem?: any
}

export const SearchResultsList: React.StatelessComponent<ISearchResultsListProps> = ({hits, selectItem}) => {

    const handleItemClick = (hit: IHit) => {
        if (selectItem) {
            selectItem(hit);
        } else {
            console.log("Clicked, but nothing to do");
        }
    };

    return (
        <List divided relaxed>
            {hits ? hits.map((hit: IHit) => {
                    return (
                        <List.Item key={hit.id} onClick={() => handleItemClick(hit)}>
                            <Image src={IMG_URL + hit.image} avatar/>
                            <List.Content>
                                <List.Header>{hit.album}</List.Header>
                                < List.Description>{hit.artist}</List.Description>
                            </List.Content>
                        </List.Item>
                    );
                })
                : []
            }
        </List>
    );
};