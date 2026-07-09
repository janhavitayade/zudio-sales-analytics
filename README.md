# 📊 Zudio Sales Performance Analysis & Prediction

Predicting retail sales profit for Zudio stores across India using EDA and gradient-boosted machine learning models — achieving **0.874 cross-validated R²** with CatBoost.

🔗 **[View Interactive Dashboard](https://janhavitayade.github.io/zudio-sales-analytics/)**
🏆 **[Kaggle Notebook](https://www.kaggle.com/code/janhavitayade25/zudio-sales-performance-analysis-and-prediction)**
📓 **[Jupyter Notebook](./notebook/Zudio_Sales_Analysis.ipynb)**
📄 **[Full Report (PDF)](./report/Zudio_Report.pdf)**

---

## 🧾 Overview

Zudio is a fast-growing Indian fashion retail chain generating high-volume transactional data across cities, categories, and clothing types. This project analyzes ~7,900 transactions to uncover sales trends and builds a regression pipeline to predict **Sales Profit** from order- and store-level attributes — supporting inventory planning, regional strategy, and demand forecasting.

## 🎯 Objectives

- Perform univariate, bivariate, and multivariate EDA to surface sales trends
- Engineer features (store age, order weekday, profit-per-item, statistical polynomial aggregates)
- Train and compare 5 regression models
- Select the best model via 5-fold cross-validated R²
- Use the final model to predict profit for new/hypothetical orders

## 🗂️ Dataset

| Attribute | Details |
|---|---|
| Source | [Zudio Sales Test Dataset (Kaggle)](https://www.kaggle.com/datasets/saketkshirsagar1/zudio-sales-test-dataset) |
| Rows × Columns | 7,899 × 28 (raw) |
| Granularity | Transaction-level |
| Key fields | City, Category, Clothing Type, Quantity, Price, Order Date, Store Open Date, Sales Profit |

## 🛠️ Methodology

1. **Preprocessing** — imputed missing categoricals via mode, handled corrupt dates, IQR-based outlier removal on Sales Profit (29 outliers removed)
2. **Feature Engineering** — `Order Year/Month/Day/Weekday`, `Store Age (Days)`, `Profit per Item`, Label Count Encoding for City, and a custom **Statistical Polynomial Aggregate (SPA)** feature (`Sales × Quantity²`)
3. **Encoding** — One-Hot Encoding (Clothing Type, Category), Target Encoding (City), StandardScaler for numerics
4. **Feature Selection** — Random Forest feature importances, retaining features covering ~80% cumulative importance
5. **Modeling** — Linear Regression, Random Forest, XGBoost, LightGBM, CatBoost — tuned via `GridSearchCV`
6. **Validation** — 80/20 train-test split + 5-fold cross-validation + learning curves to diagnose over/underfitting

## 📈 Results

| Model | Test R² | Avg. CV R² |
|---|---|---|
| **CatBoost** ⭐ | **0.8807** | **0.8742** |
| XGBoost | 0.8808 | 0.8738 |
| LightGBM | 0.8798 | 0.8721 |
| Random Forest | 0.8764 | 0.8681 |
| Linear Regression | 0.8046 | 0.8057 |

**Best model: CatBoost** — best generalization, minimal overfitting, converged training/validation learning curves at R² ≈ 0.88.

## 🔑 Key Findings

- Top predictive features: `Sales_Quantity_SPA`, `Profit per Item`, `Quantity`
- **Kolhapur, Jalna, and Agra** are the top-performing cities by average sales profit
- Kids' apparel drives the highest transaction volume and profit contribution in several cities
- Sales profit peaks in January, July, and September and dips sharply in December
- Linear Regression underfits (R² ≈ 0.80) — confirming non-linear relationships in the data

## 💻 Tech Stack

`Python 3.13` · `pandas` · `numpy` · `scikit-learn` · `XGBoost` · `LightGBM` · `CatBoost` · `category_encoders` · `matplotlib` · `seaborn`

## 🚀 Running Locally

```bash
git clone https://github.com/janhavitayade/zudio-sales-analytics.git
cd zudio-sales-analytics
pip install pandas numpy scikit-learn xgboost lightgbm catboost category_encoders matplotlib seaborn jupyter
jupyter notebook notebook/Zudio_Sales_Analysis.ipynb
```

## 📁 Repository Structure

```
zudio-sales-analytics/
├── notebook/     → Full analysis & modeling notebook
├── report/       → Formal written report (PDF)
├── docs/         → Interactive dashboard (GitHub Pages site)
```

## 👤 Author

**Janhavi K. Tayade**
Sardar Patel Institute of Technology — Dept. of Computer Science & Engineering
Project: Python Programming for Data Science

