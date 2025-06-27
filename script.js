const chatWindow = document.getElementById('chat-window');

function appendMessage(sender, text) {
  const bubble = document.createElement('div');
  bubble.className = `bubble ${sender}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function submitAnswer(answer) {
  appendMessage('user', answer);

  fetch('/answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answer })
  })
  .then(response => response.json())
  .then(data => {
    appendMessage('ai', data.message);
  })
  .catch(error => {
    console.error('Error:', error);
    appendMessage('ai', 'Error contacting the server.');
  });
}

fetch('/start')
  .then(response => response.json())
  .then(data => {
    appendMessage('ai', data.message);
  });

function toggleFullScreen() {
  const app = document.getElementById('app');
  if (!document.fullscreenElement) {
    app.requestFullscreen().catch(err => {
      alert(`Error attempting full-screen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}
