
export default function URLInfo({data}) {
    return (
        <section className="url-info info-sections">
            <h4 className="box-title">URL Info</h4>
            <div className="box-card box-card__domain">
                <p>
                    <strong className="box-card__title">Domain</strong>
                    <span id="box-card__content">{data?.initialData.domain}</span>
                </p>
            </div>
            <div className="box-card box-card__scheme">
                <p>
                    <strong className="box-card__title">Scheme</strong>
                    <span id="box-card__content">{data?.initialData.scheme}</span>
                </p>
            </div>
            <div className="box-card box-card__path">
                <p>
                    <strong className="box-card__title">Path</strong>
                    <span id="box-card__content">{data?.initialData.path}</span>
                </p>
            </div>
        </section>
    )
}