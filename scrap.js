// M3U Scraper for Streamian | M7 / Movian Media Center
// Author: F0R3V3R50F7
exports.Scraper = function (page, title) {
    page.loading = true;
    var results = [];
    var m3uUrl = 'https://github.com/Eagle776/LLLL/raw/main/Fr33/C1N/NUML.m3u'; // Reemplaza con tu URL M3U

    // Solicitar la lista M3U
    var m3uResponse = http.request(m3uUrl);
    var m3uData = m3uResponse.toString().split('\n');

    var searchTerm = title.toLowerCase(); // Termino de búsqueda en minúsculas

    // Procesar la lista M3U
    var currentTitle = '';
    for (var i = 0; i < m3uData.length; i++) {
        var line = m3uData[i].trim();

        if (line.startsWith('#EXTINF:')) {
            // Obtener el título de la línea
            var match = line.match(/#EXTINF:\d+,(.*)/);
            if (match) {
                currentTitle = match[1].trim();
            }
        } else if (line.startsWith('http')) {
            // Si hay un URL, comprobar si coincide con el título
            if (currentTitle.toLowerCase().includes(searchTerm)) {
                // Resaltar la coincidencia
                var highlightedTitle = currentTitle.replace(new RegExp(searchTerm, 'gi'), function(match) {
                    return match.toUpperCase(); // Resaltar en mayúsculas
                });
                results.push(highlightedTitle + " - " + line); // Formato de salida
            }
        }
    }

    // Finalizar la carga
    page.loading = false;

    if (results.length > 0) {
        return results; // Retornar resultados encontrados
    } else {
        return ["No se encontraron coincidencias en la lista M3U para " + title];
    }
};
