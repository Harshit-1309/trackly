const fetch = require("node-fetch");

async function test() {
    try {
        const res = await fetch("http://localhost:3001/api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "Test Project",
                customer: "",
                hours: ""
            })
        });
        const data = await res.json();
        console.log("Status:", res.status);
        console.log("Data:", data);
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}
test();
