document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.querySelector(".input__field");
    const chicoImage = document.querySelector(".chico");
    const titleNoResult = document.querySelector(".title__noresult");
    const textNoResult = document.querySelector(".text__noresult");
    const outputSection = document.querySelector(".output__section");
    let copyButton = null;

    const mappings = [
        { letter: 'e', replacement: 'enter' },
        { letter: 'i', replacement: 'imes' },
        { letter: 'a', replacement: 'ai' },
        { letter: 'o', replacement: 'ober' },
        { letter: 'u', replacement: 'ufat' }
    ];

    const transformText = (text, encrypt = true) => {
        return mappings.reduce((acc, { letter, replacement }) => {
            const [from, to] = encrypt ? [letter, replacement] : [replacement, letter];
            const regex = new RegExp(from, "g");
            return acc.replace(regex, to);
        }, text);
    };

    const toggleVisibility = (visible) => {
        chicoImage.style.display = visible ? "block" : "none";
        titleNoResult.style.display = visible ? "block" : "none";
        textNoResult.style.display = visible ? "block" : "none";
    };

    const handleEncryptDecrypt = (event, encrypt) => {
        event.preventDefault();
        const inputText = inputField.value.trim();

        if (inputText.length === 0) {
            toggleVisibility(true);
            if (copyButton) {
                copyButton.remove();
                copyButton = null;
            }
            outputSection.textContent = '';
        } else {
            const resultText = transformText(inputText, encrypt);
            outputSection.innerHTML = `<p class="output__result">${resultText}</p>`;

            if (!copyButton) {
                copyButton = document.createElement("button");
                copyButton.textContent = "Copy";
                copyButton.className = encrypt ? "encrypt__button" : "decrypt__button";
                copyButton.addEventListener("click", () => {
                    navigator.clipboard.writeText(resultText);
                    alert("Text copied to clipboard");
                });
                outputSection.appendChild(copyButton);
            }

            toggleVisibility(false);
        }
    };

    document.querySelector(".encrypt__button").addEventListener("click", (event) => handleEncryptDecrypt(event, true));
    document.querySelector(".decrypt__button").addEventListener("click", (event) => handleEncryptDecrypt(event, false));

    inputField.addEventListener("input", () => {
        if (inputField.value.trim().length === 0) {
            toggleVisibility(true);
            if (copyButton) {
                copyButton.remove();
                copyButton = null;
            }
            outputSection.textContent = '';
        }
    });
});
