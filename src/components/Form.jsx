import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from "@mui/material/Button";
import "./Form.scss";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export default function Form({ updateData }) {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 767);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setUrl(inputValue);
    try {
      new URL(inputValue);
      setError("");
    } catch (err) {
      setError("Invalid URL");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error.length > 0 || url == "") {
      return;
    }
    /* The following is a mock object. We will use it as payload for the 
     * postman-echo online service, to emulate a request to a back-end.
     * This allow to prevent the expiration of data in JSON hosting 
     * services like jsonbin.io
     */
    const urlObj = new URL(url);
    const data = {
      initialData: {
        domain: urlObj.hostname,
        scheme: urlObj.protocol.replace(":", ""),
        path: urlObj.pathname,
        method,
      },
      pageLoadTime: 0.4,
      firstInteractionTime: 0.9,
      pageLoadScore: 720,
      firstInteractionScore: 720,
      responses: [
        {
          statusCode: 302,
          headers: {
            location: "https://www.google.com",
          },
        },
        {
          statusCode: 200,
          headers: {
            "content-type": "application/json",
            "content-length": "1234",
          },
        },
      ],
    };
    fetch("https://postman-echo.com/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => updateData(data.data));
  };

  return (
    <div className="form-wrap">
      <form onSubmit={handleSubmit}>
        <FormControl  sx={{ mt: 0,  }}>
          {/* <FormLabel>Method</FormLabel> */}
          <Select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            {methods.map((method) => (
              <MenuItem key={method} value={method} className="menu-itme">
                {method}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl  sx={{ mt: 0,  flex:3}}>
          {/* <FormLabel>URL</FormLabel> */}
          <TextField
            id="url"
            value={url}
            onChange={handleInputChange}
            error={error !== ""}
            helperText={error}
    
          />
        </FormControl>
       {isMobile ? (
          <FormControl sx={{ flex: "auto" }}>
            <Button
              variant="contained"
              type="submit"
              style={{ minWidth: '30px', minHeight: '30px', padding: 0 }}
            >
              <SearchOutlinedIcon fontSize="medium" style={{ height: '54px', padding:"0" }}  />
            </Button>
          </FormControl>
        ) : (
          <FormControl sx={{ flex: "auto" }}>
            <Button
              variant="contained"
              type="submit"
              style={{ minWidth: '100px', minHeight: '54px' }}
            >
              Send
            </Button>
          </FormControl>
        )}
      </form>
    </div>
  );
}

