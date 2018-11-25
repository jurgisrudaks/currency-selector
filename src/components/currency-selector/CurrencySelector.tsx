import * as React from "react";

import styles from "./CurrencySelector.module.css";

interface ICurrencySelectorProps {
  currencies: string[];
}

interface ICurrencySelectorState {
  selectedCurrencies: string[];
}

class CurrencySelector extends React.Component<
  ICurrencySelectorProps,
  ICurrencySelectorState
> {
  public state: ICurrencySelectorState = {
    selectedCurrencies: []
  };

  private selectCurrency(currencyToSelect: string): void {
    const { selectedCurrencies } = this.state;

    this.setState({
      selectedCurrencies: [...selectedCurrencies, currencyToSelect]
    });
  }

  private deselectCurrency(currencyToDeselect: string): void {
    const { selectedCurrencies } = this.state;

    this.setState({
      selectedCurrencies: selectedCurrencies.filter(
        (selectedCurrency: string): boolean =>
          selectedCurrency !== currencyToDeselect
      )
    });
  }

  private toggelCurrency(currency: string): void {
    const { selectedCurrencies } = this.state;

    selectedCurrencies.includes(currency)
      ? this.deselectCurrency(currency)
      : this.selectCurrency(currency);
  }

  private onCurrencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const changedCurrency = event.target.value;

    this.toggelCurrency(changedCurrency);
  };

  private renderSelectedCurrencies(): JSX.Element[] {
    const { selectedCurrencies } = this.state;

    return selectedCurrencies.map(
      (selectedCurrency: string, index: number): JSX.Element => (
        <div
          key={`selected-currency-${index}-${selectedCurrency}`}
          className={styles.currency}
        >
          {selectedCurrency.toLowerCase()}
          <span
            onClick={() => this.deselectCurrency(selectedCurrency)}
            className={styles["deselect-currency"]}
          >
            X
          </span>
        </div>
      )
    );
  }

  private renderCurrencies(): JSX.Element[] {
    const { currencies } = this.props;
    const { selectedCurrencies } = this.state;

    return currencies.map(
      (currency: string, index: number): JSX.Element => (
        <label
          key={`currency-${index}-${currency}`}
          className={`${styles.currency}${
            selectedCurrencies.includes(currency)
              ? ` ${styles["currency--selected"]}`
              : ""
          }`}
        >
          <input
            type="checkbox"
            checked={selectedCurrencies.includes(currency)}
            onChange={this.onCurrencyChange}
            value={currency}
          />
          <span className={styles.checkmark} />
          {currency.toUpperCase()}
        </label>
      )
    );
  }

  public render(): JSX.Element {
    return (
      <div className={styles.container}>
        <div
          className={`${styles.currencies} ${styles["currencies--selected"]}`}
        >
          {this.renderSelectedCurrencies()}
        </div>
        <div
          className={`${styles.currencies} ${styles["currencies--available"]}`}
        >
          {this.renderCurrencies()}
        </div>
      </div>
    );
  }
}

export default CurrencySelector;
