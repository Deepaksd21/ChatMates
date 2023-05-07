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
  const [avatars, setAvatars] = useState([]);
  const [images, setImages] = useState([]);
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

  let imagess = [
    "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png",
    "https://cdn-icons-png.flaticon.com/128/4333/4333609.png",
    "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png",
    "https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png",
    "https://cdn.pixabay.com/photo/2016/08/20/05/36/avatar-1606914_1280.png",
    "https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png",
    "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Photo.png",
    "https://cdn-icons-png.flaticon.com/512/186/186313.png",
    "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-No-Background.png",
    "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Pic.png",
    "https://w7.pngwing.com/pngs/905/625/png-transparent-computer-icons-user-profile-women-avatar-child-face-head-thumbnail.png",
    "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-HD-Image.png",
    "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child-thumbnail.png",
    "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images-HD.png",
  ];

  useEffect(() => {}, []);

  useEffect(() => {
    const allImages = [
      /* Array of 14 images */
      "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png",
      "https://cdn-icons-png.flaticon.com/128/4333/4333609.png",
      "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png",
      "https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png",
      "https://cdn.pixabay.com/photo/2016/08/20/05/36/avatar-1606914_1280.png",
      "https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png",
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Photo.png",
      "https://cdn-icons-png.flaticon.com/512/186/186313.png",
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-No-Background.png",
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Pic.png",
      "https://w7.pngwing.com/pngs/905/625/png-transparent-computer-icons-user-profile-women-avatar-child-face-head-thumbnail.png",
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-HD-Image.png",
      "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child-thumbnail.png",
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images-HD.png",
    ];
    const newImages = [];

    while (newImages.length < 4) {
      const randomIndex = Math.floor(Math.random() * allImages.length);
      const randomImage = allImages[randomIndex];

      if (!newImages.includes(randomImage)) {
        newImages.push(randomImage);
      }
    }

    setImages(newImages);

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
                    style={{ borderRadius: "50%" }}
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
