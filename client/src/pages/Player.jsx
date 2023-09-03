import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useParams } from "react-router-dom";
import axios from "axios";

function Player() {
  const { category, mediaId, episodeId } = useParams();
  const videoRef = useRef(null);
  const [src, setSRC] = useState("");

  useEffect(() => {
    const fetchSRC = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/src/${category}/${mediaId}/${episodeId}`
        );
        setSRC(res.data.sources[0].url);
      } catch (error) {
        console.error("Error fetching video source:", error);
      }
    };

    if (!src) {
      fetchSRC();
    }
  }, [src, mediaId, episodeId]);

  useEffect(() => {
    const video = videoRef.current;

    if (src) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      }
    }
  }, [src]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <video
        ref={videoRef}
        controls
        style={{ width: "100%", height: "100%" }}
      ></video>
    </div>
  );
}

export default Player;
