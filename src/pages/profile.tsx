import { useContext, useState } from "react";
import { server } from "../api/server";
import Swal from "sweetalert2";
import { AuthContext } from "../utils/authContext";
import { useEffect } from "react";
import { Button, Modal, Space } from "antd";
import axios from "axios";

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
export default function Profile() {
  const [step1Data, setStep1] = useState(null);
  const [step2Data, setStep2] = useState(null);
  const [ourRequest, setOurRequest] = useState(axios.CancelToken.source());
  // Make CancelToken

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((flag) => !flag);
  };

  const authContext = useContext(AuthContext);

  const getTwoRequests = async () => {
    setStep1({ step: 1, status: "ongoing" });
    await axios.get(
      `https://my-json-server.typicode.com/MpMeetPatel/json-server/author`,
      { cancelToken: ourRequest.token }
    );
    setStep1({ step: 1, status: "completed" });
    await sleep(1000);
    setStep2({ step: 2, status: "ongoing" });
    await axios.get(
      `https://my-json-server.typicode.com/MpMeetPatel/json-server/quote`,
      { cancelToken: ourRequest.token }
    );
    setStep2({ step: 2, status: "completed" });
  };
  const getProfile = async () => {
    try {
      // FAKE LOGIN
      const { data } = await server.get(
        `https://my-json-server.typicode.com/MpMeetPatel/json-server/profile`
      );
      const user = data.find(
        (el) => el?.data?.token === localStorage.getItem("token")
      );
      if (user?.data?.token) {
        localStorage.setItem("token", user?.data?.token);
        authContext?.authenticate(user?.data?.token, user?.data?.name);
        Swal.fire("Yeaah !!!!", "Successful !", "success");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        Swal.fire("Oops...", error?.response?.data?.error, "error");
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <div>{JSON.stringify(authContext, null, 2)}</div>
      <Space wrap>
        <Button
          type="primary"
          onClick={() => {
            toggleModal();
            getTwoRequests();
          }}
        >
          Get Quota
        </Button>
        <Modal
          title="Modal"
          open={isModalOpen}
          onOk={toggleModal}
          onCancel={toggleModal}
        >
          <h2>Requesting the qoute...</h2>
          {step1Data?.step === 1 && (
            <p>
              {" "}
              Step 1: Requesting author ...{" "}
              {step1Data?.status === "completed" ? "Completed" : "Ongoing"}
            </p>
          )}
          {step2Data?.step === 2 && (
            <p>
              {" "}
              Step 2: Requesting quote ...{" "}
              {step2Data?.status === "completed" ? "Completed" : "Ongoing"}
            </p>
          )}
          <Button
            type="default"
            onClick={() => {
              ourRequest.cancel("Operation cancelled");
              setOurRequest(axios.CancelToken.source());
            }}
          >
            Cancle Ongoing Request
          </Button>
        </Modal>
      </Space>
    </div>
  );
}
