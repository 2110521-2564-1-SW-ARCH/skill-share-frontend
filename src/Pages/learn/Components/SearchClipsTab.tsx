import "../index.css";
import { Row, Col, Avatar } from "antd";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import PreviewClip from "../../../Components/PreviewClip";
import { ClipProp } from "../../../interface";
import BasicCarousel from "./BasicCarousel";

const SearchClipsTab = ({
  searchWord,
  clips,
}: {
  searchWord: string;
  clips: Array<ClipProp>;
}) => {
  const filteredClips = clips.filter((clip) => {
    return (
      clip.title.toLowerCase().includes(searchWord.toLowerCase()) ||
      clip.description.toLowerCase().includes(searchWord.toLowerCase())
    );
  });
  return (
    <div id="search-clips">
      <BasicCarousel itemList={filteredClips} />
      {/* <Row gutter={[12, 18]} style={{ padding: "0% 5%" }}>
        {filteredClips.map(
          (
            { name, url, isPlay, title, description, tags }: ClipProp,
            index: number
          ) => (
            <Col
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                height: "250px",
              }}
            >
              <PreviewClip url={url} isPlay={false} index={index} key={index} />
            </Col>
          )
        )}
      </Row> */}
    </div>
  );
};

export default SearchClipsTab;
