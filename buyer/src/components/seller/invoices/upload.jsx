import React from "react";
import { Upload } from "antd";
import { useTranslation } from "react-i18next";
import readXlsxFile from "read-excel-file";

const { Dragger } = Upload;

const UploadFile = (props) => {
  const { t } = useTranslation();

  const UploadImages = {
    multiple: false,
    maxCount: 1,
    accept: props.accept,
    beforeUpload: (file) => {
      return false;
    },
    onChange: (file) => {
      if (file.fileList[0]) {
        readXlsxFile(file.file).then((rows) => {
          props.Import(file.file,rows);
        });
      } else {
        return false;
      }
    },
  };
  return (
    <>
      <Dragger {...UploadImages}>
        <button type="button" className="btn">{t("IMPORT")}</button>
      </Dragger>
    </>
  );
};

export default UploadFile;
