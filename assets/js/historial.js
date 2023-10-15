$(document).ready(function () {
    // Función para cargar el historial de registro de un estudiante por su ID
    function cargarHistorialEstudiante(idEstudiante) {
        var registrosMaterias = JSON.parse(localStorage.getItem('registrosMaterias')) || [];

        // Filtrar los registros para encontrar los del estudiante con el ID proporcionado
        var registrosEstudiante = registrosMaterias.filter(function (registro) {
            return registro.idEstudiante == idEstudiante;
        });

        // Limpiar la tabla
        $('#historial-table tbody').empty();

        if (registrosEstudiante.length > 0) {
            registrosEstudiante.forEach(function (registro) {
                $('#historial-table tbody').append(
                    `<tr>
                        <td>${registro.materia}</td>
                        <td>${registro.nota}</td>
                    </tr>`
                );
            });
        } else {
            $('#historial-table tbody').append(
                `<tr>
                    <td colspan="2">No se encontraron registros para este estudiante.</td>
                </tr>`
            );
        }
    }

    // Función para calcular el promedio de las notas
    function calcularPromedio(idEstudiante) {
        var registrosMaterias = JSON.parse(localStorage.getItem('registrosMaterias')) || [];

        // Filtrar los registros del estudiante con el ID proporcionado
        var registrosEstudiante = registrosMaterias.filter(function (registro) {
            return registro.idEstudiante == idEstudiante;
        });

        if (registrosEstudiante.length > 0) {
            var totalNotas = 0;
            registrosEstudiante.forEach(function (registro) {
                totalNotas += registro.nota;
            });

            var promedio = totalNotas / registrosEstudiante.length;

            // Mostrar el mensaje del promedio en el elemento <p>
            var mensajePromedio = '';
            if (promedio > 65) {
                mensajePromedio = `¡Felicidades! El promedio es ${promedio.toFixed(2)}. Sigue asi.`;
            } else {
                mensajePromedio = `Debes mejorar. Echa ganas para subir tu promedio. (Promedio: ${promedio.toFixed(2)})`;
            }

            $('#mensajePromedio').text(mensajePromedio);
        } else {
            $('#mensajePromedio').text('No hay registros de notas para calcular el promedio.');
        }
    }

    // Manejar el clic en el botón "Calcular Promedio"
    $('#calcularPromedioBtn').click(function () {
        var idEstudiante = $('#buscarEstudianteId').val();
        calcularPromedio(idEstudiante);
    });

    // Buscar estudiante por ID
    $('#buscarEstudianteBtn').click(function () {
        var idEstudiante = $('#buscarEstudianteId').val();
        cargarHistorialEstudiante(idEstudiante);
    });
    
});
