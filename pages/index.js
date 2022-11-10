import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage(){
  const estilosDaHomePage = {

  }

  const [valorDoFilter, setValorDoFilter] = React.useState("");
    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1
                
            }}>
                <Menu valorDoFilter={valorDoFilter} setValorDoFilter={setValorDoFilter}/>
                <Header />
                
                <Timeline searchValue={valorDoFilter} playlists={config.playlists}>
                  
                </Timeline>
            </div>
        </>
    )
}
export default HomePage

const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .user-info {
    background-image: url(${config.bg});
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  background-image: blue;
  background-image: url(${({ bg })} => bg)};
  hight: 230px
`;
function Header() {
  return (
    <StylecHeader>
    <StyledBanner bg={bg} />
      {/*<img src="banner" />*/}
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>

          <p>{config.job}</p>
        </div>
      </section>
    </StylecHeader>
  );
}

function Timeline({searchValue, ...propriedades}) {
  //console.log("Dentro do componente", propriedades.playlists);
  const playlistNames = Object.keys(propriedades.playlists);
  return (
    
    <StyledTimeline>
      {playlistNames.map((playlistNames) => {
        const videos = propriedades.playlists[playlistNames];
        console.log(playlistNames);
        console.log(videos);
        return (
          <section key={playlistNames}>
            <h2>{playlistNames}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase();
                const searchValueNormalized = video.title.toLowerCase();
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
    
    <StyledTimeline />
    
  );
}

