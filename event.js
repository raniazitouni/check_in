// sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// start
document.addEventListener("DOMContentLoaded", function () { 
    let previous = null;
    // If found you qr code 
    function onScanSuccess(decodeText, decodeResult) {
        if (decodeText == previous)
        {
            return;
        }
        // reset
        document.querySelector('#nom').innerText = '';
        document.querySelector('#prenom').innerText = '';
        document.querySelector('#etat').innerText = '';

        let result = decodeText.toString().split(" ");
        let i = 0;
        result.forEach(word => {
            if (i == 0)
            {
                document.querySelector('#nom').innerText = word;
            }
            else
            {
                document.querySelector('#prenom').innerText = document.querySelector('#prenom').innerText + ' ' + word;
            }
            i = 1;
        });
        document.querySelector('#etat').innerText = 'Succes !';
        document.querySelector('#etat').style.color = 'var(--vert)';

        previous = decodeText;
        // alert("You Qr is : " + decodeText, decodeResult);
        // result.innerText = decodeText;

        // delete
        // document.querySelector('#html5-qrcode-button-camera-stop').click();
    } 
  
    let htmlscanner = new Html5QrcodeScanner( 
        "my-qr-reader", 
        { fps: 10, qrbos: 250 } 
    ); 


    // scan
    document.querySelector('#scan-button').addEventListener('click', async function () {
        htmlscanner.render(onScanSuccess);
        document.querySelector('.section').style.display = 'block';
        
        let check1 = false;
        let check2 = false;
        while (!check1 || !check2)
        {
            // button
            let butt = document.querySelector('#html5-qrcode-button-camera-stop');
            if (butt && !check1)
            {
                // butt.style.backgroundColor = 'violet';
                butt.addEventListener('click', () => {
                    htmlscanner.clear();
                    document.querySelector('.section').style.display = 'none';
                    // class to container back to normal (pour l'image de chargement au prochain lancement)
                    document.querySelector('#my-qr-reader').style.display = 'block';
                })
                check1 = true;
            }

            // after video loaded
            let vid = document.querySelector('video');
            if (vid && !check2)
            {
                // class to container
                document.querySelector('#my-qr-reader').style.display = 'flex';

                // class to scan container
                document.querySelector('#my-qr-reader__scan_region').classList.add('vid-container');

                // class to button container
                document.querySelector('#my-qr-reader__dashboard').style.backgroundColor = 'var(--beige)';


                // insert child 'result'
                let child = document.createElement('div');
                child.id = 'qr-result-container';
                child.innerHTML = `
                    <h3>Résultat :</h3>
                    <div id="qr-result">
                        <p id="nom-p">Nom : <span id="nom"></span></p>
                        <p id="prenom-p">Prénom : <span id="prenom"></span></p>
                        <p id="etat-p">État : <span id="etat"></span></p>
                    </div>
                `;
                let div = document.querySelector('#my-qr-reader__dashboard');
                div.prepend(child);
                check2 = true;
            }

            await sleep(200);
        }
    });
});