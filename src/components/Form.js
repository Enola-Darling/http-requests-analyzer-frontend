import {useState} from "react";
import {FormControl, FormLabel, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export default function Form({updateData}) {

    const [method, setMethod] = useState('GET')
    const [url, setUrl] = useState('')
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setUrl(inputValue);
        try {
            new URL(inputValue);
            setError('');
        } catch (error) {
            setError('Invalid URL');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error) {
            return;
        }
        // make the request
        const initialData = {
            domain: new URL(url).hostname,
            scheme: new URL(url).protocol.replace(':', ''),
            path: new URL(url).pathname,
            method
        };
        const data = {
            initialData,
            pageLoadTime: 0.4,
            firstInteractionTime: 0.9,
            pageLoadScore: 720,
            firstInteractionScore: 720,
            responses: [
                {
                    statusCode: 302,
                    headers: {
                        "location": "https://www.google.com",
                    }
                },
                {
                    statusCode: 200,
                    headers: {
                        "content-type": "application/json",
                        "content-length": "1234",
                    }
                }
            ]
        }
        fetch("https://postman-echo.com/post", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(
            data => updateData(data.data)
        )
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{mt: 2}}>
                <FormLabel>Method</FormLabel>
                <Select id="method"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}>
                    {methods.map(method => <MenuItem key={method} value={method}>{method}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{mt: 2}}>
                <FormLabel>URL</FormLabel>
                <TextField type="text" id="url"
                           value={url}
                           onChange={handleInputChange}
                           error={error !== ''}
                           helperText={error}
                />
            </FormControl>
            <FormControl sx={{mt: 2}}>
                <Button type="submit">GO!</Button>
            </FormControl>
            </form>
        </div>
    )
}