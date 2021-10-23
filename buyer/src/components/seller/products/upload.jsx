import React from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons"
import connect from '../../../services/connect'

const http = new connect();

const { Dragger } = Upload;



const UploadFile = (props) => {
  
  const UploadImages = {
    name: "file",
    accept: props.accept,
    multiple: false,
    action: `${http.BASE_URL}/${http.BASE_URL_SELLER}/product/excel`,
    headers:{
      'Authorization': `bearer ${localStorage.getItem('token')}`,
      'Accept-Language': localStorage.getItem('i18nextLng'),
      'Accept' : 'application/json',
      // 'Content-Type' : 'application/json'
    },
    onChange(info) {

      const { status } = info.file;

      if (status === "done") {

        message.success(`${info.file.name} file uploaded successfully.`);

      } else if (status === "error") {

        message.error(`${info.file.name} file upload failed.`);

      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <Dragger {...UploadImages}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single upload. Strictly prohibit from uploading company
        data or other band files
        <br />
        ["title","subtitle","description","price","discount","count","max negotiate"]
      </p>
    </Dragger>
  );
};

export default UploadFile;
