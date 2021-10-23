import Table from "../../common/table";
import Columns from "../../common/columnTable";
import { useTranslation } from "react-i18next";
import React, { Fragment, useEffect, useState } from "react";
import {Fetch} from '../../common/actions'

const Products = () => {


  const [data, setData] = useState([{ id: "Loading ..." }]);

  const { t } = useTranslation();

  useEffect(() => {
    Fetch("post").then((res) => {
      if (res.status) {
        setData(res.data);
      }else{
        setData([]);
      }
    });
  }, []);

  const columns = [
    {
      label: t('id'),
      name: "id",
    },
    {
      label: t("post.content"),
      name: "content",
    },
    {
      label: t("post.comment"),
      name: "commentCount",
    },
    {
      label: t("post.like"),
      name: "likeCount",
    },
  ];


  return (
    <Fragment>
      <div className="products-dropbox">
        <div className="products-table">
          <Table
            dataTable={data}
            table="post"
            Columns={Columns("post", columns)}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Products;
