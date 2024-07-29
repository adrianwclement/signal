import styles from "../styles/FrequencyChart.module.css";

export const FrequencyChart = () => {
  const frequencies = { A: 5, B: 3, C: 2 };

  return (
    <div className={styles.frequencyChart}>
      <h2>Frequency Chart</h2>
      <ul>
        {Object.entries(frequencies).map(([letter, count]) => (
          <li key={letter}>
            {letter}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};
