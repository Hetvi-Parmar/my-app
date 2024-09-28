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
    };
  }

  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/everything?q=india&apiKey=5116c61ccb25444395b0fd2d7f3b1ff7&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handlePrevclick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/everything?q=india&apiKey=5116c61ccb25444395b0fd2d7f3b1ff7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  handleNextclick = async () => {
    console.log("Next");
    if (!(this.state.page + 1 >Math.ceil(this.state.totalResults / this.props.pageSize))) {
    let url = `https://newsapi.org/v2/everything?q=india&apiKey=5116c61ccb25444395b0fd2d7f3b1ff7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News 18 - Top Headlines</h1>
  
        
        {this.state.loading && <Spinner />}
  
        
        <div className="row">
          {!this.state.loading && this.state.articles && this.state.articles.map((element) => {
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
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} 
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