// Animate hero stats on load
function animateCount(id, target, decimals = 0, duration = 1200) {
  const el = document.getElementById(id);
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = target * progress;
    el.textContent = decimals ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
animateCount('stat-rows', 7899);
animateCount('stat-cities', 40);
animateCount('stat-r2', 0.874, 3);
animateCount('stat-models', 5);

// Model comparison chart
const ctx = document.getElementById('modelChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['CatBoost', 'XGBoost', 'LightGBM', 'Random Forest', 'Linear Regression'],
    datasets: [
      {
        label: 'Test R²',
        data: [0.8807, 0.8808, 0.8798, 0.8764, 0.8046],
        backgroundColor: '#7c5cff'
      },
      {
        label: 'Avg. Cross-Validation R²',
        data: [0.8742, 0.8738, 0.8721, 0.8681, 0.8057],
        backgroundColor: '#22d3ee'
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: { min: 0.7, max: 0.95, ticks: { color: '#9a9ab0' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      x: { ticks: { color: '#eaeaf0' }, grid: { display: false } }
    },
    plugins: { legend: { labels: { color: '#eaeaf0' } } }
  }
});

// Simple illustrative profit estimator (NOT the real CatBoost model)
const qty = document.getElementById('qty');
const price = document.getElementById('price');
document.getElementById('qtyVal').textContent = qty.value;
document.getElementById('priceVal').textContent = price.value;
qty.oninput = () => document.getElementById('qtyVal').textContent = qty.value;
price.oninput = () => document.getElementById('priceVal').textContent = price.value;

document.getElementById('predictBtn').addEventListener('click', () => {
  const q = parseFloat(qty.value);
  const p = parseFloat(price.value);
  const cityFactor = parseFloat(document.getElementById('cityTier').value);
  const catFactor = parseFloat(document.getElementById('category').value);

  // Heuristic loosely inspired by report's SPA feature (Sales * Quantity^2) and profit margins
  const baseSales = p * q;
  const spaInfluence = Math.log((baseSales * q * q) + 1) * 90;
  const estimate = (baseSales * 0.25 + spaInfluence) * cityFactor * catFactor;

  document.getElementById('predictedProfit').textContent =
    '₹' + estimate.toLocaleString(undefined, { maximumFractionDigits: 0 });
});