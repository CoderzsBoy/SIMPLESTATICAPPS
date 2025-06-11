async function fetchYouTubeVideoData(videoId) {
    const url = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${videoId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '7537dfeec0msh0cc9f1782213e19p129432jsn19cbff316221', // Replace with your actual API key
            'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse response as JSON

        return data;
    } catch (error) {
        console.error("Error fetching video data:", error);
        return null;
    }
}

// // Example usage:
// fetchYouTubeVideoData("ENdskne1RDs").then(videoData => {
//     if (videoData) {
//         console.log("Video Data:", videoData);
//     } else {
//         console.log("Failed to fetch video data.");
//     }
// });
// #https://www.youtube.com/watch?v=VIDEO_ID
function getDownloadLinks(){
    let selectedUrl = document.getElementById("qualitySelect").value;
    
    if (!selectedUrl) {
        alert("Please select a video quality!");
        return;
    }
    window.location.href = selectedUrl;
}
document.querySelector("input").addEventListener("input",getInfo)
async function getInfo(){
    let videoId;
    let yt_url=document.querySelector("input").value
    if(yt_url.includes("v=")){
        videoId=yt_url.split("v=")[1].split("&")[0]
    }
    let videoData=await fetchYouTubeVideoData(videoId)
    let vid_title=videoData.title
    let vid_thumbnail=videoData.thumbnail.at(-1).url
    title=document.querySelector("h2")
    title.innerText=vid_title
    title.hidden=false
    image=document.querySelector("img")
    image.src=vid_thumbnail
    image.hidden=false
    let durl=videoData.adaptiveFormats
    let formats = durl.map(format => ({
        qualityLabel: format.qualityLabel,
        mimeType: format.mimeType.split(";")[0], // Extracting only MIME type
        url: format.url
    }));
    console.log(formats)
    let qualityDropdown = document.getElementById("qualitySelect");
    qualityDropdown.innerHTML = "";
    formats.forEach(format => {
        let option = document.createElement("option");
        option.value = format.url; // Set URL as value
        option.textContent = `${format.qualityLabel} - ${format.mimeType}`; // Display quality & format
        qualityDropdown.appendChild(option);
    });
    qualityDropdown.hidden = false;
}