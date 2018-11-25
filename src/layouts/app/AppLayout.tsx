import * as React from "react";

import CurrencySelector from "../../components/currency-selector";

import styles from "./AppLayout.module.css";

class App extends React.Component {
  // This would come from some sorts of backend
  private currencies: string[] = [
    "EUR",
    "PLN",
    "GEL",
    "DKK",
    "CZK",
    "GBP",
    "SEK",
    "USD",
    "RUB"
  ];

  public render() {
    return (
      <div className={styles.app}>
        <div className={styles.container}>
          <CurrencySelector currencies={this.currencies} />
        </div>
      </div>
    );
  }
}

export default App;
