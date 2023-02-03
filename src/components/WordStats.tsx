import { FalsePositiveCount, FalseNegativeCount } from "src/type-definitions.d";

interface WordStatsProps {
  parserName: string;
  falsePositiveCount: FalsePositiveCount;
  falseNegativeCount: FalseNegativeCount;
}

function WordStats({ parserName, falsePositiveCount, falseNegativeCount } : WordStatsProps) {
  return (
    <fieldset id="stats-fieldset">
      <legend id="stats-legend">
        <b>
          <i>Statistics for {parserName}</i>
        </b>
      </legend>
      <div>
        <span>
          <b>False Positives:</b> {falsePositiveCount}{" "}
        </span>
        <span>
          <b>False Negatives:</b> {falseNegativeCount}
        </span>
      </div>
      <b>Total Incorrect:</b> {falsePositiveCount + falseNegativeCount}
    </fieldset>
  );
}

export default WordStats;
