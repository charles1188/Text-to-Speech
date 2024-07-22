document.addEventListener('DOMContentLoaded', () => {

    // Get references to the necessary HTML elements
    const submitBtn = document.getElementById('submitBtn');
    const textArea = document.getElementById('text');
    const voiceSelect = document.getElementById('voiceId');
    const messageDiv = document.getElementById('message');
    const audioPlayer = document.getElementById('audioPlayer');

    // Add a click event listener to the submit button
    submitBtn.addEventListener('click', async () => {
        const text = textArea.value.trim();
        const voiceId = voiceSelect.value;

        // Check if the text area is empty and show a message if it is
        if (!text) {
            messageDiv.textContent = 'Please enter some text.';
            return;
        }

        if (!voiceId) {
            messageDiv.textContent = 'Please select a voice.';
            return;
        }

        // Show a message indicating that speech generation is in progress
        messageDiv.textContent = 'Generating speech...';

        // Make a POST request to the Eleven Labs API to generate speech
        try {
            const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/nPczCjzI2devNBz1zQrb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': 'sk_af65cc02ff24c3e9c18d6387c705c71351c7f0c1abf15b5d'
                },
                body: JSON.stringify({
                    text: text,
                    voice: voiceId
                })
            });

            // If the response is successful, process the audio
            if (response.ok) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                audioPlayer.src = audioUrl;
                audioPlayer.load();
                audioPlayer.play();
                messageDiv.textContent = 'Speech generated successfully.';
            } else {
                console.error('Error generating audio:', response.statusText);
                // Show an error message to the user
                messageDiv.textContent = `Failed to generate speech: ${response.statusText}`;
            }
            // Catch and display any errors that occur during the fetch operation
        } catch (error) {
            messageDiv.textContent = `Failed to generate speech: ${error.message}`;
        }
    });
});

