function mapStatusToMessage(statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
        return 'Everything is fine!';
    } else if (statusCode >= 300 && statusCode < 400) {
        return 'Redirection not completed!';
    } else if (statusCode >= 400 && statusCode < 500) {
        return 'User input error!';
    } else if (statusCode >= 500 && statusCode < 600) {
        return 'Server error!';
    }
}

export default function Status({lastResponse}) {
    return (
        <div>
            <p id="status-code">{lastResponse === null ? "N/A" : lastResponse.statusCode}</p>
            <p id="status-text">{lastResponse === null ? "Submit a request first." :
                mapStatusToMessage(lastResponse?.statusCode)}</p>
        </div>
    )
}