import React from "react";
import { Rate } from "antd";

const Review = (props) => {
  return (
    <div className="col-lg-12 col-md-6 col-12">
      <div className="review-item-container">
        <div className="info">
          <div className="info-header">
            <h3>{props.name}</h3>
            <div className="stars">
              <Rate disabled defaultValue={props.rating} />
            </div>
          </div>
          <div className="content">{props.content}</div>
        </div>
        <div className="img-container">
          <div>
            <img src={props.image} alt="Review" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
