import Table from "../../common/table";
import Columns from "../../common/columnTable";
import { useTranslation } from "react-i18next";
import React, { Fragment, useEffect, useState } from "react";
import {Fetch} from '../../common/actions'


const Products = () => {
  // const [active, setActive] = useState(false);
  const [data, setData] = useState([{ id: "Loading ..." }]);


  const { t } = useTranslation();

  const columns = [
    {
      label: t('id'),
      name: "id",
    },
    {
      label: t("subseller.name"),
      name: "name",
    },
    {
      label: t("subseller.email"),
      name: "email",
    },
  ];

  useEffect(() => {
    Fetch('subseller')
    .then(res => {
      if(res.status){
        setData(res.data)
      }else{
        setData([])
      }
    })
  }, []);

  return (
    <Fragment>
      <div className="products-dropbox">
        <div className="products-table">
          <Table
            dataTable={data}
            table="subseller"
            Columns={Columns("subseller", columns, true)}
            options={{  }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Products;