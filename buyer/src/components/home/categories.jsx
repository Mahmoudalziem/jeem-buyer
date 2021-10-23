import { useTranslation } from "react-i18next";
import CategoryItem from "../common/categoryItem";

const Categories = (props) => {
  const { t, i18n } = useTranslation("translations");

  return (
    <div className="category">
      <div className="section_header">
        <span>{t("CATEGORIES")}</span>
      </div>
      <div className="container">
        <div className="row mx-auto">
          {props.data.map((item, key) => (
            <div className="col-md-4 col-12" key={key}>
              <CategoryItem
                image={item.image}
                title={i18n.language === "en" ? item.name_en : item.name_ar}
                id={item.name_en.replace(/\s/g, "-").toLowerCase()}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
