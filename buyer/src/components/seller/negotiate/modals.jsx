import React from "react";
import { Modal } from "antd";



export const ViewMessage = (props) => {

  return (
    <div className="modal-container d-none">
      <Modal
        title={props.title}
        visible={props.visible}
        onOk={() => props.handlingProps()}
        onCancel={props.onCancel}
      >
        <div className="text-center meeting-content">
          {props.dataIndex}
        </div>
      </Modal>
    </div>
  );
};
