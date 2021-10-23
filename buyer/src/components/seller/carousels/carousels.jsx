import Table from "../../common/table";
import Columns from "../../common/columnTable";
import { useTranslation } from "react-i18next";
import { Tooltip, Popconfirm, Button } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import {Fetch,UpdateStatus} from '../../common/actions'

import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const Products = () => {
  const [visible, setVisible] = useState([]);
  const [loadings, setLoading] = useState([]);
  const [data, setData] = useState([{ title: "Loading ..." }]);


  const { t } = useTranslation();

  useEffect(() => {
    Fetch('carousel')
    .then(res => {
      if(res.status){
        setData(res.data)
      }else{
        setData([])
      }
    })
  }, []);

  const columns = [
    {
      label: t('id'),
      name: "id",
    },
    {
      label: t("product.title"),
      name: "title",
    },
    {
      label: t("product.status"),
      name: "carousel_status",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex,updateIndex) => {
          return (
            <Fragment>
              <Tooltip title="Carousel Status" placement="bottom">
                <Popconfirm
                  title={t(`product.status`)}
                  placement="topLeft"
                  visible={visible[rowIndex.rowIndex]}
                  onConfirm={() => Action(dataIndex,rowIndex, updateIndex)}
                  okButtonProps={{ loading: loadings[rowIndex.rowIndex] }}
                  onCancel={() => handleCancel(rowIndex.rowIndex)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button onClick={() => enterVisible(rowIndex.rowIndex)}>
                  {dataIndex ? <LockOpenIcon /> : <LockIcon /> }
                  </Button>
                </Popconfirm>
              </Tooltip>
            </Fragment>
          );
        },
      },
    },
    {
      label: t("product.admin.status"),
      name: "admin_status",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex) => {
          return (
            <Fragment>
              <Tooltip title={t("product.admin.status")} placement="bottom">
                <Button>{dataIndex ? <LockOpenIcon /> : <LockIcon />}</Button>
              </Tooltip>
            </Fragment>
          );
        },
      },
    },
  ];

  const enterVisible = (index) => {


    for (let x in visible) {
      visible[x] = false;
    }

    setVisible(() => {
      const newLoadings = [...visible];

      newLoadings[index] = true;

      return newLoadings;
    });
  };

  const handleCancel = (index) => {
    setVisible(() => {
      const newLoadings = [...visible];

      newLoadings[index] = false;

      return newLoadings;
    });
  };

  const Action = (status,rowIndex, update) => {

    setLoading(() => {
      const newLoadings = [...loadings];

      newLoadings[rowIndex.rowIndex] = true;

      return newLoadings;
    });

    UpdateStatus('carousel', rowIndex.tableData[rowIndex.rowIndex].id).then((res) => {

      if (res.status) {

        setLoading(() => {

          const newLoadings = [...loadings];

          newLoadings[rowIndex.rowIndex] = false;

          return newLoadings;
        });

        setVisible(() => {
          const newLoadings = [...visible];

          newLoadings[rowIndex.rowIndex] = false;

          return newLoadings;
        });

        return update(res.data.status)
      }
    });

  };

  return (
    <Fragment>
      <div className="products-dropbox">
        <div className="products-table">
          <Table
            dataTable={data}
            table="carousel"
            Columns={Columns("carousel", columns)}
          />
        </div>
      </div>
    </Fragment>
  )
};

export default Products;
