document.getElementById('submit-btn').addEventListener('click', function() {
    const username = document.getElementById('username-input').value;
    if (username) {
        sendUsernameToPlayFab(username);
    }
});

function sendUsernameToPlayFab(username) {
    const titleId = 'E5EAA';
    const secretKey = 'HDC9RMFU6YYAN4WY7D7ZGM1SSZMFAEKMPPWZD97BZUG3NG1KMX';

    const url = `https://${titleId}.playfabapi.com/Client/LoginWithCustomID?sdk=JavaScriptSDK`;
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
