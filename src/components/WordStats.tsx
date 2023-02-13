import { Stats } from "src/type-definitions.d";

interface WordStatsProps {
  parserName: string;
  stats: Stats;
}

function WordStats({ parserName, stats }: WordStatsProps) {
  return (
    <fieldset id="stats-fieldset">
      <legend id="stats-legend">
        <b>
          <i>Statistics for {parserName}</i>
        </b>
      </legend>
      <div>
        <span>
          <b>False Positives:</b> {stats.falsePos}{" "}
        </span>
        <span>
          <b>False Negatives:</b> {stats.falseNeg}
        </span>
      </div>
      <b>Total Incorrect:</b> {stats.falsePos + stats.falseNeg}
    </fieldset>
  );
}

export default WordStats;
