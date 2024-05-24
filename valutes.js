document.addEventListener('DOMContentLoaded', () => {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(response => response.json())
    .then(data => {
        const valutaTable = document.getElementById('valuta-table');
        const valutaSelect = document.getElementById('valutaSelect');
    

        data.forEach(valuta => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${valuta.txt}</td>
                <td>${valuta.cc}</td>
                <td>${valuta.rate}</td>
                <td>${valuta.exchangedate}</td>
            `;
            
            valutaTable.appendChild(row);
            
            const option = document.createElement('option');
            option.value = valuta.rate;
            option.text = `${valuta.txt} (${valuta.cc})`;
            valutaSelect.appendChild(option);
        });

        const form = document.getElementById('converter-form'); 
        form.addEventListener('submit', event => {
            event.preventDefault();

            const amount = parseFloat(document.getElementById('amount').value);
            const selectedRate = parseFloat(document.getElementById('valutaSelect').value); 
            
            const convertedAmount = amount / selectedRate;

            const resultDiv = document.getElementById('conversion-result'); 
            resultDiv.innerHTML = `Результат: ${convertedAmount.toFixed(2)}`;
        });
    })
    
});
