import React, { useState, useEffect, Fragment } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import Tabs from "../../common/tabs";
import Table from "../../common/table";
import { useTranslation } from "react-i18next";
import { Fetch } from "../../common/actions";
import Spinner from "../../layouts/spinner/spinner";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Sales = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [inside, setInside] = useState([{ title: "Loading ..." }]);
  const [outside, setOutside] = useState([{ title: "Loading ..." }]);

  const { t } = useTranslation();

  const columnsInside = [
    {
      label: t("code"),
      name: "code",
    },
    {
      label: t("product.title"),
      name: "product.title",
    },
    {
      label: t("ADDRESS"),
      name: "address.address",
    },
    {
      label: t("CUSTOMER"),
      name: "buyer.name",
    },
    {
      label: t("product.price"),
      name: "price",
    },
    {
      label: t("product.discount"),
      name: "discount",
    },
    {
      label: t("product.count"),
      name: "counts",
    },
  ];

  const columnsOutside = [
    {
      label: t("code"),
      name: "id",
    },
    {
      label: t("product.title"),
      name: "title",
    },
    {
      label: t("ADDRESS"),
      name: "buyer.address",
    },
    {
      label: t("CUSTOMER"),
      name: "buyer.name",
    },
    {
      label: t("product.price"),
      name: "price",
    },
    {
      label: t("product.discount"),
      name: "discount",
    },
    {
      label: t("product.count"),
      name: "count",
    },
  ];
  const tabs = [t("SALES_IN"), t("SALES_OUT")];

  const handleChange = (value) => {
    setSelectedTab(value);
  };

  useEffect(() => {
    Fetch("manual_products").then((res) => {
      if (res.status) {
        setInside(res.data.inside);
        setOutside(res.data.outside);
        setLoading(true);
      } else {
        setInside([]);
        setOutside([]);
        setLoading(true);
      }
    });
  }, []);

  if (loading) {
    return (
      <Fragment>
        <div className="products-dropbox">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Tabs tabs={tabs} handleChange={handleChange} />
            </Grid>
            <Grid item xs={4}>
              <button className="btn print">{t("EXPORT")}</button>
            </Grid>
          </Grid>
          <TabPanel value={selectedTab} index={0}>
            <div className="products-table container">
              <Table
                dataTable={inside}
                table="order"
                Columns={columnsInside}
                options={{}}
              />
            </div>
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <div className="products-table container">
              <Table
                dataTable={outside}
                table="manual_product"
                Columns={columnsOutside}
                options={{}}
              />
            </div>
          </TabPanel>
        </div>
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};

export default Sales;
