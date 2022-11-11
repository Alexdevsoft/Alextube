import React from "react";


export const ColorModeContext = React.createContext({
    mode: "",
    setMode: () => { alert("vc precisa me configura primweiro")},
    toggleMode: () => { alert("vc precisa me configura primweiro") },
});

export default function ColorModeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode)

    function toggleMode() {
        if(mode === "dark") setMode("light");
        if(mode === "light") setMode("dark");
    }

    return (
        <ColorModeContext.Provider value={{mode: mode, setMode: setMode, toggleMode: toggleMode }}>
            {props.children}
        </ColorModeContext.Provider>
    );
}