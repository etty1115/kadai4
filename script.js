document.getElementById('decision-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const emotion = document.getElementById('emotion').value;
    const reason = document.getElementById('reason').value;
    const decision = {emotion, reason, date: new Date()};
    
    let decisions = JSON.parse(localStorage.getItem('decisions')) || [];
    decisions.push(decision);
    
    localStorage.setItem('decisions', JSON.stringify(decisions));
    
    document.getElementById('emotion').value = '';
    document.getElementById('reason').value = '';
});

document.getElementById('summary-button').addEventListener('click', function() {
    let decisions = JSON.parse(localStorage.getItem('decisions')) || [];
    
    let summaryElement = document.getElementById('summary');
    summaryElement.innerHTML = ''; // Clear previous summary
    
    decisions.forEach(function(decision) {
        let date = new Date(decision.date);
        
        let decisionElement = document.createElement('p');
        decisionElement.textContent = `Date: ${date.toLocaleDateString()} - Emotion: ${decision.emotion} - Reason: ${decision.reason}`;
        summaryElement.appendChild(decisionElement);
    });
});
