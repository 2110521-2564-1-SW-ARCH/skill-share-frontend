import React, { useEffect, useState } from "react";
import "./index.css";
import ReactHlsPlayer from "react-hls-player";
import { Avatar, Button, Typography } from "antd";
import {
  LeftCircleOutlined,
  MessageOutlined,
  RightCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ReactPlayer from "react-player";
import Fader from "../Fader/Fader";

let COUNTER = 0;

const Clip = ({
  isFade,
  name,
  url,
  height = undefined,
  index,
  isPlay,
  title,
  description,
  tags,
  isFirst,
  isLast,
  handleOpenVideoComment,
  handleNext,
  handleBack,
  handleFaderToggle,
  setIsFade,
  handlePlay,
  handlePause,
}: {
  isFade: boolean;
  name?: string | undefined;
  url: string;
  height?: string | undefined;
  index: number;
  isPlay: boolean;
  title: string;
  description: string;
  tags: Array<string>;
  isFirst: boolean;
  isLast: boolean;
  handleOpenVideoComment: () => void;
  handleNext: () => void;
  handleBack: () => void;
  handlePlay: () => void;
  handlePause: () => void;
  handleFaderToggle: () => void;
  setIsFade: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const playerRef = React.useRef<ReactPlayer | null>(null);
  const [isShowControl, setIsShowControl] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpandable, setIsExpandable] = useState(true);

  return (
    <div
      id={"@" + name + "." + index.toString()}
      style={{
        background: "#000",
        height: `${height && height}`,
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
      onMouseMove={(e: any) => {
        if (e.target.tagName === "VIDEO") setIsFade(true);
      }}
      onTouchEnd={(e: any) => {
        setIsFade(true);
      }}
    >
      <Fader isFade={isFade} setIsFade={setIsFade}>
        <div>
          <div
            style={{
              position: "absolute",
              bottom: 150,
              right: 25,
              zIndex: 100,
            }}
          >
            <Avatar
              style={{
                width: "50px",
                height: "50px",
              }}
            >
              <UserOutlined
                style={{
                  color: "#FFF",
                  fontSize: "60px",
                }}
              />
            </Avatar>
            <Typography style={{ color: "#FFF" }}>{name}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: "50%",
              justifyContent: "space-between",
              translate: "50% 0",
              width: "100%",
              zIndex: 1000,
            }}
          >
            {!isFirst && (
              <LeftCircleOutlined
                style={{
                  color: "#FFF",
                  fontSize: "48px",
                  zIndex: 1000,
                  cursor: "pointer",
                  position: "absolute",
                  left: 10,
                }}
                onClick={() => handleBack()}
              />
            )}
            {!isLast && (
              <RightCircleOutlined
                style={{
                  color: "#FFF",
                  fontSize: "48px",
                  zIndex: 1000,
                  cursor: "pointer",
                  position: "absolute",
                  right: 10,
                }}
                onClick={() => handleNext()}
              />
            )}
          </div>
          <MessageOutlined
            style={{
              position: "absolute",
              bottom: 100,
              right: 30,
              color: "#FFF",
              fontSize: "40px",
              zIndex: 100,
            }}
            onClick={() => handleOpenVideoComment()}
          />

          <div
            style={{
              position: "absolute",
              bottom: "10%",
              width: "70%",
              textAlign: "left",
              paddingLeft: "16px",
              zIndex: 100,
            }}
          >
            <Typography.Title style={{ color: "#FFF" }} level={5}>
              {title}
            </Typography.Title>
            <Typography.Paragraph
              style={{ color: "#FFF" }}
              ellipsis={{ rows: 2, expandable: isExpandable }}
              onClick={() => setIsExpandable(!isExpandable)}
            >
              {description}
            </Typography.Paragraph>
            {/* <span style={{ display: "inline-flex" }}>
              {tags.map((tag) => (
                <Typography.Paragraph style={{ color: "#FFF" }}>
                  {`#${tag}`}
                </Typography.Paragraph>
              ))}
            </span> */}
          </div>
        </div>
      </Fader>

      <ReactPlayer
        url={url}
        autoPlay={false}
        playing={isPlay}
        onPlay={() => handlePlay()}
        onPause={() => handlePause()}
        controls={true}
        width="100%"
        height="100vh"
        ref={playerRef}
        className={"clip"}
        loop
      />
      {/* <ReactHlsPlayer
        src={url}
        autoPlay={false}
        controls={true}
        width="100%"
        height="100vh"
        playerRef={playerRef}
        className={"clip"}
      ></ReactHlsPlayer> */}
    </div>
  );
};

export default Clip;
