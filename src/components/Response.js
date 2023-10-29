export default function Request({request}) {

    return     return (
        <div>
            <h4 className="box-title">URL Info:</h4>
            <div className="box-card box-card__domain">
                <p className="box-card__title">Domain</p>
                <p id="box-card__content">{data?.initialData.domain}</p>
            </div>
            <div className="box-card box-card__scheme">
                <p className="box-card__title">Scheme</p>
                <p id="box-card__content">{data?.initialData.scheme}</p>
            </div>
            <div className="box-card box-card__path">
                <p className="box-card__title">Path</p>
                <p id="box-card__content">{data?.initialData.path}</p>
            </div>
        </div>
    )
}