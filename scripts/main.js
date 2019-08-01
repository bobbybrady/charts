var ctx = document.getElementById('myChart');

let names = []
const fetchData = () => {
    fetch("http://localhost:8088/data")
        .then(data => data.json())
        .then(dataList => {
            for (let i = 0; i < dataList.length; i++) {
                const currentName = dataList[i].sales_agent.last_name
                names.push(currentName)
        }
        const uniqueNames = new Set(names)
        uniqueNames.forEach(name => {
            fetch(`http://localhost:8088/data?sales_agent.last_name=${name}`)
            .then(data => data.json())
            .then(dataSet => {
                let profit = 0
                dataSet.forEach(element => {
                    profit += element.gross_profit

                });
            pullProfit(profit)
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: names,
                    datasets: [{
                        label: 'Annual Profits',
                        data: profitArray,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 70
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            barThickness: 25,
                            
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            
            })
        });

    })
}


fetchData()

const pullProfit = (currentProfit) => {
    profitArray.push(currentProfit)
}

const profitArray = []

