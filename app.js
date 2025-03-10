document.getElementById('submit-btn').addEventListener('click', function() {
    const username = document.getElementById('username-input').value;
    if (username) {
        sendUsernameToPlayFab(username);
    }
});

function sendUsernameToPlayFab(username) {
    const titleId = 'YOUR_PLAYFAB_TITLE_ID';
    const secretKey = 'YOUR_PLAYFAB_SECRET_KEY';

    const url = `https://${titleId}.playfabapi.com/Client/LoginWithCustomID`;
    const data = {
        TitleId: titleId,
        CustomId: username,
        CreateAccount: true
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-SecretKey': secretKey
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            document.getElementById('response').innerText = `Welcome, ${username}! Your username has been registered on PlayFab.`;
        } else {
            document.getElementById('response').innerText = `Error: ${data.errorMessage}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'An error occurred. Please try again.';
    });
}