document.addEventListener('DOMContentLoaded', function() {
    console.log(`
███████████████████████████
███████▀▀▀░░░░░░░▀▀▀███████
████▀░░░░░░░░░░░░░░░░░▀████
███│░░░░░░░░░░░░░░░░░░░│███
██▌│░░░░░░░░░░░░░░░░░░░│▐██
██░└┐░░░░░░░░░░░░░░░░░┌┘░██
██░░└┐░░░░░░░░░░░░░░░┌┘░░██
██░░┌┘▄▄▄▄▄░░░░░▄▄▄▄▄└┐░░██
██▌░│██████▌░░░▐██████│░▐██
███░│▐███▀▀░░▄░░▀▀███▌│░███
██▀─┘░░░░░░░▐█▌░░░░░░░└─▀██
██▄░░░▄▄▄▓░░▀█▀░░▓▄▄▄░░░▄██
████▄─┘██▌░░░░░░░▐██└─▄████
█████░░▐█─┬┬┬┬┬┬┬─█▌░░█████
████▌░░░▀┬┼┼┼┼┼┼┼┬▀░░░▐████
█████▄░░░└┴┴┴┴┴┴┴┘░░░▄█████
███████▄░░░░░░░░░░░▄███████
██████████▄▄▄▄▄▄▄██████████
███████████████████████████
    `);

    fetch('/habits/data')
        .then(response => {
            console.log('Fetch response:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data for heatmap:', data);

            if (typeof CalHeatMap === 'undefined') {
                console.error('CalHeatMap is not defined');
                return;
            }

            const cal = new CalHeatMap();
            cal.init({
                itemSelector: "#habitHeatmap",
                domain: "month",
                subDomain: "day",
                data: data,
                start: new Date(),
                cellSize: 20,
                range: 3,
                legend: [1, 2, 3, 4],
                itemName: ["habit", "habits"],
                legendColors: {
                    min: "#efefef",
                    max: "steelblue"
                },
                onClick: function(date, nb) {
                    alert("Date: " + date + " Number of habits: " + nb);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});