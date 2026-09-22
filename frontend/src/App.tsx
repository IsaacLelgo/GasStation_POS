import { useEffect, useState } from "react";
import { Fuel, SaleLine, getFuels, quoteSale } from "./api";

const money = (value: number) =>
  `Ksh ${(Math.round((value + Number.EPSILON) * 100) / 100).toFixed(2)}`;
const products = [
  { name: "Bottled water", detail: "600 ml", price: 250 },
  { name: "Hot coffee", detail: "Regular", price: 320 },
  { name: "Choc bar", detail: "45 g", price: 280 },
  { name: "Car wash", detail: "Deluxe", price: 1500 },
];

export default function App() {
  const [fuels, setFuels] = useState<Fuel[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<Fuel | null>(null);
  const [litres, setLitres] = useState("42.5");
  const [lines, setLines] = useState<SaleLine[]>([]);
  const [quote, setQuote] = useState({ subtotal: 0, tax: 0, total: 0 });
  const [message, setMessage] = useState("");

  useEffect(() => {
    getFuels()
      .then((catalog) => {
        setFuels(catalog);
        setSelectedFuel(catalog[0] ?? null);
      })
      .catch(() =>
        setMessage("Backend unavailable. Start NestJS on port 3000."),
      );
  }, []);

  useEffect(() => {
    quoteSale(lines)
      .then(setQuote)
      .catch(() => undefined);
  }, [lines]);

  const addFuel = () => {
    if (!selectedFuel || Number(litres) <= 0) return;
    setLines((current) => [
      ...current,
      {
        name: selectedFuel.name,
        quantity: Number(litres),
        unitPrice: selectedFuel.price,
        detail: `${Number(litres).toFixed(1)} L @ ${money(selectedFuel.price)}/L`,
      },
    ]);
    setMessage(`${selectedFuel.name} added to sale`);
  };
  const addProduct = (product: (typeof products)[number]) => {
    setLines((current) => [
      ...current,
      {
        name: product.name,
        quantity: 1,
        unitPrice: product.price,
        detail: product.detail,
      },
    ]);
    setMessage(`${product.name} added to sale`);
  };
  const changeQuantity = (index: number, delta: number) =>
    setLines((current) =>
      current
        .map((line, i) =>
          i === index ? { ...line, quantity: line.quantity + delta } : line,
        )
        .filter((line) => line.quantity > 0),
    );

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">F</span>
          <span>
            Forecourt<span className="brand-light">POS</span>
          </span>
        </div>
        <div className="station-switcher">
          <span className="status-dot" />
          <span>
            <strong>Northgate Station</strong>
            <small>Register 02</small>
          </span>
          <span className="chevron">v</span>
        </div>
        <nav className="nav-list">
          <a className="nav-item active" href="#">
            + <span>New sale</span>
          </a>
          <a className="nav-item" href="#">
            # <span>Transactions</span>
          </a>
          <a className="nav-item" href="#">
            [] <span>Inventory</span>
            <b>3</b>
          </a>
          <a className="nav-item" href="#">
            = <span>Shift report</span>
          </a>
        </nav>
        <div className="sidebar-bottom">
          <div className="shift-card">
            <div className="shift-label">
              <span className="live-dot" /> SHIFT IN PROGRESS
            </div>
            <strong>08:00 - 16:00</strong>
            <small>Tue, 22 Sep 2026</small>
            <hr />
            <div className="shift-meta">
              <span>Cash in drawer</span>
              <strong>Ksh 1,284.50</strong>
            </div>
          </div>
          <a className="nav-item" href="#">
            ? <span>Help & support</span>
          </a>
          <div className="user-row">
            <div className="avatar">AM</div>
            <span>
              <strong>Alex Morgan</strong>
              <small>Cashier</small>
            </span>
          </div>
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              TUESDAY, 22 SEPTEMBER 2026 <i /> 10:42 AM
            </p>
            <h1>Good morning, Alex</h1>
          </div>
          <div className="top-actions">
            <span className="connection">
              <span className="status-dot" /> Till online
            </span>
            <button className="icon-button">!</button>
            <button className="outline-button">Open drawer</button>
          </div>
        </header>
        <section className="overview-strip">
          <div>
            <span className="strip-label">TODAY'S SALES</span>
            <strong>Ksh 8,462.70</strong>
            <span className="trend">
              +12.4% <small>vs yesterday</small>
            </span>
          </div>
          <div className="strip-divider" />
          <div>
            <span className="strip-label">FUEL VOLUME</span>
            <strong>
              4,820 <small>L</small>
            </strong>
            <span className="trend neutral">86% of target</span>
          </div>
          <div className="strip-divider" />
          <div>
            <span className="strip-label">ACTIVE PUMPS</span>
            <strong>
              6 <small>/ 8</small>
            </strong>
            <span className="pump-summary">● 2 available</span>
          </div>
          <div className="strip-alert">
            <span className="alert-icon">!</span>
            <span>
              <strong>Low stock alert</strong>
              <small>3 items need attention</small>
            </span>
            <button className="text-button">Review</button>
          </div>
        </section>
        <div className="workspace-grid">
          <section className="sale-panel panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">CURRENT SALE</span>
                <h2>Sale #10482</h2>
              </div>
              <button className="ghost-button" onClick={() => setLines([])}>
                Clear sale
              </button>
            </div>
            <div className="pump-selector">
              <span className="field-label">PUMP</span>
              <div className="pump-tabs">
                {["01", "02", "03", "04", "05", "06"].map((pump) => (
                  <button
                    className={`pump-tab ${pump === "02" ? "active" : ""}`}
                    key={pump}
                  >
                    {pump}
                  </button>
                ))}
              </div>
              <span className="pump-status">● Ready</span>
            </div>
            <div className="customer-row">
              <div className="customer-icon">C</div>
              <div>
                <strong>Walk-in customer</strong>
                <small>Tap to add customer details</small>
              </div>
              <button className="add-customer">+</button>
            </div>
            <div className="sale-items">
              {lines.length === 0 ? (
                <div className="empty-sale">
                  <span className="empty-icon">+</span>
                  <strong>No items added</strong>
                  <span>Select fuel or a product to start this sale</span>
                </div>
              ) : (
                lines.map((line, index) => (
                  <div className="sale-item" key={`${line.name}-${index}`}>
                    <div>
                      <strong>{line.name}</strong>
                      <small>{line.detail}</small>
                    </div>
                    <div className="item-quantity">
                      <button onClick={() => changeQuantity(index, -1)}>
                        -
                      </button>
                      <span>{line.quantity}</span>
                      <button onClick={() => changeQuantity(index, 1)}>
                        +
                      </button>
                    </div>
                    <strong>{money(line.unitPrice * line.quantity)}</strong>
                    <button
                      onClick={() =>
                        setLines(lines.filter((_, i) => i !== index))
                      }
                    >
                      x
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="sale-footer">
              <div>
                <span>Subtotal</span>
                <strong>{money(quote.subtotal)}</strong>
              </div>
              <div className="muted-line">
                <span>Tax (included)</span>
                <span>{money(quote.tax)}</span>
              </div>
              <div className="total-line">
                <span>Total</span>
                <strong>{money(quote.total)}</strong>
              </div>
            </div>
            <div className="payment-actions">
              <button
                className="hold-button"
                onClick={() =>
                  setMessage(
                    lines.length
                      ? "Sale held for later"
                      : "There is no active sale to hold",
                  )
                }
              >
                Hold sale
              </button>
              <button
                className="pay-button"
                onClick={() =>
                  setMessage(
                    lines.length
                      ? `Payment due: ${money(quote.total)}`
                      : "Add an item before taking payment",
                  )
                }
              >
                Take payment <span>-&gt;</span>
              </button>
            </div>
          </section>
          <section className="entry-panel">
            <div className="section-title-row">
              <div>
                <span className="section-kicker">FUEL DISPENSER</span>
                <h2>Choose fuel</h2>
              </div>
              <span className="unit-note">Price per litre</span>
            </div>
            <div className="fuel-grid">
              {fuels.map((fuel) => (
                <button
                  className={`fuel-card ${selectedFuel?.id === fuel.id ? "selected" : ""}`}
                  onClick={() => setSelectedFuel(fuel)}
                  key={fuel.id}
                >
                  <span className={`fuel-colour ${fuel.colour}`} />
                  <span className="fuel-name">{fuel.name}</span>
                  <strong className="fuel-price">{money(fuel.price)}</strong>
                  <small>/ L</small>
                </button>
              ))}
            </div>
            <div className="litres-entry">
              <label htmlFor="litres">Litres dispensed</label>
              <div className="input-wrap">
                <input
                  id="litres"
                  type="number"
                  value={litres}
                  onChange={(event) => setLitres(event.target.value)}
                />
                <span>L</span>
              </div>
              <button className="add-fuel" onClick={addFuel}>
                Add fuel
              </button>
            </div>
            <div className="products-section">
              <div className="section-title-row">
                <div>
                  <span className="section-kicker">SHOP PRODUCTS</span>
                  <h2>Quick add</h2>
                </div>
                <button className="text-button">View all -&gt;</button>
              </div>
              <div className="product-grid">
                {products.map((product) => (
                  <button
                    className="product-card"
                    onClick={() => addProduct(product)}
                    key={product.name}
                  >
                    <span className="product-image" />
                    <span>
                      <strong>{product.name}</strong>
                      <small>{product.detail}</small>
                    </span>
                    <b>{money(product.price)}</b>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
        <section className="recent-section">
          <div className="section-title-row">
            <div>
              <span className="section-kicker">SHIFT ACTIVITY</span>
              <h2>Recent transactions</h2>
            </div>
            <button className="text-button">See all -&gt;</button>
          </div>
          <div className="transaction-table">
            <div className="table-head">
              <span>TRANSACTION</span>
              <span>ITEMS</span>
              <span>PAYMENT</span>
              <span>AMOUNT</span>
              <span>TIME</span>
            </div>
            {[
              ["#10481", "Super Petrol + 2 items", "Ksh 58.42", "10:38 AM"],
              ["#10480", "Diesel + 1 item", "Ksh 74.10", "10:31 AM"],
              ["#10479", "Super Petrol", "Ksh 42.88", "10:24 AM"],
            ].map(([id, item, amount, time]) => (
              <div className="transaction-row" key={id}>
                <strong>{id}</strong>
                <span>{item}</span>
                <span className="payment-pill">Card</span>
                <strong>{amount}</strong>
                <span>{time}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      {message && (
        <button className="toast" onClick={() => setMessage("")}>
          {message}
        </button>
      )}
    </div>
  );
}
