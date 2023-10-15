$(document).ready(function () {
    // Función para cargar las opciones de materias en el select
    function cargarOpcionesMaterias(estudianteId) {
      var selectMaterias = $('#materia');
      selectMaterias.empty();
  
      // Obtener el historial de registro de materias para el estudiante desde el almacenamiento local
      var registrosMaterias = JSON.parse(localStorage.getItem('registrosMaterias')) || [];
  
      // Filtrar las materias registradas por el estudiante actual
      var materiasEstudiante = registrosMaterias
        .filter(function (registro) {
          return registro.idEstudiante == estudianteId;
        })
        .map(function (registro) {
          return registro.materia;
        });
  
      // Agregar las opciones de materias al select
      materiasEstudiante.forEach(function (materia) {
        selectMaterias.append(`<option value="${materia}">${materia}</option>`);
      });
  
      // Mostrar la tabla de notas
      $('#tablaNotas').show();
    }
  
    // Función para cargar y mostrar las notas en la tabla
    function cargarNotas(estudianteId) {
      var notasTable = $('#notas-table tbody');
      notasTable.empty();
  
      // Obtener el historial de registro de materias desde el almacenamiento local
      var registrosMaterias = JSON.parse(localStorage.getItem('registrosMaterias')) || [];
  
      // Filtrar los registros del estudiante actual
      var registrosEstudiante = registrosMaterias.filter(function (registro) {
        return registro.idEstudiante == estudianteId;
      });
  
      registrosEstudiante.forEach(function (registro) {
        notasTable.append(
          `<tr>
            <td>${registro.materia}</td>
            <td>${registro.nota}</td>
            <td>
              <button class="btn btn-primary btn-sm editar-nota" data-materia="${registro.materia}">Editar</button>
            </td>
          </tr>`
        );
      });
  
      // Agregar funcionalidad para editar notas
      $('.editar-nota').click(function() {
        var materia = $(this).data('materia');
        var nuevaNota = prompt(`Editar nota para ${materia}:`, 0);
        if (!isNaN(nuevaNota)) {
          // Actualizar la nota en el almacenamiento local
          registrosEstudiante.forEach(function (registro) {
            if (registro.materia === materia) {
              registro.nota = parseFloat(nuevaNota);
            }
          });
  
          // Actualizar el almacenamiento local
          localStorage.setItem('registrosMaterias', JSON.stringify(registrosMaterias));
  
          // Actualizar la tabla
          cargarNotas(estudianteId);
        }
      });
    }
  
    // Botón de búsqueda de estudiante
    $('#buscarEstudianteBtn').click(function () {
      var estudianteId = $('#estudianteId').val();
      cargarOpcionesMaterias(estudianteId);
      cargarNotas(estudianteId);
    });
  
    // Guardar nota
    $('#guardarNotaBtn').click(function () {
      var estudianteId = $('#estudianteId').val();
      var materia = $('#materia').val();
      var nota = $('#nota').val();
  
      if (estudianteId && materia && nota !== '') {
        // Obtener el historial de registro de materias desde el almacenamiento local
        var registrosMaterias = JSON.parse(localStorage.getItem('registrosMaterias')) || [];
  
        // Actualizar la nota para la materia seleccionada del estudiante
        var notaEncontrada = false;
        registrosMaterias.forEach(function (registro) {
          if (registro.idEstudiante == estudianteId && registro.materia == materia) {
            registro.nota = parseFloat(nota);
            notaEncontrada = true;
          }
        });
  
        // Si no se encontró una nota existente, agrega una nueva entrada
        if (!notaEncontrada) {
          registrosMaterias.push({
            idEstudiante: estudianteId,
            materia: materia,
            nota: parseFloat(nota)
          });
        }
  
        // Guardar el historial actualizado en el almacenamiento local
        localStorage.setItem('registrosMaterias', JSON.stringify(registrosMaterias));
  
        alert('Nota guardada correctamente.');
  
        // Limpia el formulario
        $('#seleccionar-materia-form')[0].reset();
  
        // Actualiza la tabla de notas
        cargarNotas(estudianteId);
      } else {
        alert('Por favor, complete todos los campos.');
      }
    });
  });
  