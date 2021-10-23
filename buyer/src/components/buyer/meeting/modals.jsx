import React from "react";
import { Modal,Button } from "antd";

export const ViewMeeting = (props) => {

  return (
    <div className="modal-container d-none">
      <Modal
        title={props.title}
        visible={props.visible}
        onOk={() => props.handlingProps()}
        onCancel={props.onCancel}
      >
        <div className="text-center meeting-content">
          <div className="meeting-path">{(props.data.tableData[props.data.rowIndex].topic)}</div>
          <Button>
            <a href={(props.data.tableData[props.data.rowIndex].start_url)} target="_blank" rel="noreferrer">Start Meeting</a>
          </Button>
        </div>
      </Modal>
    </div>
  );
};
