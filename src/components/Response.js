function Header({headerKey, headerValue}) {
    return (
        <div className="box-card box-card__header">
            <p>
                <strong className="box-card__title">{headerKey}: </strong>
                <span id="box-card__content">{headerValue}</span>
            </p>
        </div>
    )
}

export default function Response({response, index}) {
    return (
        <section className="response-info info-sections">
            <h4 className="box-title">Response</h4>
            <div className="box-card box-card__status">
                <strong className="box-card__title">Status Code: </strong>
                <span id="box-card__content">{response?.statusCode}</span>
            </div>
            {Object.keys(response?.headers).map((key, index2) => (
                <Header key={`${index}-${index2}`} headerKey={key} headerValue={response.headers[key]}></Header>
            ))}
        </section>
    )
}