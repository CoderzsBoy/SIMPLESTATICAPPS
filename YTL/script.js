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
        console.log("Fetched API Data:", data); // Debug log
        return data;
      } catch (error) {
        console.error("Error fetching video data:", error);
        return null;
      }
    }

    document.querySelector("input").addEventListener("input", getInfo);

    async function getInfo() {
      let yt_url = document.querySelector("input").value;
      if (!yt_url.includes("v=")) {
        alert("Please enter a valid YouTube URL");
        return;
      }

      let videoId = yt_url.split("v=")[1].split("&")[0];
      let videoData = await fetchYouTubeVideoData(videoId);

      if (!videoData || !videoData.title || !videoData.thumbnail || !videoData.adaptiveFormats) {
        alert("Failed to fetch video data. Maybe the video is restricted or the ID is wrong.");
        return;
      }

      // Title & Thumbnail
      document.querySelector("h2").innerText = videoData.title;
      document.querySelector("h2").hidden = false;

      document.querySelector("img").src = videoData.thumbnail[videoData.thumbnail.length - 1].url;
      document.querySelector("img").hidden = false;

      // Video Formats
      let formats = videoData.adaptiveFormats.map(format => ({
        qualityLabel: format.qualityLabel || "Unknown Quality",
        mimeType: format.mimeType?.split(";")[0] || "Unknown Format",
        url: format.url
      }));

      let qualityDropdown = document.getElementById("qualitySelect");
      qualityDropdown.innerHTML = ""; // Clear previous options

      formats.forEach(format => {
        let option = document.createElement("option");
        option.value = format.url;
        option.textContent = `${format.qualityLabel} - ${format.mimeType}`;
        qualityDropdown.appendChild(option);
      });

      qualityDropdown.hidden = false;
    }

    function getDownloadLinks() {
      let selectedUrl = document.getElementById("qualitySelect").value;
      if (!selectedUrl) {
        alert("Please select a video quality!");
        return;
      }
      window.location.href = selectedUrl;
    }
