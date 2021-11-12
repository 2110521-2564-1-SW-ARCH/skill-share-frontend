
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import { STATE } from "../../utils";
import PlaylistForm from "../PlaylistForm";
import CreatePlaylist from "./CreatePlaylist";
import Playlist from "./Playlist";
import ViewPlaylist from "./ViewPlaylist";
import { AllPlaylist } from "../../interface";

const PlaylistFeed = ({
  currentVideoId,
  visible,
  handleClose,
  playlist,
}: {
  currentVideoId: string;
  visible: boolean;
  handleClose: () => void;
  playlist: AllPlaylist[];
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<AllPlaylist>({
    id: "PLAYLIST_ID",
    title: "PLAYLIST_TITLE",
    description: "PLAYLIST_DESCRIPTION",
    permission: "public",
    userId: "USER_ID",
    videoList: [""],
  });

  const [isShowSave, setIsShowSave] = useState(false);

  const [isShowCreatePlaylist, setIsShowCreatePlaylist] = useState(false);

  const handleCloseCreatePlayList = () => {
    setIsShowCreatePlaylist(false);
  };
  const handleOpenCreatePlayList = () => {
    setIsShowCreatePlaylist(true);
  };
  const handleCloseSaveToPlaylist = () => {
    setIsShowSave(false);
  };
  const handleOpenSaveToPlaylist = () => {
    setIsShowSave(true);
  };

  const handleOpenCreatePlaylist = () => {
    setIsShowCreatePlaylist(true);
  };

  const handleSelectPlaylist = ({
    id,
    title,
    description,
    videoList,
    userId,
    permission,
  }: AllPlaylist) => {
    setSelectedPlaylist({
      title,
      description,
      videoList,
      id,
      userId,
      permission,
    });
    handleOpenSaveToPlaylist();
  };

  return (
    <Drawer
      title={`Save to playlist`}
      headerStyle={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      }}
      placement={"right"}
      closable={true}
      onClose={handleClose}
      visible={visible}
      key={"right"}
      destroyOnClose
      height="100%"
      width="100%"
    >
      <Typography style={{ padding: "16px", fontWeight: 500 }}>
        Select a playlist to save clip
      </Typography>

      <Row gutter={[8, 8]}>
        <Col
          xs={8}
          md={4}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "250px",
            width: "100%",
            cursor: "pointer",
            backgroundColor: "#D3D3D3",
          }}
          onClick={handleOpenCreatePlaylist}
        >
          <PlusCircleOutlined style={{ width: "20px", height: "20px" }} />
          <Typography>new playlist</Typography>
        </Col>
        {playlist.map(
          (
            {
              title,
              description,
              permission,
              userId,
              id,
              videoList,
            }: AllPlaylist,
            index
          ) => (
            <Col
              xs={8}
              md={4}
              style={{
                display: "flex",
                justifyContent: "center",
                height: "250px",
                width: "100%",
                cursor: "pointer",
              }}
              onClick={() => {
                handleSelectPlaylist({
                  title,
                  description,
                  videoList,
                  id,
                  userId,
                  permission,
                });
              }}
            >
              <Playlist title={title} previewImage={""} key={index} />
            </Col>
          )
        )}
      </Row>
      {/* <PlaylistForm
        visible={openCreateDrawer}
        handleClose={handleCloseCreatePlaylist}
      /> */}
      <CreatePlaylist
        videoId={currentVideoId}
        visible={isShowCreatePlaylist}
        handleClose={handleCloseCreatePlayList}
      />
      <ViewPlaylist
        state={STATE.SAVE}
        playlist={selectedPlaylist}
        visible={isShowSave}
        clips={[]}
        handleClose={handleCloseSaveToPlaylist}
      />
    </Drawer>
  );
};

export default PlaylistFeed;
