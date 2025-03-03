export async function fetchJSON(url) {
    console.log(`Fetching JSON data from URL: ${url}`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched JSON data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching JSON:", error);
        throw error;
    }
}

export function shuffleArray(array) {
    console.log("Original array:", array);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Byt plats på element
    }
    console.log("Shuffled array:", array);
    return array; // Se till att returnera arrayen!
}