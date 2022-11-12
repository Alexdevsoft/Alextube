import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    return {
        values,
        handleChange: (e) => {
                const value = e.target.value;
                const name = e.target.name;
                setValues({
                    ...values,
                    [name]: value,
                });
            },
            clearForm() {
                setValues({});
            }
    };


}

const PROJECT_URL = "https://okstarojudwxmjdcuhea.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3aW14dXNzYmxub29oZnh0d2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNTA4OTUsImV4cCI6MTk4MzgyNjg5NX0.bFc_-pGKBgOQItuoxL86nI6y3BU-G6mfwmMHIS-rmuQ";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}


export default function RegisterVideo() {
    const formCadastro = useForm({ 
        initialValues: { titulo: "forst pun", URL: "https://www.youtube.com/watch?v=QsqatJxAUtk" }
     });
    const [formVisivel, setFormVisivel] = React.useState(false); 
    
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
                {formVisivel 
                    ? (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                supabase.from("video").insert({
                                    title: formCadastro.values.titulo,
                                    url: formCadastro.values.url,
                                    thumb: getThumbnail(formCadastro.values.url),
                                    playlist: "jogos",
                                })
                                .then((oqueveio) => {
                                    console.log(oqueveio);
                                })
                                    .catch((err) => {
                                        console.log(err);
                                    })

                                setFormVisivel(false);
                                formCadastro.clearForm();
                            }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input placeholder="Título do vídeo" name="titulo"
                            value={formCadastro.values.titulo} 
                            onChange={formCadastro.handleChange}/>
                            <input placeholder="URL" name="url" value={formCadastro.values.URL} 
                            onChange={formCadastro.handleChange}/>
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                )
                    : false}
        </StyledRegisterVideo>
    )
}

<RegisterVideo />