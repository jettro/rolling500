import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {toggleSideNav} from './header.actions';
import {Container, Image, Menu, Responsive} from 'semantic-ui-react';
import {MenuItems} from "./menu-items";

interface IHeader {
    toggleSideNav: any;
}

export class PageHeader extends React.Component<IHeader, {}> {

    render() {
        const {toggleSideNav} = this.props;

        return (
            <div>
                <Responsive as={Menu} minWidth={Responsive.onlyMobile.maxWidth} fixed="top" color="blue" inverted>
                    <MenuItems/>
                </Responsive>
                <Responsive as={Menu} maxWidth={Responsive.onlyMobile.maxWidth} color="blue" inverted stackable>
                    <MenuItems/>
                </Responsive>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
    toggleSideNav: () => dispatch(toggleSideNav()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
