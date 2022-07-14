const h2 = document.getElementById('showId');

async function getId() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const accounts = await provider.send('eth_requestAccounts', []);
    const walletAddress = ethers.utils.getAddress(accounts[0]);
    const searchParams = new URLSearchParams({
        account: walletAddress
    });

    fetch(`${window.location.origin}/getId?${searchParams}`)
        .then(async res => {
            const jsonResponse = await res.json();
            if (jsonResponse.error) {
                return alert(jsonResponse.error);
            }

            h2.innerHTML = 'Id: ' + jsonResponse.id;
        })
        .catch(error => {
            alert(error);
        });
}
