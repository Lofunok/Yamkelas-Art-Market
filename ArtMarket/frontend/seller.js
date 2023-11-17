function submitArtwork(e){

    e.preventDefault();
    // Get the file input element
    const artworkImageInput = document.getElementById('artworkImage');
    let name = document.getElementById("artworkName").value;
    let description = document.getElementById("artworkDescription").value;
    let category = document.getElementById("artworkCategory").value;
    let closeDate = document.getElementById("closeDate").value
    let sellingOption = document.getElementById("selling");
    let priceInput = document.getElementById("artworkPrice");
    let active = 0;
    

    let sellerid = 7;

    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth()) + 1;
    let day = currentDate.getDate();

    let Listed = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    console.log(Listed)

    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    let timeListed = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0': '') + seconds;

    if (sellingOption.checked){
        active = 1;
        priceInput = priceInput.value || 0;

    } else {
        priceInput = 0;
    }

    priceInput = parseFloat(priceInput);


    // Get the selected file
    const selectedFile = artworkImageInput.files[0];

    // Check if a file is selected
    if (selectedFile) {
        // Log file details
        console.log('File Name:', selectedFile.name);
        console.log('File Size:', selectedFile.size, 'bytes');
        console.log('File Type:', selectedFile.type);

        // You can also create a FormData object to append the file for sending to the server
        const formData = new FormData();
        formData.append('artworkImage', selectedFile);
        formData.append('artworkName', name);
        formData.append('description', description);
        formData.append('catagories', category);
        formData.append('sellerid', sellerid);
        formData.append('dateListed', Listed);
        formData.append('timeListed', timeListed);
        formData.append('scheduledcloseDate', closeDate);
        formData.append('active', active);
        formData.append('buyNowPrice', priceInput);

        fetch("http://localhost:5000/artworks/create",{
            method: 'POST',
            body:formData
        });

    } else {
        console.log('No file selected.');
    }

}
document.getElementById("seller").addEventListener("submit", submitArtwork);

document.addEventListener("DOMContentLoaded", function () {
    var sellingOption = document.getElementById("selling");
    var biddingOption = document.getElementById("bidding");
    var priceInput = document.querySelector(".price-input");

    function updatePriceInputVisibility() {
        priceInput.style.display = sellingOption.checked ? "block" : "none";
    }

    // Initial setup
    updatePriceInputVisibility();

    sellingOption.addEventListener("change", updatePriceInputVisibility);
    biddingOption.addEventListener("change", updatePriceInputVisibility);
});