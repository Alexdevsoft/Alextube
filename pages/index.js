import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/componets/CSSReset";
import Menu from "../src/componets/Menu";
import TimeLine from "../src/componets/TimeLine";

export default function HomePage() {
    const estilosDaHomePage = {
        // backgroundColor: "red" 
    };
  
    // console.log(config.playlists);
  
    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                backgroundColor: "red",
            }}>
                <Menu />
                <Header />
                <TimeLine playlists={config.playlists}>
                    Conteúdo
                </TimeLine>
            </div>
        </>
    );
  }
  

//function Menu(){
//    return (
//        <div>Menu</div>
//    )
//}

const StylecHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .user-info {
    margin-top: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

function Header() {
  return (
    <StylecHeader>
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

// function TimeLine(propriedades) {
//   console.log("Dentro do componente", propriedades.playlists);
//   const playlistNames = Object.keys(propriedades.playlists);
//   return (
//     <div>
//       {playlistNames.map((playlistNames) => {
//         const videos = propriedades.playlists[playlistNames];

//         return (
//           <section>
//             <h2>{playlistNames}</h2>
//             <div>
//               {videos.map((video) => {
//                 return (
//                   <a href={video.url}>
//                     <img src={video.thumb} />
//                     <span>{video.title}</span>
//                   </a>
//                 );
//               })}
//             </div>
//           </section>
//         );
//       })}
//     </div>
//   );
// }

