import React, { Component } from 'react';

export class NewsItem extends Component {
    render() {
        // Destructuring props to get title, description, imageUrl, and newsUrl
        let { title, description, imageUrl, newsUrl } = this.props;

        return (
            <div className="my-3">
                <div className="card" style={{ width: "18rem" }}>
                    {/* Default image if imageUrl is not provided */}
                    <img 
                        src={imageUrl ? imageUrl : "https://regmedia.co.uk/2023/07/14/india_shutterstock.jpg"} 
                        className="card-img-top" 
                        alt="News" 
                    />

                    <div className="card-body">
                        {/* Ensure there's no additional ellipsis if text is already sliced */}
                        <h5 className="card-title">
                            {title ? title + '...' : ''}
                        </h5>

                        <p className="card-text">
                            {description ? description + '...' : ''}
                        </p>

                        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
