"use client";

import { Form, Input, Modal, Select } from "antd";

interface CreateMemberPopupProps {
  open: boolean;
  handleClose: () => void;
}

interface FormType {
  userId: string;
  userType: string;
}

const userTypeOptions = [
  { label: "Owner", value: "1000" },
  {
    label: "Manager",
    value: "2000",
  },
  { label: "Member", value: "3000" },
];

export const CreateMemberPopup = (props: CreateMemberPopupProps) => {
  const { open, handleClose } = props;

  const handleSubmit = (value: FormType) => {
    console.log("handleSubmit", value);
    //
  };

  return (
    <Modal open={open} onCancel={handleClose}>
      <Form>
        <Form.Item name="userId">
          <Input />
        </Form.Item>
        <Form.Item name="userType">
          <Select options={userTypeOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
