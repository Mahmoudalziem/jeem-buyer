import React, { useState, useEffect, Fragment } from "react";
import { Typography, Box, Grid } from "@material-ui/core";
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
  const [data, setData] = useState([{ title: "Loading ..." }]);

  const { t } = useTranslation();

  const columns = [
    {
      label: t("code"),
      name: "code",
    },
    {
      label: t("product.title"),
      name: "product.title",
    },
    {
      label: t("product.status"),
      name: "status",
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
    {
      label: t("Actions"),
      name: "id",
      options: {
        filter: false,
        empty: true,
        // customBodyRender: (dataIndex, rowIndex) => {
        //   return (
        //     <Fragment>
        //       <Tooltip title={t('MESSAGE_SEND')} placement="bottom">
        //         <Button onClick={() => enterMessageVisible((rowIndex.rowIndex))}>
        //           <PermPhoneMsgIcon />
        //         </Button>
        //         <SendMessage visible={visibleMessage[(rowIndex.rowIndex)]} onCancel={() => handleMessageCancel((rowIndex.rowIndex))} title={t('MESSAGE_SEND')} dataIndex={dataIndex} handlingProps={() => handlingMessageProps(rowIndex.rowIndex)}/>
        //       </Tooltip>

        //       <Tooltip title={t('MEETING_CREATE')} placement="bottom">
        //         <Button onClick={() => enterMeetingVisible(rowIndex.rowIndex)}>
        //           <VideocamIcon />
        //         </Button>
        //         <CreateMeeting visible={visibleMeeting[(rowIndex.rowIndex)]} onCancel={() => handleMeetingCancel(( rowIndex.rowIndex))} title={t('MEETING_CREATE')} dataIndex={dataIndex} handlingProps={() => handlingMeetingProps(rowIndex.rowIndex)}/>
        //       </Tooltip>

        //       {/* <Tooltip title="Let's Chat" placement="bottom">
        //         <Button >
        //           <ForumIcon />
        //         </Button>
        //       </Tooltip> */}

        //     </Fragment>
        //   );
        // },
      },
    },
  ];

  const tabs = [t("SALES_IN"), t("SALES_OUT")];

  const handleChange = (value) => {
    setSelectedTab(value);
  };

  useEffect(() => {
    Fetch("order").then((res) => {
      if (res.status) {
        setData(res.data);
        setLoading(true);
      } else {
        setData([]);
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
                dataTable={data}
                table="order"
                Columns={columns}
                options={{}}
              />
            </div>
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <div className="products-table container">
              <Table
                dataTable={data}
                table="order"
                Columns={columns}
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
