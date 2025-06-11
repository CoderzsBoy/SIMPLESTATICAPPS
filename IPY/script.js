// 4ed931585f003e
const token="4ed931585f003e"
async function getLocByIp(ip) {
    try{
        const response=await fetch(`https://ipinfo.io/${ip}/json?token=${token}`)
        if(!response.ok){
            throw new Error("Unable to Get Location....")
        }
        const data=await response.json()
        return data
    }
    catch(err){
        console.log(err)
        return { error: "Failed to fetch location data" };
    }
}
async function getLoc(){
    const ip=document.getElementById("ip").value
    data=await getLocByIp(ip)
    // console.log(data)
    const modal = document.getElementsByClassName("modal")[0];
    const closeModalBtn = document.querySelector(".close");
    modal.style.visibility="visible"
    closeModalBtn.addEventListener("click",()=>{
        modal.style.visibility="hidden"
    })
    const city=document.getElementsByTagName("p")[0]
    const country=document.getElementsByTagName("p")[1]
    const hostname=document.getElementsByTagName("p")[2]
    const timezone=document.getElementsByTagName("p")[3]
    city.innerText=`City:${data.city}`
    country.innerText=`Country:${data.country}`
    if (data.hostname !== undefined && data.hostname !== null) {
        hostname.innerText = `Hostname: ${data.hostname}`;
    }
    
    timezone.innerText=`TimeZone:${data.timezone}`
}
