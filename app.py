
from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    df = pd.read_csv("static/data/modern-renewable-energy-consumption.csv")
    df = df.dropna(subset=["Year"])
    df["Year"] = df["Year"].astype(int)
    df_grouped = df.groupby("Year").sum(numeric_only=True).reset_index()

    # Datos para gráfico de torta
    last_year = df_grouped["Year"].max()
    df_last = df_grouped[df_grouped["Year"] == last_year]
    pie_data = {
        "labels": ["Solar", "Wind", "Hydro", "Geo Biomass Other"],
        "values": [
            float(df_last["Solar Generation - TWh"]),
            float(df_last["Wind Generation - TWh"]),
            float(df_last["Hydro Generation - TWh"]),
            float(df_last["Geo Biomass Other - TWh"]),
        ]
    }

    # Datos para gráficos de línea y área
    line_data = {
        "years": df_grouped["Year"].tolist(),
        "solar": df_grouped["Solar Generation - TWh"].tolist(),
        "wind": df_grouped["Wind Generation - TWh"].tolist(),
        "hydro": df_grouped["Hydro Generation - TWh"].tolist(),
        "biomass": df_grouped["Geo Biomass Other - TWh"].tolist(),
    }   
    return render_template("dashboard.html", pie_data=pie_data, line_data=line_data)

@app.route('/data')
def data():
    df = pd.read_csv('static/data/modern-renewable-energy-consumption.csv')
    region = 'World'
    df_region = df[df['Entity'] == region]

    total_solar = df_region['Solar Generation - TWh'].sum()
    total_wind = df_region['Wind Generation - TWh'].sum()
    total_hydro = df_region['Hydro Generation - TWh'].sum()
    total_biomass = df_region['Geo Biomass Other - TWh'].sum()

    data = {
        "labels": ["Solar", "Eólica", "Hidroeléctrica", "Biomasa / Geotérmica"],
        "values": [total_solar, total_wind, total_hydro, total_biomass]
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
