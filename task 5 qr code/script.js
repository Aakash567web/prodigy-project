document.addEventListener('DOMContentLoaded', (event) => {
    const resultElement = document.getElementById('result');
    const openLinkButton = document.getElementById('openLink');
    const qrCodeReader = document.getElementById('reader');

    let html5QrCode;

    function onScanSuccess(decodedText, decodedResult) {
        console.log(QR Code detected: ${decodedText}, decodedResult);
        resultElement.textContent = decodedText;

        // Check if the decoded text is a URL
        try {
            const url = new URL(decodedText);
            if (url.protocol === 'http:' || url.protocol === 'https:') {
                openLinkButton.href = decodedText;
                openLinkButton.style.display = 'inline-block'; // Show the button
            } else {
                openLinkButton.style.display = 'none'; // Hide if not a valid URL
            }
        } catch (e) {
            // Not a valid URL, hide the button
            openLinkButton.style.display = 'none';
        }

        // Optionally, stop scanning after a successful scan
        if (html5QrCode && html5QrCode.isScanning) {
            html5QrCode.stop().then((ignore) => {
                console.log("QR Code scanning stopped.");
            }).catch((err) => {
                console.error("Failed to stop QR Code scanning.", err);
            });
        }
    }

    function onScanFailure(error) {
        // console.warn(QR Code scan error: ${error}); // Too noisy for console
        // resultElement.textContent = "Scanning..."; // Or provide a more specific message
        openLinkButton.style.display = 'none'; // Hide the button on scan failure
    }

    // Function to start the QR code scanner
    function startScanner() {
        // Create an instance of the Html5QrcodeScanner
        html5QrCode = new Html5Qrcode("reader");

        html5QrCode.start(
            { facingMode: "environment" }, // Prefer rear camera
            {
                fps: 10,    // frames per second to scan QR code
                qrbox: { width: 250, height: 250 } // confine the scanning area
            },
            onScanSuccess,
            onScanFailure
        ).catch((err) => {
            console.error(Unable to start scanning: ${err});
            resultElement.textContent = Error starting camera: ${err.message || err};
            openLinkButton.style.display = 'none';
        });
    }

    // Initial state: start scanning when the page loads
    startScanner();

    // You might want to add a button to restart scanning if it was stopped
    // Or automatically restart after a certain time if no QR code is found
});