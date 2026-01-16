const messages = [
    { type: "text", content: "[SYSTEM]: Connection stable. Monitoring feed... hsbfhsrfjgrjhtrkghtrhkt   hbhchvfergfuiershgutrhit nvcghsvrfyuerughhititf" },
    { type: "text", content: "User 'Ghost' has joined the channel. hbfkergfugruighoijtrrogjotr  bfvjhbgfiuthrgi jdbvjhdfdugirujgrtfjhbgl" },
    { type: "text", content: "[SYSTEM]: Incoming packet from Node 255..." },

    {
        type: "image",
        content: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"
    },

    { type: "text", content: "User 'Ghost' has joined the channel. hbfkergfugruighoijtrrogjotr  bfvjhbgfiuthrgi jdbvjhdfdugirujgrtfjhbgl" },
    { type: "text", content: "[SYSTEM]: Incoming packet from Node 255..." },

    { type: "text", content: "[ALERT]: Buffer overflow in satellite uplink." },
    { type: "text", content: "User 'Ghost' has joined the channel." },

    {
        type: "image",
        content: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
    },

    { type: "text", content: "User 'Ghost' has joined the channel. hbfkergfugruighoijtrrogjotr  bfvjhbgfiuthrgi jdbvjhdfdugirujgrtfjhbgl" },
    { type: "text", content: "[SYSTEM]: Incoming packet from Node 255..." },

    { type: "text", content: "[SYSTEM]: Signal integrity compromised." },
    { type: "text", content: "[WARNING]: Unauthorized echo detected." }
];

const chatBody = document.getElementById("chatBody");
let index = 0;

function showNextMessage() {
    if (index >= messages.length) return;

    const msgData = messages[index];
    const msgDiv = document.createElement("div");

    msgDiv.classList.add("message");
    msgDiv.classList.add(index % 2 === 0 ? "left" : "right");

    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    if (msgData.type === "text") {
        msgDiv.textContent = msgData.content;
        index++;
        setTimeout(showNextMessage, 900);
    }

    if (msgData.type === "image") {
        const img = document.createElement("img");
        img.src = msgData.content;
        msgDiv.appendChild(img);
        index++;
        setTimeout(showNextMessage, 1400);
    }
}

showNextMessage();
