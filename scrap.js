exports.Scrape = function (page, title) {
    page.loading = true;

    // Aquí iría el código para obtener la lista M3U.
    var m3uUrl = "https://bit.ly/3VUxv99"; // Cambia por la URL real
    var m3uContent = http.request(m3uUrl).toString().split('\n');

    var results = [];
    var currentTitle = '';

    for (var i = 0; i < m3uContent.length; i++) {
        var line = m3uContent[i].trim();

        // Verifica si la línea es una definición de canal
        if (line.startsWith('#EXTINF')) {
            var match = line.match(/#EXTINF:.*,(.*)/);
            if (match) {
                currentTitle = match[1].trim(); // Título del canal
            }
        } else if (line.startsWith('http')) {
            // Esta es la URL de streaming
            if (currentTitle.toLowerCase().includes(title.toLowerCase())) {
                // Si hay coincidencia con el título buscado
                var streamUrl = line;
                var item = streamUrl + " - " + "Unknown" + " - " + "0"; // Puedes ajustar los datos según sea necesario
                results.push(item);
            }
        }
    }

    page.loading = false;
    return results;
};
