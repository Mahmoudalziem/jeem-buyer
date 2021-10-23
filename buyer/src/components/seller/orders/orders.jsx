import Table from "../../common/table";
import { useTranslation } from "react-i18next";
import { Select, Button, Tooltip } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../../layouts/spinner/spinner";
import { updateDelivery, fetchDelivery } from "./actions";
import { Fetch } from "../../common/actions";

/// Icons

import VideocamIcon from '@material-ui/icons/Videocam';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';

import { SendMessage, CreateMeeting } from './modals'

const { Option } = Select;

const Products = () => {
  const [data, setData] = useState([{ title: "Loading ..." }]);
  const [loading, setLoading] = useState(false);
  const [delivery, setDelivery] = useState([]);
  const [visibleMessage, setMessageVisible] = useState([]);
  const [visibleMeeting, setMeetingVisible] = useState([]);


  const { t,i18n } = useTranslation();

  useEffect(() => {
    
    fetchDelivery().then((res) => {
      if (res.status) {
        setDelivery(res.data);
      }
    });

    Fetch("order").then((res) => {
      if (res.status) {
        setData(res.data);
        setLoading(true);
      }else{
        setData([]);
        setLoading(true);
      }
    });
  }, []);

  const handlingMessageProps = (index) => { 

    setMessageVisible(() => {

      const newLoadings = [...visibleMessage];

      newLoadings[index] = false;

      return newLoadings;

    });
  }

  const handlingMeetingProps = (index) => {

    setMeetingVisible(() => {

      const newLoadings = [...visibleMeeting];

      newLoadings[index] = false;

      return newLoadings;

    });
  }

  const enterMessageVisible = (index) => {               

    for (let x in visibleMessage) {

      visibleMessage[x] = false;
      
    }

    setMessageVisible(() => {

      const newLoadings = [...visibleMessage];

      newLoadings[index] = true;

      return newLoadings;

    });
  };

  const handleMessageCancel = (index) => {

    setMessageVisible(() => {

      const newLoadings = [...visibleMessage];

      newLoadings[index] = false;

      return newLoadings;

    });
  };

  const enterMeetingVisible = (index) => {               

    for (let x in visibleMeeting) {

      visibleMeeting[x] = false;
      
    }

    setMeetingVisible(() => {

      const newLoadings = [...visibleMeeting];

      newLoadings[index] = true;

      return newLoadings;

    });
  };

  const handleMeetingCancel = (index) => {

    setMeetingVisible(() => {

      const newLoadings = [...visibleMeeting];

      newLoadings[index] = false;

      return newLoadings;

    });
  };

  const columns = [
    {
      label: t('code'),
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
      label: t("product.delivery"),
      name: "delivery.id",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex) => {
          return (
            <Fragment>
              <Select
                defaultValue={dataIndex}
                onChange={(event) =>
                  updateDelivery(
                    rowIndex.tableData[rowIndex.rowIndex].id,
                    event
                  )
                }
                disabled={(dataIndex === 1 || dataIndex === 5) ? 'disabled': ''}
              >
                {delivery.map((index, key) => {
                  return (
                    <Option key={key} value={index.id}>
                      {i18n.language === 'en' ? index.name_en : index.name_ar}
                    </Option>
                  );
                })}
              </Select>
            </Fragment>
          );
        },
      },
    },
    {
      label: t("Actions"),
      name: "id",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex) => {
          return (
            <Fragment>
              <Tooltip title={t('MESSAGE_SEND')} placement="bottom">
                <Button onClick={() => enterMessageVisible((rowIndex.rowIndex))}>
                  <PermPhoneMsgIcon />
                </Button>
                <SendMessage visible={visibleMessage[(rowIndex.rowIndex)]} onCancel={() => handleMessageCancel((rowIndex.rowIndex))} title={t('MESSAGE_SEND')} dataIndex={dataIndex} handlingProps={() => handlingMessageProps(rowIndex.rowIndex)}/>
              </Tooltip>

              <Tooltip title={t('MEETING_CREATE')} placement="bottom">
                <Button onClick={() => enterMeetingVisible(rowIndex.rowIndex)}>
                  <VideocamIcon />
                </Button>
                <CreateMeeting visible={visibleMeeting[(rowIndex.rowIndex)]} onCancel={() => handleMeetingCancel(( rowIndex.rowIndex))} title={t('MEETING_CREATE')} dataIndex={dataIndex} handlingProps={() => handlingMeetingProps(rowIndex.rowIndex)}/> 
              </Tooltip>

              {/* <Tooltip title="Let's Chat" placement="bottom">
                <Button >
                  <ForumIcon />
                </Button>
              </Tooltip> */}

            </Fragment>
          );
        },
      },
    },
  ];

  const options = {};

  if (loading) {
    return (
      <Fragment>
        <div className="products-dropbox">
          <div className="products-table container">
            <Table
              dataTable={data}
              table="order"
              Columns={columns}
              options={options}
            />

          <div className="Modals-container">
            {/* <LetChat visible={visible[2]} confirmLoading={modelLoading[2]} onCancel={() => handleCancel(2)} title="Lets Chat" /> */}
          </div>

          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};

export default Products;
