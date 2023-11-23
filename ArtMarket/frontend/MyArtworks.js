document.addEventListener("DOMContentLoaded", function () {
    displayArtworks();
    setupBackButton();
});

function displayArtworks() {
    const artworksContainer = document.getElementById("artworks-container");
    const sellerid = encodeURIComponent(sessionStorage.getItem('userId'));

    // Fetch artworks from the server
    fetch(`http://localhost:5000/artworks/viewartwork/${sellerid}`)
        .then(response => response.json())
        .then(artworks => {
            console.log(artworks)
            artworks.forEach(artwork => {
                const artworkDiv = document.createElement("div");
                artworkDiv.classList.add("artwork");
        
                const artworkName = document.createElement("div");
                artworkName.innerText = `Artwork: ${artwork.name}`;
                artworkDiv.appendChild(artworkName);

                artwork.images.forEach(imageURL => {
                    const image = document.createElement("img");
                    image.src = imageURL;
                    artworkDiv.appendChild(image);
                });

                const artworkInfo = document.createElement("div");
                artworkInfo.classList.add("artwork-info");

                const bidButton = document.createElement("button");
                bidButton.innerText = "View highest bid";
                bidButton.classList.add("button", "bid-button");
                // Add click event listener for edit functionality
                bidButton.addEventListener("click", () => viewHighestBid(artwork.id));

                const statusLabel = document.createElement("div");
                statusLabel.innerText = `Status: ${artwork.active === 1 ? "Open" : "Closed"}`;
                statusLabel.classList.add("status-label");

                artworkInfo.appendChild(bidButton);
                artworkInfo.appendChild(statusLabel);

                artworkDiv.appendChild(artworkInfo);
                artworksContainer.appendChild(artworkDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching artworks:", error);
        });
}


function setupBackButton() {
    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", () => {
        console.log('back')
        history.back() 
    });
}

function viewHighestBid(artworkId) {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    const popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    const highestBidLabel = document.createElement("div");
    highestBidLabel.innerText = "Highest Bid: R1000"; 
    popupContent.appendChild(highestBidLabel);

    const acceptBidButton = document.createElement("button");
    acceptBidButton.innerText = "Accept Bid";
    acceptBidButton.addEventListener("click", () => handleAcceptBid(artworkId));
    popupContent.appendChild(acceptBidButton);

    const closeBidButton = document.createElement("button");
    closeBidButton.innerText = "Close Bid";
    closeBidButton.addEventListener("click", () => handleCloseBid(artworkId));
    popupContent.appendChild(closeBidButton);

    const exitButton = document.createElement("button");
    exitButton.innerText = "Exit";
    exitButton.addEventListener("click", () => {
        document.body.removeChild(popup);
    });
    popupContent.appendChild(exitButton);

    popup.appendChild(popupContent);
    document.body.appendChild(popup);
}

function handleAcceptBid(artworkId) {
    console.log(`Accepting bid for artwork with ID ${artworkId}`);
    alert("Bid accepted successfully!");
}

function handleCloseBid(artworkId) {
    console.log(`Closing bid for artwork with ID ${artworkId}`);
    alert("Bid closed successfully!");
}
