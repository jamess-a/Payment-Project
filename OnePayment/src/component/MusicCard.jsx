import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";

const Card = styled.div`
  width: 300px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #1db954;
  color: white;
  display: flex;
  flex-direction: column;
`;

const AlbumCover = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const SongTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const ArtistName = styled.h3`
  margin: 10px 0 0;
  font-size: 18px;
  font-weight: 400;
`;

const PlayButton = styled.button`
  background-color: white;
  color: #1db954;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  margin-top: 20px;
  align-self: center;

  &:hover {
    background-color: #1ed760;
  }
`;

const StopButton = styled.button`
  background-color: white;
  color: #1db954;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  margin-top: 20px;
  align-self: center;
  &:hover {
    background-color: #1ed760;
  }
`;

function MusicCard({ albumCover, songTitle, artistName }) {
  return (
    <Card>
      <AlbumCover src={albumCover} alt="Album Cover" />
      <Info>
        <SongTitle>{songTitle}</SongTitle>
        <ArtistName>{artistName}</ArtistName>
        <Box
          sx={{
            display: "flex",
            flexdirction: "row",
            justifyContent: "space-between",
          }}
        >
          <PlayButton>▶️</PlayButton>
          <StopButton>❌</StopButton>
        </Box>
      </Info>
    </Card>
  );
}

export default MusicCard;
