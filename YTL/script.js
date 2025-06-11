async function fetchYouTubeVideoData(videoId) {
    const url = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${videoId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c27441b4d8mshbdaab3e75a2464ap11fef0jsn7e2103f45bd2',
            'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched API Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching video data:", error);
        return null;
    }
}

document.getElementById("videoUrl").addEventListener("input", getInfo);

async function getInfo() {
    const input = document.getElementById("videoUrl");
    const url = input.value;
    let videoId = "";

    if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    } else {
        alert("Invalid YouTube URL format");
        return;
    }

    const videoData = await fetchYouTubeVideoData(videoId);

    if (!videoData || !videoData.title || !videoData.thumbnail || !videoData.adaptiveFormats) {
        alert("Could not fetch video data. Check your API key or video ID.");
        return;
    }

    const h2 = document.querySelector("h2");
    h2.innerText = videoData.title;
    h2.hidden = false;

    const img = document.querySelector("img");
    img.src = videoData.thumbnail.at(-1).url;
    img.hidden = false;

    const qualitySelect = document.getElementById("qualitySelect");
    qualitySelect.innerHTML = "<option value=''>Select Quality</option>";

    videoData.adaptiveFormats.forEach(format => {
        const option = document.createElement("option");
        option.value = format.url;
        option.textContent = `${format.qualityLabel} - ${format.mimeType?.split(";")[0]}`;
        qualitySelect.appendChild(option);
    });

    qualitySelect.hidden = false;
}

function getDownloadLinks() {
    const selectedUrl = document.getElementById("qualitySelect").value;
    if (!selectedUrl) {
        alert("Please select a video quality!");
        return;
    }
    window.location.href = selectedUrl;
}
