import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { Form, FormItem, SubmitButton, Input } from "formik-antd";
import * as Yup from "yup";
import { Create } from "../../common/actions";
//icons && logo

import Logo from "../../../assets/images/logo/logo.svg";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

const { TextArea } = Input;

const Footer = () => {
  const [loading, isLoading] = useState(false);
  const { t, i18n } = useTranslation("translations");

  const initialValues = { name: "", email: "", message: "" };

  const validationSchema = () =>
    Yup.object({
      name: Yup.string().max(60).required(),
      email: Yup.string().email().required(),
      message: Yup.string().required(),
    });

  const submitForm = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    isLoading(true);

    Create("contact", values, "admin", true).then((res) => {
      if (res.status) {
        resetForm({});
        isLoading(false);
      }
    });
  };
  return (
    <footer className="footer">
      <div className="container bottom_border">
        <div className="row">
          <div className="col-md-3 col-12 image_logo">
            <img src={Logo} alt="" />
            <h5 className="headin5_amrc col_white_amrc pt2">{t("JEEM")}</h5>
          </div>

          <div className="col-md-3 col-12 mx-auto" style={{ margin:"auto" }}>
            <iframe
              title="Getstamp"
              src="https://maroof.sa/Business/GetStamp?bid=188754"
              frameBorder="0"
              seamless="seamless"
              scrollable="no"
            ></iframe>
          </div>

          <div className="col-md-3 col-12 text-md-left text-left">
            <h5 className="headin5_amrc col_white_amrc pt2">{t("ABOUT_US")}</h5>
            <p className="mb10">
              {i18n.language === "ar"
                ? "جيم هي مؤسسة سعودية شابة بدأت في عام 2019 تسعى لعمل نقلة نوعية في مجال البناء من خلال رحلة سهلة وبسيطة للمشتري والبائع "
                : "Jeem is a young Saudi institution that started in 2019 seeking to make a qualitative leap in the field of construction through an easy and simple journey for the buyer and seller"}
            </p>
          </div>

          <div className="col-md-3 col-12 text-md-left text-left">
            <h5 className="headin5_amrc col_white_amrc pt2">
              {t("CONTACT_US")}
            </h5>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submitForm}
            >
              {(formik) => (
                <Form>
                  <div className="form-content">
                    <div className="form-group">
                      <FormItem
                        name="name"
                        hasFeedback={true}
                        showValidateSuccess={true}
                      >
                        <Input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder={t("NAME")}
                        />
                      </FormItem>
                    </div>

                    <div className="form-group">
                      <FormItem
                        name="email"
                        hasFeedback={true}
                        showValidateSuccess={true}
                      >
                        <Input
                          type="email"
                          name="email"
                          className="form-control"
                          id="email"
                          placeholder={t("EMAIL")}
                        />
                      </FormItem>
                    </div>

                    <div className="form-group textarea">
                      <FormItem
                        name="message"
                        hasFeedback={true}
                        showValidateSuccess={true}
                      >
                        <TextArea
                          name="message"
                          className="form-control"
                          id="message"
                          placeholder={t("MESSAGE")}
                        />
                      </FormItem>
                    </div>
                  </div>

                  <SubmitButton
                    className="btn text-center"
                    loading={loading}
                    disabled={false}
                  >
                    Send
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div className="container">
        <ul className="foote_bottom_ul_amrc">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy && Terms of Services</Link>
          </li>
        </ul>
        <p className="text-center">
          {t("COPYRIGHT")} @ {new Date().getFullYear()} | {t("JEEM")}
        </p>

        <ul className="social_footer_ul">
          <li>
            <a href="https://www.facebook.com/jeembuildingsolutions/">
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/Jeem_Group?s=08">
              <TwitterIcon />
            </a>
          </li>
          <li>
            <a href="http://webenlance.com">
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/invites/contact/?i=77q593qzjl24&utm_content=kjx594h">
              <InstagramIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
