document.getElementById('decision-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const emotion = document.getElementById('emotion').value;
    const reason = document.getElementById('reason').value;
    const decision = {emotion, reason, date: new Date()};

    let decisions = JSON.parse(localStorage.getItem('decisions')) || [];
    decisions.push(decision);
    localStorage.setItem('decisions', JSON.stringify(decisions));
});

document.getElementById('summary-button').addEventListener('click', function() {
    let decisions = JSON.parse(localStorage.getItem('decisions')) || [];
    
    let summaryElement = document.getElementById('summary');
    summaryElement.innerHTML = ''; // Clear previous summary
    
    if(decisions.length > 0) {
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        
        let headerRow = document.createElement('tr');
        ['Date', 'Emotion', 'Reason'].forEach(header => {
            let th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        decisions.forEach(function(decision) {
            let date = new Date(decision.date);
            
            let decisionRow = document.createElement('tr');
            [date.toLocaleDateString(), decision.emotion, decision.reason].forEach(text => {
                let td = document.createElement('td');
                td.textContent = text;
                decisionRow.appendChild(td);
            });
            tbody.appendChild(decisionRow);
        });

        table.appendChild(tbody);
        summaryElement.appendChild(table);
    } else {
        summaryElement.textContent = 'No decisions recorded yet.';
    }
});

document.getElementById('delete-button').addEventListener('click', function() {
    localStorage.removeItem('decisions');
    document.getElementById('summary').innerHTML = '';
});
