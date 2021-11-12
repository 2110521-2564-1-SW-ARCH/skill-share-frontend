import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import React, { useEffect, useRef, useState } from "react";
import Clip from "../../../Components/Clip";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import CommentSection from "../Containers/CommentSection";

const ClipFeed = ({
  handleClose,
  currentIndex,
  setCurrentIndex,
  clips,
  setClips,
}: {
  handleClose: () => void;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  clips: any[];
  setClips: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const ref = useRef<CarouselRef | null>(null);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isFade, setIsFade] = useState(true);
  const handleChange = (from: number, to: number) => {
    const temp = clips.slice();
    temp.forEach((item) => (item.isPlay = false));
    temp[to].isPlay = true;
    setShouldPlay(false);
    setClips(temp);
    setCurrentIndex(to);
  };

  const handlePlay = () => {
    const temp = clips.slice();
    temp.forEach((item) => (item.isPlay = false));
    temp[currentIndex].isPlay = true;
    setClips(temp);
  };

  const handlePause = () => {
    const temp = clips.slice();
    temp.forEach((item) => (item.isPlay = false));
    temp[currentIndex].isPlay = true;
    setClips(temp);
  };

  const handleOpenVideoComment = () => {
    setVisible(true);
  };

  const handleNext = () => {
    if (ref && ref.current) ref.current.goTo(currentIndex + 1);
  };

  const handleBack = () => {
    if (ref && ref.current) ref.current.goTo(currentIndex - 1);
  };

  const handleFaderToggle = () => {
    setIsFade(!isFade);
  };

  console.log("clips", clips);

  return (
    <div style={{ overflow: "hidden" }}>
      <CommentSection
        visible={visible}
        setVisible={setVisible}
        comments={clips[currentIndex].comments}
      />
      <Carousel
        infinite={false}
        ref={ref}
        dots={false}
        afterChange={() => setShouldPlay(true)}
        beforeChange={(from, to) => handleChange(from, to)}
        initialSlide={currentIndex}
      >
        {clips.map(
          (
            {
              videoId,
              name,
              url,
              isPlay,
              title,
              description,
              previewImage,
              permission,
            },
            index
          ) => (
            <Clip
              videoId={videoId}
              isFade={isFade}
              previewImage={previewImage}
              name={name}
              url={url}
              height={"100vh"}
              key={index + name}
              isFirst={index === 0}
              isLast={index === clips.length - 1}
              index={index}
              isPlay={isPlay}
              title={title}
              description={description}
              permission={permission}
              handleOpenVideoComment={handleOpenVideoComment}
              handleNext={handleNext}
              handleBack={handleBack}
              handleFaderToggle={handleFaderToggle}
              setIsFade={setIsFade}
              handlePlay={handlePlay}
              handlePause={handlePause}
              handleClose={handleClose}
            />
          )
        )}
      </Carousel>
    </div>
  );
};

export default ClipFeed;
