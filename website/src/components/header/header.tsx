import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleSideNav } from './header.actions';
import { Container, Menu } from 'semantic-ui-react';

interface IHeader {
    toggleSideNav: any;
}

export class PageHeader extends React.Component<IHeader, {}> {

    render() {
        const { toggleSideNav } = this.props;

        return (
            <Menu fixed="top" color="blue" inverted>
                <Container>
                    <Menu.Item as={Link} header name="home" to="/">
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
            </Menu>
        );
    }
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleSideNav: () => dispatch(toggleSideNav()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
