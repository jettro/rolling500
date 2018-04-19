import * as React from "react";
import {Container, Menu, Divider, Header, Image, List, Responsive, Segment} from 'semantic-ui-react';
import {Link} from "react-router-dom";

export class MenuItems extends React.Component {

    render() {

        return (
            <Container>
                <Menu.Item as={Link} header name="dashboard" to="/">
                    <Image src='https://rolling500.luminis.amsterdam/logo.png' size='tiny'/>
                </Menu.Item>
                <Menu.Item as={Link} header name="search" to="/search">
                    Search
                </Menu.Item>
                <Menu.Item as={Link} header name="searchcompare" to="/compare">
                    Search compare
                </Menu.Item>
                <Menu.Item as={Link} header name="rate" to="/rate">
                    Rate items
                </Menu.Item>
                <Menu.Item as={Link} header name="recommendation" to="/recommendation">
                    Recommendations
                </Menu.Item>
            </Container>
        );
    }
}
