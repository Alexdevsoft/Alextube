import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";

function HomePage(){
  const service = videoService();
  const [valorDoFilter, setValorDoFilter] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});
  
  React.useEffect(() => {
    console.log("useEffect");
    service
        .getAllVideos()
        .then((dados) => {
            console.log(dados.data);
            const novasPlaylists = { ...playlists};
            dados.data?.forEach((video) => {
              if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
              novasPlaylists[video.playlist] = [
                  video,
                  ...novasPlaylists[video.playlist],
                ];
            });

            setPlaylists(novasPlaylists);
        });
}, []);

  return (
      <div>
        
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1
                
            }}>
                <Menu valorDoFilter={valorDoFilter} setValorDoFilter={setValorDoFilter} />
                <Header />
                
                <Timeline searchValue={valorDoFilter} playlists={config.playlists} />
                  
                
            </div>
        </div>
    );
}
export default HomePage

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .user-info {
    //background-image: url(${config.bg});
    margin-top: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  background-image: blue;
  background-image: url(${({ bg }) => bg});
  height: 230px;
`;
function Header() {
  return (
    <StyledHeader>
    <StyledBanner bg={config.bg} />
      {/*<img src="banner" />*/}
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>

          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({searchValue, ...propriedades}) {
  console.log(searchValue);
  const playlistNames = Object.keys(propriedades.playlists);
  return (
    
    <StyledTimeline>
      {playlistNames.map((playlistNames) => {
        const videos = propriedades.playlists[playlistNames];
        //console.log(playlistNames);
        //console.log(videos);
        return (
          <section key={playlistNames}>
            <h2>{playlistNames}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase();
                const searchValueNormalized = searchValue.toLowerCase();
                return titleNormalized.includes(searchValueNormalized)
              }).map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>{video.title}</span>
                  </a>
                )
              })}
            </div>
          </section>
        );
      })}
    
    </StyledTimeline>
    
  ); 
}

