/* Small diagram-style illustrations, one per service. Colours come from CSS variables, so they follow the theme. */

export function Illustration({ id }: { id: string }) {
  switch (id) {
    case "custom":
      return <Custom />;
    case "automation":
      return <Automation />;
    case "web":
      return <Web />;
    case "mobile":
      return <Mobile />;
    case "cloud":
      return <Cloud />;
    default:
      return <Consulting />;
  }
}

const svgProps = {
  className: "il",
  viewBox: "0 0 480 300",
  role: "img" as const,
};

function Custom() {
  return (
    <svg {...svgProps} aria-label="A business dashboard with navigation, summary tiles and a chart">
      <rect className="box" x="40" y="24" width="400" height="252" rx="16" />
      <circle className="coral" cx="66" cy="46" r="5" />
      <circle className="lime" cx="84" cy="46" r="5" />
      <circle className="cy" cx="102" cy="46" r="5" />
      <path className="ln" d="M40 64h400" />
      <rect className="soft" x="40" y="64" width="92" height="212" />
      <rect className="acc" x="56" y="86" width="60" height="9" rx="4.5" />
      <rect className="bar" x="56" y="112" width="48" height="9" rx="4.5" />
      <rect className="bar" x="56" y="138" width="56" height="9" rx="4.5" />
      <rect className="bar" x="56" y="164" width="40" height="9" rx="4.5" />
      {[152, 250, 348].map((x, i) => (
        <g key={x}>
          <rect className="soft" x={x} y="82" width="80" height="58" rx="10" />
          <rect className={i === 1 ? "acc" : "bar"} x={x + 12} y="96" width="34" height="14" rx="4" />
          <rect className="bar" x={x + 12} y="120" width="48" height="7" rx="3.5" />
        </g>
      ))}
      <rect className="soft" x="152" y="156" width="276" height="104" rx="10" />
      <path className="ln-cy" d="M170 238 L214 212 L258 224 L302 190 L346 200 L390 172 L414 180" />
      <circle className="cy" cx="302" cy="190" r="5" />
      <circle className="cy" cx="390" cy="172" r="5" />
    </svg>
  );
}

function Automation() {
  const nodes = [
    { x: 24, label: "Request" },
    { x: 132, label: "Check" },
    { x: 240, label: "Approve" },
    { x: 348, label: "Logged" },
  ];
  return (
    <svg {...svgProps} aria-label="A workflow: request, automatic check, human approval, logged">
      {[0, 1, 2].map((i) => (
        <path key={i} className="ln-cy flow" d={`M${nodes[i].x + 88} 130 H${nodes[i + 1].x}`} />
      ))}
      {nodes.map((n, i) => (
        <g key={n.label}>
          <rect className="box" x={n.x} y="92" width="88" height="76" rx="14" />
          <text className="il-t" x={n.x + 44} y="154">
            {n.label}
          </text>
          {i === 0 && <rect className="coral" x={n.x + 30} y="108" width="28" height="22" rx="5" />}
          {i === 1 && <path className="ln-cy" d={`M${n.x + 28} 120 l10 10 l22 -20`} />}
          {i === 2 && (
            <g>
              <circle className="lime" cx={n.x + 44} cy="113" r="9" />
              <path className="lime" d={`M${n.x + 28} 134 a16 14 0 0 1 32 0 z`} />
            </g>
          )}
          {i === 3 && (
            <g>
              <rect className="bar" x={n.x + 24} y="110" width="40" height="6" rx="3" />
              <rect className="bar" x={n.x + 24} y="122" width="30" height="6" rx="3" />
            </g>
          )}
        </g>
      ))}
      <rect className="soft" x="24" y="208" width="412" height="62" rx="12" />
      <rect className="bar" x="44" y="226" width="150" height="7" rx="3.5" />
      <rect className="bar" x="44" y="244" width="220" height="7" rx="3.5" />
      <rect className="acc" x="372" y="228" width="44" height="22" rx="11" />
    </svg>
  );
}

