import Table from "../../common/table";
import { useTranslation } from "react-i18next";
import { Button, Tooltip } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../../layouts/spinner/spinner";
import { Fetch } from "../../common/actions";
import { ViewMeeting, EditMeeting } from "./modals";

//Icons

import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";

const Products = () => {
  const [data, setData] = useState([{ title: "Loading ..." }]);
  const [loading, setLoading] = useState(false);
  const [visibleMeeting, setMeetingVisible] = useState([]);
  const [visibleEditMeeting, setEditMeetingVisible] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    Fetch("meeting").then((res) => {
      if (res.status) {
        setData(res.data);
        setLoading(true);
      }else{
        setData([]);
        setLoading(true);
      }
    });
  }, []);

  const enterMeetingVisible = (index, zoomId) => {

    for (let x in visibleMeeting) {

      visibleMeeting[x] = false;

    }

    setMeetingVisible(() => {
      const newLoadings = [...visibleMeeting];

      newLoadings[index] = true;

      return newLoadings;
    });

  };

  const handlingMeetingProps = (index) => {
    setMeetingVisible(() => {
      const newLoadings = [...visibleMeeting];

      newLoadings[index] = false;

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

  const enterEditMeetingVisible = (index,zoomId) => {
    for (let x in visibleEditMeeting) {
      visibleEditMeeting[x] = false;
    }

    setEditMeetingVisible(() => {
      const newLoadings = [...visibleEditMeeting];

      newLoadings[index] = true;

      return newLoadings;
    });

  };

  const handlingEditMeetingProps = (index) => {
    setEditMeetingVisible(() => {
      const newLoadings = [...visibleEditMeeting];

      newLoadings[index] = false;

      return newLoadings;
    });
  };

  const handleEditMeetingCancel = (index) => {
    setEditMeetingVisible(() => {
      const newLoadings = [...visibleEditMeeting];

      newLoadings[index] = false;

      return newLoadings;
    });
  };

  const columns = [
    {
      label: t("id"),
      name: "zoom_id",
    },
    {
      label: t("zoom.topic"),
      name: "topic",
    },
    {
      label: t("zoom.duration"),
      name: "duration",
    },
    {
      label: t("product.status"),
      name: "status",
    },
    {
      label: t("zoom.start"),
      name: "start_time",
    },
    {
      label: t("CUSTOMER"),
      name: "buyer_name",
    },
    {
      label: t("ADMIN"),
      name: "admin_name",
    },
    {
      label: t("PRODUCT"),
      name: "product_name",
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
              <Tooltip title="View" placement="bottom">
                <Button
                  onClick={() =>
                    enterMeetingVisible(rowIndex.rowIndex, dataIndex)
                  }
                >
                  <VisibilityIcon />
                </Button>
                <ViewMeeting
                  visible={visibleMeeting[rowIndex.rowIndex]}
                  onCancel={() => handleMeetingCancel(rowIndex.rowIndex)}
                  title="View Meeting"
                  data={rowIndex}
                  handlingProps={() => handlingMeetingProps(rowIndex.rowIndex)}
                />
              </Tooltip>

              <Tooltip title="Edit" placement="bottom">
                <Button
                  onClick={() =>
                    enterEditMeetingVisible(rowIndex.rowIndex, dataIndex)
                  }
                >
                  <EditIcon />
                </Button>
                <EditMeeting
                  visible={visibleEditMeeting[rowIndex.rowIndex]}
                  onCancel={() => handleEditMeetingCancel(rowIndex.rowIndex)}
                  title="Edit Meeting"
                  data={rowIndex.rowData}
                  dataIndex={dataIndex}
                  handlingProps={() =>
                    handlingEditMeetingProps(rowIndex.rowIndex)
                  }
                />
              </Tooltip>
            </Fragment>
          );
        },
      },
    },
  ];

  if (loading) {
    return (
      <Fragment>
        <div className="products-dropbox">
          <div className="products-table">
            <Table dataTable={data} table="meeting" Columns={columns} />
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};

export default Products;
