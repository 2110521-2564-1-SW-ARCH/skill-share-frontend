import React, { useState } from "react";
import { Input, Tabs, Divider, Button, Typography, Drawer } from "antd";
import Searching from "../Components/Searching";
import "../index.css";
import BottomNav from "../../../Components/BottomNav/BottomNav";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";
import BasicCarousel from "../Components/BasicCarousel";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import ClipFeed from "../../feed/Components/ClipFeed";

const { Search } = Input;

const LearnContainer = () => {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const {
    userData: { username },
  } = useUserDataContext();
  const { clips, setClips } = useClipFeedContext();

  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const handleSetIsDrag = (state: boolean) => {
    setIsDrag(state);
  };

  const handleClickSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const onSearch = (e: any) => {
    const value = e.target.value;
    setSearchField(value);
    if (value === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  return (
    <div id="search-page">
      <Search
        placeholder="search..."
        allowClear
        value={searchField ?? ""}
        onChange={onSearch}
        onFocus={() => setSearchShow(true)}
        addonAfter={
          searchShow && (
            <Button
              type="text"
              onClick={() => {
                setSearchField("");
                setSearchShow(false);
              }}
            >
              Cancel
            </Button>
          )
        }
      />
      {searchShow ? (
        <Searching
          searchField={searchField}
          clips={clips}
          handleOpen={handleOpen}
        />
      ) : (
        <div style={{ textAlign: "left" }}>
          <Typography.Title level={3}>Trending</Typography.Title>
          <BasicCarousel
            itemList={clips}
            handleOpen={handleOpen}
            handleClickSlide={handleClickSlide}
            handleSetIsDrag={handleSetIsDrag}
            isDrag={isDrag}
          />
          <Typography.Title level={3}>Recommend</Typography.Title>
          <BasicCarousel
            itemList={clips}
            handleOpen={handleOpen}
            handleClickSlide={handleClickSlide}
            handleSetIsDrag={handleSetIsDrag}
            isDrag={isDrag}
          />
          <Typography.Title level={3}>Cooking</Typography.Title>
          <BasicCarousel
            itemList={clips}
            handleOpen={handleOpen}
            handleClickSlide={handleClickSlide}
            handleSetIsDrag={handleSetIsDrag}
            isDrag={isDrag}
          />
        </div>
      )}
      <BottomNav username={username} />
      <Drawer
        placement={"right"}
        visible={visible}
        closable={false}
        width={"100%"}
        keyboard
        destroyOnClose
        className={"ant-drawer-body"}
      >
        <ClipFeed
          handleClose={handleClose}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          clips={clips}
          setClips={setClips}
        />
      </Drawer>
    </div>
  );
};

export default LearnContainer;