function Web() {
  return (
    <svg {...svgProps} aria-label="A web application in a browser window">
      <rect className="box" x="32" y="22" width="416" height="256" rx="16" />
      <path className="ln" d="M32 60h416" />
      <circle className="coral" cx="56" cy="41" r="5" />
      <circle className="lime" cx="74" cy="41" r="5" />
      <circle className="cy" cx="92" cy="41" r="5" />
      <rect className="soft" x="124" y="31" width="220" height="20" rx="10" />
      <rect className="bar" x="60" y="90" width="150" height="16" rx="5" />
      <rect className="bar" x="60" y="116" width="120" height="16" rx="5" />
      <rect className="bar" x="60" y="146" width="170" height="7" rx="3.5" />
      <rect className="bar" x="60" y="162" width="140" height="7" rx="3.5" />
      <rect className="acc" x="60" y="188" width="86" height="28" rx="14" />
      <rect className="soft" x="262" y="82" width="162" height="134" rx="14" />
      <circle className="cy" cx="343" cy="136" r="26" />
      <path className="lime" d="M300 216 a43 38 0 0 1 86 0 z" />
      {[60, 168, 276].map((x) => (
        <g key={x}>
          <rect className="soft" x={x} y="232" width="96" height="34" rx="8" />
          <rect className="bar" x={x + 12} y="244" width="50" height="7" rx="3.5" />
        </g>
      ))}
    </svg>
  );
}

function Mobile() {
  return (
    <svg {...svgProps} aria-label="A mobile app with a notification, connected to a backend">
      <rect className="box" x="30" y="108" width="84" height="64" rx="12" />
      <text className="il-t" x="72" y="146">
        API
      </text>
      <path className="ln-cy flow" d="M114 140 H176" />
      <rect className="box" x="176" y="12" width="140" height="276" rx="28" />
      <rect className="soft" x="226" y="24" width="40" height="8" rx="4" />
      {[60, 112, 164].map((y, i) => (
        <g key={y}>
          <circle className={i === 0 ? "acc" : "bar"} cx="206" cy={y + 18} r="14" />
          <rect className="bar" x="230" y={y + 8} width="64" height="8" rx="4" />
          <rect className="soft" x="230" y={y + 24} width="44" height="7" rx="3.5" />
        </g>
      ))}
      <rect className="acc" x="196" y="236" width="100" height="30" rx="15" />
      <g>
        <rect className="box" x="296" y="52" width="150" height="50" rx="14" />
        <circle className="lime" cx="320" cy="77" r="10" />
        <rect className="bar" x="338" y="66" width="82" height="8" rx="4" />
        <rect className="soft" x="338" y="82" width="58" height="7" rx="3.5" />
      </g>
    </svg>
  );
}

function Cloud() {
  return (
    <svg {...svgProps} aria-label="Data sources flowing through a pipeline into a reporting dashboard">
      {[44, 118, 192].map((y) => (
        <g key={y}>
          <ellipse className="box" cx="70" cy={y + 12} rx="34" ry="11" />
          <path className="box" d={`M36 ${y + 12} v34 a34 11 0 0 0 68 0 v-34`} />
          <ellipse className="soft" cx="70" cy={y + 12} rx="34" ry="11" />
        </g>
      ))}
      <path className="ln-cy flow" d="M112 76 H170 V150 H196" />
      <path className="ln-cy flow" d="M112 150 H196" />
      <path className="ln-cy flow" d="M112 224 H170 V150" />
      <rect className="box" x="196" y="104" width="96" height="92" rx="14" />
      <rect className="acc" x="214" y="124" width="60" height="8" rx="4" />
      <rect className="bar" x="214" y="144" width="48" height="8" rx="4" />
      <rect className="bar" x="214" y="164" width="56" height="8" rx="4" />
      <path className="ln-cy flow" d="M292 150 H330" />
      <rect className="box" x="330" y="64" width="124" height="172" rx="14" />
      {[
        { x: 348, h: 40 },
        { x: 372, h: 70 },
        { x: 396, h: 52 },
        { x: 420, h: 92 },
      ].map((b) => (
        <rect key={b.x} className={b.h > 80 ? "acc" : "cy"} x={b.x} y={206 - b.h} width="16" height={b.h} rx="4" />
      ))}
    </svg>
  );
}

function Consulting() {
  return (
    <svg {...svgProps} aria-label="An architecture diagram with layers and a flagged risk area">
      <rect className="soft" x="24" y="20" width="432" height="260" rx="16" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect className="box" x="48" y={40 + i * 74} width="292" height="60" rx="12" />
          {[0, 1, 2].map((j) => (
            <rect key={j} className={i === 1 && j === 1 ? "acc" : "bar"} x={64 + j * 90} y={56 + i * 74} width="74" height="28" rx="8" />
          ))}
        </g>
      ))}
      <rect className="risk" x="140" y="108" width="108" height="80" rx="12" />
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle className={i === 1 ? "coral" : "lime"} cx="378" cy={64 + i * 64} r="12" />
            <rect className="bar" x="398" y={58 + i * 64} width="42" height="7" rx="3.5" />
            <rect className="bar" x="398" y={72 + i * 64} width="30" height="6" rx="3" />
          </g>
        ))}
      </g>
    </svg>
  );
}
