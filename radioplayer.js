// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>

// Steg 1. en fetch till API:t
fetch("https://api.sr.se/api/v2/channels/?format=json")
  .then((response) => response.json())
  .then((data) => {
    // Steg 2. loopa över data.channels med forEach
    const channelsContainer = document.getElementById("channels");
    data.channels.forEach((channel) => {
      // Skapa element för varje kanal
      const channelElement = document.createElement("div");
      channelElement.className = "channel";

      // Lägg till kanalens namn
      const nameElement = document.createElement("h2");
      nameElement.textContent = channel.name;
      channelElement.appendChild(nameElement);

      // Steg 3. Lägg till en audio tagg med liveaudio.url
      if (channel.liveaudio && channel.liveaudio.url) {
        const audioElement = document.createElement("audio");
        audioElement.controls = true;

        const sourceElement = document.createElement("source");
        sourceElement.src = channel.liveaudio.url;
        sourceElement.type = "audio/mpeg";

        audioElement.appendChild(sourceElement);
        channelElement.appendChild(audioElement);
      }

      // Lägg till kanalelementet i containern
      channelsContainer.appendChild(channelElement);
    });
  })
  .catch((error) => {
    console.error("Fel vid hämtning av kanaler:", error);
  });
