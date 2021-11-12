import { message } from "antd";
import axios from "axios";
import { GAYEWAY_HOST } from "./const";

export type Token = {
  token: string;
  expiry: number;
};

export const STATE = { EDIT: "EDIT", SAVE: "SAVE" };

export const PERMISSION = (permission: boolean) => {
  if (permission) return "public";
  else return "private";
};

export const getPlaylistPreviewImage = (videoId: string) =>
  `https://skill-share-streaming-service-znv5z.ondigitalocean.app/video/${videoId}/poster.jpg`;

export const getStreamingUrl = (videoId: string) =>
  `https://skill-share-streaming-service-znv5z.ondigitalocean.app/video/${videoId}/playlist.m3u8`;

export const getPreviewImageUrl = (videoId: string) =>
  `https://skill-share-streaming-service-znv5z.ondigitalocean.app/video/${videoId}/poster.jpg`;

export const getAllVideoInPlaylist = ({
  token,
  videoList,
}: {
  token: string | null;
  videoList: string[];
}): Promise<any> | null => {
  if (token) {
    const config = {
      headers: {
        Authorization: `${token.trim()}`,
      },
    };
    const requestArr = videoList.map(async (id) => {
      return axios
        .get(`${GAYEWAY_HOST}/videos/video?videoId=${id}`, config)
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          }
        })
        .catch((err) => message.error(err.response.data.message));
    });
    return Promise.all(requestArr).then((data) => data);
  }
  return null;
};
