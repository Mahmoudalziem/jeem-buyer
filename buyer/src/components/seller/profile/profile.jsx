import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link,useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import Spinner from "../../layouts/spinner/spinner";
import { Rate } from "antd";
import Product from "../../products/product";
import { Fetch, Create } from "../../common/actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form as FormFormik, SubmitButton, Input, FormItem } from "formik-antd";
import { Button } from "antd";

//images
import avatar from "../../../assets/images/logo/avatar.svg";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Profile = (props) => {
  const [loading, setLoading] = useState(false);
  const [active,setActive] = useState(false)
  const [data, setData] = useState([]);
  const [loadingComment,setLoadingComment] = useState(false);
  const [comments,setComments] = useState([]);
  const [postId,setPostId] = useState();
  const [posts,setPosts] = useState([]);

  const { t } = useTranslation();

  const params = useParams();

  const { status, role } = useSelector((s) => s.authorization);

  const {name,image} = useSelector(s => s.buyer);

  const likePost = (index) => {

    Create(`post/like/${index}`, null, "buyer", true).then((res) => {
      
      if (res.status) {

        let newData = [...data.posts];

        let post = data.posts.find(({id}) => (id === index));

        newData.splice(post,1);

          if(post.like){

            post.like = false;

            post.likeCount = post.likeCount > 0 ? post.likeCount - 1 : 0;

          }else{

            post.like = true;

            post.likeCount += 1;

          }

        newData.push(post);

        setPosts(newData);

      }
    });
  };

  const commentPost = (index) => {
    setLoadingComment(true);
    setPostId(index);
    Fetch(`post/comments/${index}`, "buyer").then((res) => {
      if (res.status) {
        setLoadingComment(false);
        setComments(res.data);
        setActive(true)
      }
    });
  }

  useEffect(() => {
    Fetch(`seller/${params.name}`, "buyer").then((res) => {
      if (res.status) {
        setData(res.data);
        setPosts(res.data.posts);
        setLoading(true);
      }
    });
  }, []);

  const initialValues = { comment: "" };

  const validateSchema = () =>
    Yup.object({
      comment: Yup.string().min(5).required(t("COMMENT_REQUIRED")),
    });

  const submitForm = (values, { setSubmitting,resetForm }) => {
    
    setSubmitting(false);

    Create(`post/comment/${postId}`, values,'buyer', true).then(
      (res) => {
        if (res.status) {
          let newComment = [...comments];
          resetForm({});
          newComment.push({
            comment : values.comment,
            image : image,
            buyer : {name : name}
          });
          setComments(newComment);
        }
      }
    );
  };

  if (loading) {
    return (
      <div className="category">
        <div className="category-header">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">{t("HOME")}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{t("SELLER")}</Breadcrumb.Item>
            <Breadcrumb.Item>{params.name.replace("-", " ")}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="seller-container">
          <div className="row">
            <div className="col-md-4 col-12">
              <div className="profile-header">
                <div className="profile-picture">
                  <img src={avatar} alt="" />
                </div>
                <div className="profile-name">
                  <h1>{data.name}</h1>
                  <p>{data.email}</p>
                  <div className="stars">
                    <Rate disabled defaultValue={2} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5 col-12">
              <div className="seller-desc">
                <h4>{t("SELLER_DESCREPTION")}</h4>
                <p>{data.descri}</p>
              </div>
            </div>

            <div className="col-md-3 col-12">
              <div className="shipping-to">
                <h4>{t("SHIPPING_TO")}</h4>
                <ul>
                  <li>- {data.city}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="products">
                <h2>{t("PRODUCTS")}</h2>
                <div className="products-container">
                  <div className="row">
                    {data.products.map((item, key) => (
                      <div className="col-md-6 col-12" key={key}>
                        <Product
                          price={item.price}
                          name={item.seller.name}
                          title={item.title}
                          rate={item.rate}
                          id={item.id}
                          cart={item.cart}
                          image={item.images[0]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="posts">
                <h2>{t("POSTS")}</h2>
                <div className="post-container">
                  {posts.map((item, index) => (
                    <div className="post" key={index}>
                      <div className="post-header">
                        <img src="" alt="" />
                        <h4>{data.name}</h4>
                      </div>
                      <div className="post-body">{item.content}</div>
                      {status && role === "buyer" ? (
                        <div className="post-footer">
                          <Button className={item.like ? 'btn completed' : 'btn'} onClick={() => likePost(item.id)}>
                            ({item.likeCount})
                            <FavoriteIcon />
                            <span>{t("LIKE")}</span>
                          </Button>
                          <Button className="btn" loading={loadingComment} onClick={() => commentPost(item.id)}>
                            ({item.commentCount})
                            <CommentIcon />
                            <span>{t("COMMENT")}</span>
                          </Button>
                        </div>
                      ) : (
                        <div className="post-footer">
                          <button className="btn">
                            ({item.likeCount})
                            <FavoriteIcon />
                            <span>{t("LIKE")}</span>
                          </button>
                          <button className="btn">
                            ({item.commentCount})
                            <CommentIcon />
                            <span>{t("COMMENT")}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className={`post-comments-content ${active ? 'active' : ''}`}>
                    <div className="comment-content-header">
                      <ArrowBackIosIcon onClick={() => setActive(false)}/>
                    </div>
                    <div className="comment-body">
                      {comments.map((item, key) => (
                        <div className="comment-content-body" key={key}>
                          <div className="row mx-auto">
                            <div className="col-md-2 col-12">
                              <div className="comment-image">
                                <img src={item.image} alt=""></img>
                              </div>
                            </div>
                            <div className="col-md-9 col-12">
                              <div className="comment">
                                {item.comment}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="comment-create">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validateSchema}
                        onSubmit={submitForm}
                        render={() => (
                          <FormFormik>
                            <div className="group-input">
                              <FormItem
                                name="comment"
                                hasFeedback={true}
                                showValidateSuccess={true}
                              >
                                <Input
                                  name="comment"
                                  placeholder={t("COMMENT_WRITE")}
                                />
                                <SubmitButton
                                  name="push"
                                  className="btn"
                                  // loading={active}
                                  icon={<ArrowBackIcon />}
                                  disabled={false}
                                />
                              </FormItem>
                            </div>
                          </FormFormik>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner width="100%" height="100vh" />;
  }
};

export default Profile;
