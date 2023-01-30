import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { server } from "../api/server";

export default function AboutUs() {
  const [initData, setInitData] = useState(null);
  const getInfo = async () => {
    const { data } = await server.get(
      "https://my-json-server.typicode.com/MpMeetPatel/json-server/info"
    );
    setInitData(data?.data);
  };
  useEffect(() => {
    getInfo();
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: initData?.info || "" }}></div>;
}
