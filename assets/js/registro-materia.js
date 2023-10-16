$(document).ready(function () {
   
  

    // Función para cargar las opciones de materias en el select
    function cargarOpcionesMaterias() {
      var selectMaterias = $('#materia');
      selectMaterias.empty();
      materiasData.forEach(function (materia) {
        selectMaterias.append(`<option value="${materia.nombre}">${materia.nombre}</option>`);
      });
    }

    
    // Buscar estudiante por ID
    $('#buscarEstudianteBtn').click(function () {
      var idEstudiante = $('#buscarEstudianteId').val();
      var estudiante = estudiantesData.find(est => est.id == idEstudiante);
      if (estudiante) {
        $('#nombreEstudiante').val(estudiante.nombre);
        $('#idEstudiante').val(estudiante.id);
        $('#registroMateriaModal').modal('show');
        cargarOpcionesMaterias();
      } else {
        alert('Estudiante no encontrado');
      }
    });

    // Registrar materia
    $('#registrarMateriaBtn').click(function () {
      var idEstudiante = $('#idEstudiante').val();
      var nombreEstudiante = $('#nombreEstudiante').val();
      var materia = $('#materia').val();
      if (idEstudiante && nombreEstudiante && materia) {
        var url = `comprobante.html?id=${idEstudiante}&nombre=${nombreEstudiante}&materia=${materia}`;
        window.location.href = url;
      }
    });
});
