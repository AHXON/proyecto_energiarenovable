
fetch('/data')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('barChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Producción Total (TWh) por Fuente',
                    data: data.values,
                    backgroundColor: [
                        '#FFA726',
                        '#29B6F6',
                        '#66BB6A',
                        '#AB47BC'
                    ]
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    });

    // aqui empieza lo agregago

// PIE CHART - Participación por fuente
const pieCtx = document.getElementById('pieChart');
new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: pieData.labels,
        datasets: [{
            data: pieData.values,
            backgroundColor: ['#f39c12', '#3498db', '#2ecc71', '#9b59b6']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Participación de Energías Renovables (TWh)'
            }
        }
    }
});

// LINE CHART - Evolución por tipo de energía
const lineCtx = document.getElementById('lineChart');
new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: lineData.years,
        datasets: [
            {
                label: 'Solar',
                data: lineData.solar,
                borderColor: '#f1c40f',
                fill: false
            },
            {
                label: 'Wind',
                data: lineData.wind,
                borderColor: '#2980b9',
                fill: false
            },
            {
                label: 'Hydro',
                data: lineData.hydro,
                borderColor: '#27ae60',
                fill: false
            },
            {
                label: 'Biomass/Other',
                data: lineData.biomass,
                borderColor: '#8e44ad',
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Tendencia en Generación por Tipo (TWh)'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// AREA CHART - Comparación acumulada
const areaCtx = document.getElementById('areaChart');
new Chart(areaCtx, {
    type: 'line',
    data: {
        labels: lineData.years,
        datasets: [
            {
                label: 'Solar',
                data: lineData.solar,
                backgroundColor: 'rgba(241, 196, 15, 0.4)',
                borderColor: '#f1c40f',
                fill: true,
                tension: 0.4,
                stack: 'stack1'
            },
            {
                label: 'Wind',
                data: lineData.wind,
                backgroundColor: 'rgba(41, 128, 185, 0.4)',
                borderColor: '#2980b9',
                fill: true,
                tension: 0.4,
                stack: 'stack1'
            },
            {
                label: 'Hydro',
                data: lineData.hydro,
                backgroundColor: 'rgba(39, 174, 96, 0.4)',
                borderColor: '#27ae60',
                fill: true,
                tension: 0.4,
                stack: 'stack1'
            },
            {
                label: 'Biomass/Other',
                data: lineData.biomass,
                backgroundColor: 'rgba(142, 68, 173, 0.4)',
                borderColor: '#8e44ad',
                fill: true,
                tension: 0.4,
                stack: 'stack1'
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Comparación Acumulada de Generación Renovable'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                stacked: true
            },
            x: {
                stacked: true
            }
        }
    }
});
