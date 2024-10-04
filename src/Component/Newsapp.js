import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class Newsapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    console.log("Component Did Mount");
    let url = `https://newsdata.io/api/1/news?apikey=pub_552175eefe9147c425b85ff2fb90b1e9ce645&q=all%20news%20india&country=in&language=en,gu,hi&category=other &pageSize=9`;
    this.setState({ loading: true });

    try {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Upgrade-Insecure-Requests": "1", 
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      let parsedData = await response.json();
      console.log(parsedData);

      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch news:", error);
      this.setState({ loading: false });
    }
  }

  handlePrevclick = async () => {
    console.log("Previous");
    let url = `https://newsdata.io/api/1/news?apikey=pub_552175eefe9147c425b85ff2fb90b1e9ce645&q=all%20news%20india&country=in&language=en,gu,hi&category=other &page=${this.state.page - 1}&pageSize=9`;
    this.setState({ loading: true });

    try {
      let data = await fetch(url);

      let parsedData = await data.json();
      console.log(parsedData);

      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch news:", error);
      this.setState({ loading: false });
    }
  };

  handleNextclick = async () => {
    console.log("Next");
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 9)) {
      let url = `https://newsdata.io/api/1/news?apikey=pub_552175eefe9147c425b85ff2fb90b1e9ce645&q=all%20news%20india&country=in&language=en,gu,hi&category=other &page=${this.state.page + 1}&pageSize=9`;
      this.setState({ loading: true });

      try {
        let data = await fetch(url);

        let parsedData = await data.json();
        console.log(parsedData);

        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false,
        });
      } catch (error) {
        console.error("Failed to fetch news:", error);
        this.setState({ loading: false });
      }
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News 18 - Top Headlines</h1>

        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&
            this.state.articles &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>

        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevclick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 9)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextclick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default Newsapp;
