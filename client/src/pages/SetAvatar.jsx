import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/4645646";
  const navigate = useNavigate();
  // const [images, setImages] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      console.log("Selecting Picture --->");
      const user = await JSON.parse(localStorage.getItem("Chat-user"));

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("Chat-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  };

  let images = [
    "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png",
    "https://cdn-icons-png.flaticon.com/128/4333/4333609.png",
    "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png",
    "https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png",
  ];

  useEffect(() => {
    // const data = [];
    // for (let i = 0; i < 4; i++) {
    //   const image = await axios.get(
    //     `${api}/${Math.round(Math.random() * 1000)}`
    //   );
    //   const buffer = new Buffer(image.data);
    //   data.push(buffer.toString("base64"));
    // }
    if (!localStorage.getItem("Chat-user")) navigate("/login");
    setAvatars(images);
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as an profile picture</h1>
          </div>
          <div className="avatars">
            {images?.map((avatar, index) => {
              console.log("Inside --->", avatar);
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
