// Add an event listener to handle form submission
document.getElementById('stockForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const stockSymbol = document.getElementById('stockSymbol').value;
    const apiKey = '2E83KQJ37PIK1B94';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${apiKey}`;

    // Fetch stock data from Alpha Vantage API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const stockData = data['Time Series (Daily)'];
            let output = '<h5>Stock Data for ' + stockSymbol.toUpperCase() + '</h5>';
            output += '<table class="table table-bordered table-dark">';
            output += '<thead><tr><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th><th>Volume</th></tr></thead><tbody>';

            for (let date in stockData) {
                output += `<tr>
                            <td>${date}</td>
                            <td>${stockData[date]['1. open']}</td>
                            <td>${stockData[date]['2. high']}</td>
                            <td>${stockData[date]['3. low']}</td>
                            <td>${stockData[date]['4. close']}</td>
                            <td>${stockData[date]['5. volume']}</td>
                           </tr>`;
            }

            output += '</tbody></table>';
            document.getElementById('stockData').innerHTML = output;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('stockData').innerHTML = '<p class="text-danger">Error fetching data. Please try again.</p>';
        });
});
