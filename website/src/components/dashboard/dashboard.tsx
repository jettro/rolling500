import * as React from "react";
import {Container, Divider, Header, List, Responsive, Segment} from 'semantic-ui-react';

export class Dashboard extends React.Component {

    render() {

        return (
            <Container text>
                <Header as='h2'>Welcome</Header>
                <p>Welcome to the Rolling 500. All data in this application is obtained from the <a
                    href='https://www.rollingstone.com/music/lists/500-greatest-albums-of-all-time-20120531'>Rolling
                    Stone Top 500</a>. The goal for this application is to show how we can improve the ordering of
                    results based on machine learning, this is called Learning to Rank. The second goal is to give you
                    some recommendations based on ratings you provide.</p>
                <Header as='h3'>What can you do?</Header>
                <p>If you are interested in search you can use the <a href="/search">search tab</a>. Enter some text and
                    see the albums that match. The text in the information as well as the artist and album title are
                    searched. If you want to try out our learned model, which does perform better in some situations, go
                    to the <a href="/compare">Search compare tab</a> or flip the <em>Enable Learning To
                        Tank</em> switch.</p>
                <p>If you want to find new music based on what you like and what others like, first rate some albums and
                    than go to the <a href="/recommendation">Recommendation tab</a>. Rating albums can be done in two
                    ways. Go to the <a href="/rate">Rate items tab</a> and enter about 10 to 20 ratings, if you do not
                    know the albums don't rate them. Use the refresh button at the bottom to get 10 new random items. If
                    you know the albums you would like to rate, go to the <a href="/search">Search tab</a>, click on a
                    found album to show the details and give the album a rating there.</p>
                <p>Only if we found someone that has given similar ratings like you did, we can give you
                    recommendations. SO we need enough people that have given ratings to give you a recommendation.</p>
                <Header as='h3'>More information</Header>
                <p>At the Luminis Devcon 2018, we have given a talk about this subject. There is a Youtube movie
                    available of this talk.</p>
                <Responsive as={Container} minWidth={Responsive.onlyMobile.maxWidth}>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/TG7aNLgzIcM?rel=0"
                            frameBorder="0"
                            allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </Responsive>
                <Responsive as={Container} {...Responsive.onlyMobile}>
                    <iframe width="280" height="167" src="https://www.youtube.com/embed/TG7aNLgzIcM?rel=0"
                            frameBorder="0"
                            allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </Responsive>

            </Container>
        );
    }
}
