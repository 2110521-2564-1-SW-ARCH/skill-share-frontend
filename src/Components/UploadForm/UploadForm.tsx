import { Upload, Button, Input, Form, message, Row, Switch, Col } from "antd";

import { file } from "@babel/types";
import { useState } from "react";
import { upload } from "./util";
import useUserAuthenticationContext from "../../Domains/UserAuthentication/useUserAuthentication";
import { UploadClip } from "../../interface";
import DropZone from "../DropZone/DropZone";
import "./index.css";
import { useHistory } from "react-router";

const UploadForm = () => {
  const [form] = Form.useForm();
  const [video, setVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { canAccessService } = useUserAuthenticationContext();
  const username = localStorage.getItem("skillUsername");
  const { TextArea } = Input;
  const history = useHistory();

  const handleAddVideo = (file: any) => {
    form.setFieldsValue({ video: file });
    setVideo(file);
  };

  const onFinish = (values: UploadClip) => {
    message.loading("Uploading . . .");
    console.log("values", values);
    setIsLoading(true);
    upload({ token: canAccessService(), body: values })
      .then(() => {
        message.success("Uploading success");
        setIsLoading(false);
        window.location.href = `/${username}`;
      })
      .catch((err) => message.error("Found some error. Please try again."));
  };

  return (
    <div style={{ padding: "48px" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="video"
          rules={[{ required: true, message: "Please upload your clip" }]}
        >
          <DropZone handleAddVideo={handleAddVideo} file={video} />
        </Form.Item>
        <Form.Item
          name="title"
          label="Clip name"
          rules={[{ required: true, message: "Please select title clip" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please describe your clip" }]}
        >
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="permission"
          initialValue="public"
          valuePropName="checked"
        >
          <Switch
            checkedChildren="public"
            unCheckedChildren="private"
            defaultChecked
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="upload-button"
            loading={isLoading}
          >
            Upload clip
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadForm;
