import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    // articles = [
    //     {
    //         "source": {
    //             "id": "bbc-sport",
    //             "name": "BBC Sport"
    //         },
    //         "author": "BBC Sport",
    //         "title": "Shane Warne memorial - watch & follow updates",
    //         "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
    //         "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
    //         "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
    //         "publishedAt": "2022-03-30T08:22:26.498888Z",
    //         "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //         "publishedAt": "2020-04-27T11:41:47Z",
    //         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //         "publishedAt": "2020-03-30T15:26:05Z",
    //         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
    // ];
    static defaultProps = {
        country: 'in',
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string

    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=6`;
        this.setState({ loading: true });
        this.props.setProgress(30);
        let data = await fetch(url);
        this.props.setProgress(60);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults});
        this.state.loading=false;
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Newsapp`;
        this.props.setProgress(100);

    }

    fetchMoreData = async () => {
        this.state.page = this.state.page + 1;
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=6`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        });

    }
    // handlePreclick = async () => {
    //     this.state.page = this.state.page - 1;
    //     // console.log(this.page);
    //     this.componentDidMount();
    // }
    // handleNextclick = async () => {
    //     this.state.page = this.state.page + 1;
    //     // console.log(this.page);
    //     this.componentDidMount();
    //     //  console.log(this.state.totalResults)
    // }


    render() {
        return (
            <>
                <div className="container my-5" >
                    <h1 className='py-3'>{this.capitalizeFirstLetter(this.props.category)} - Top Headlines</h1>
                    </div>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                        // inverse={true} //
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner/>}
                    // scrollableTarget="scrollableDiv"
                    >
                        <div className="container">
                            <div className="row">
                                {this.state.articles.map((Element) => {
                                    return <div className="col-md-4" key={Element.url}>
                                        <NewsItem title={Element.title} descrip={Element.description ? Element.description.slice(0, 88) : ""} imageurl={Element.urlToImage} newsurl={Element.url} author={Element.author} publishedAt={Element.publishedAt} />
                                    </div>
                                })}
                            </div>
                        </div>

                        {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePreclick}>&larr; Previous</button>
                        <button disabled={Math.ceil(this.state.totalResults / 6) < this.state.page + 1} type="button" className="btn btn-primary" onClick={this.handleNextclick}>Next &rarr;</button>
                    </div> */}
                    </InfiniteScroll>
                

            </>
        )
    }
}

export default News
