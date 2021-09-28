import React from "react";
import { Row, Col, Tabs } from "antd";
import { ImFilm, ImLock } from "react-icons/im";
import Clip from "../../../Components/Clip";
const { TabPane } = Tabs;

const UserClipList = (props: any) => {
  const { clips } = props;
  return (
    <>
      <Tabs defaultActiveKey="1" centered tabPosition={"bottom"}>
        <TabPane
          tab={
            <span>
              <ImFilm />
            </span>
          }
          key="1"
        />
        <TabPane
          tab={
            <span>
              <ImLock />
            </span>
          }
          key="2"
        />
      </Tabs>
      <Row gutter={[8, 8]}>
        {clips.map((index: number) => (
          <Col xs={8} md={8}>
            <Clip />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default UserClipList;
