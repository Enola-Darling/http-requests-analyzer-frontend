import './App.scss';
import Status from './components/Status';
import Form from './components/Form';
import URLInfo from "./components/URLInfo";
import {useState} from "react";
import Response from "./components/Response";
import Timing from "./components/Timing";
import SwipeableEdgeDrawer from "./components/SwipeableDrawer";
import {createTheme, ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    spacing: 8,
});

function App() {
    const [data, setData] = useState(null);
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <div className="App">
                <header className="App-header">
                    <Status
                        lastResponse={data?.responses?.length > 0 ? data.responses[data.responses.length - 1] : null}></Status>
                    <Form updateData={setData}></Form>
                </header>
                <main className="boxes">
                    {data && <URLInfo data={data}></URLInfo>}
                    {data?.responses.map((response, index) => (
                        <Response key={index} response={response} index={index}></Response>
                    ))}
                </main>
                {data && <SwipeableEdgeDrawer>
                    <Timing time={data?.pageLoadTime} score={data?.pageLoadScore} title="Page Load"></Timing>
                    <Timing time={data?.firstInteractionTime} score={data?.firstInteractionScore}
                            title="First Interaction"></Timing>
                </SwipeableEdgeDrawer>}
            </div>
        </ThemeProvider>
    );
}

export default App;
