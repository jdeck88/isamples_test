self.addEventListener("fetch", async (event) => {
    const REQUIRED_FIELDS = [
        "materialSampleId",
        "decimalLatitude",
        "decimalLongitude",
        "institutionCode",
        "sampleEnteredBy",
        "rights"
    ];

    event.respondWith(
        new Promise(async (resolve) => {
            try {
                const request = event.request;

                if (request.method !== "POST") {
                    resolve(new Response(JSON.stringify({ status: "error", message: "Only POST allowed" }), {
                        headers: { "Content-Type": "application/json" },
                        status: 405
                    }));
                    return;
                }

                const data = await request.json();
                let filledFields = REQUIRED_FIELDS.filter((field) => data[field]);

                let response;
                if (filledFields.length === 0) {
                    response = { status: "invalid", message: "Invalid data, no required fields filled." };
                } else if (filledFields.length === REQUIRED_FIELDS.length) {
                    response = { 
                        status: "blue-ribbon", 
                        message: "Congratulations! You have filled all required fields.",
                        ribbon: "https://example.com/blue-ribbon.png"
                    };
                } else if (filledFields.length >= 3) {
                    response = { 
                        status: "red-ribbon", 
                        message: "You have filled at least three required fields.",
                        ribbon: "https://example.com/red-ribbon.png"
                    };
                } else {
                    response = { status: "invalid", message: "Not enough fields filled." };
                }

                resolve(new Response(JSON.stringify(response), {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                }));
            } catch (error) {
                resolve(new Response(JSON.stringify({ status: "error", message: "Invalid JSON" }), {
                    headers: { "Content-Type": "application/json" },
                    status: 400
                }));
            }
        })
    );
});
