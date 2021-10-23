import { Link } from "react-router-dom";

const CategoryItem = (props) => {
  return (
      <div className="category-item">
        <Link to={`/category/${props.id}`}>
          <img src={props.image} alt="" />
          <h1>{props.title}</h1>
        </Link>
    </div>
  );
};


export default CategoryItem;
