import { arc } from "d3-shape"

function getMessageForValue(value) {
    if (value >= 0 && value <= 250) return "Bad!";
    if (value > 250 && value <= 500) return "Poor!";
    if (value > 500 && value <= 700) return "Fair!";
    if (value >= 720) return "Great!";
}

function Gauge({value}) {
    // based on https://dev.to/karthik_raja/a-simple-react-gauge-with-blob-1ddf
    const distanceBetweenArcs = 0.03;
    const padding = 0.2;
    const redArc = arc()
        .innerRadius(1)
        .outerRadius(0.9)
        .startAngle(-3 * Math.PI / 4)
        .endAngle(0 - distanceBetweenArcs)
        .padAngle(0)
        .cornerRadius(2)();

    const orangeArc = arc()
        .innerRadius(1)
        .outerRadius(0.9)
        .startAngle(0)
        .endAngle(Math.PI / 4 - distanceBetweenArcs)
        .padAngle(0)
        .cornerRadius(2)();


    const greenArc = arc()
        .innerRadius(1)
        .outerRadius(0.9)
        .startAngle(Math.PI/4)
        .endAngle(Math.PI/2 - distanceBetweenArcs)
        .padAngle(0)
        .cornerRadius(2)();

    const blueArc = arc()
        .innerRadius(1)
        .outerRadius(0.9)
        .startAngle(Math.PI / 2)
        .endAngle(3 * Math.PI / 4 - distanceBetweenArcs)
        .padAngle(0)
        .cornerRadius(2)();

    const getBlobColor = value => {
        if (value >= 0 && value <= 250) return "#e81246";
        if (value > 250 && value <= 500) return "#ee8d41";
        if (value > 500 && value <= 750) return "#4dff4d";
        if (value >= 750) return "#2e5bff";
    };
    let phi = 3 * (value - 500) * Math.PI / 2000;
    let markerLocation = [0.95*Math.sin(phi), -0.95*Math.cos(phi)];
    console.log(markerLocation)
    //let markerLocation = [0, -1];
    return (
        <div className="gauge">
            <svg viewBox={[-1 - padding, -1 - padding, 2 + 2 * padding, 2].join(" ")}>
                <path d={redArc} fill="#e81246"/>
                <path d={orangeArc} fill="#ee8d41"/>
                <path d={greenArc} fill="#4dff4d"/>
                <path d={blueArc} fill="#2e5bff"/>
                <circle
                    cx={markerLocation[0]}
                    cy={markerLocation[1]}
                    r="0.07"
                    strokeWidth="0.03"
                    fill="white"
                    stroke={getBlobColor(value)}
                />
                <text x="0" y="0" textAnchor="middle" alignmentBaseline="middle" fontSize="0.2" fill="#fff">
                    <tspan x="0" dy="-0.5em">{value}</tspan>
                    <tspan x="0" dy="1em">{getMessageForValue(value)}</tspan>
                </text>
            </svg>
        </div>
    );
}

export default function Timing({title, score, time}) {
    if (!score || !time) {
        return
    }
    return (
        <div className="timing">
            <Gauge value={score}/>
            <div>
                <h2 className="timing__title">{title}</h2>
                <p className="timing__time">{time}s</p>
            </div>
        </div>
    )
}