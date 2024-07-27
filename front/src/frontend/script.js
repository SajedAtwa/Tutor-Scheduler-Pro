document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('button');
    button.addEventListener('click', submitQuery);
});

function submitQuery() {
    const inputElement = document.getElementById('input');
    const question = inputElement.value;
    const responseContainer = document.getElementById('response');

    fetch('/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question })
    })
    .then(response => response.json())
    .then(data => {
        responseContainer.innerHTML = 'SQL Query: ' + data.sql_query + '<br> Response: ' + JSON.stringify(data.response);
    })
    .catch(error => {
        console.error('Error:', error);
        responseContainer.innerText = 'Failed to get response';
    });
}