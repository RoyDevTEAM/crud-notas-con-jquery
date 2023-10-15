$(document).ready(function () {
    // Recuperar datos de estudiantes de localStorage al cargar la página
    var studentsData = JSON.parse(localStorage.getItem('studentsData')) ||  [
        { id: 1, nombre: 'John Doe', apellido: 'Smith', ci: '12345', correo: 'john@example.com' },
        { id: 2, nombre: 'Jane Smith', apellido: 'Doe', ci: '67890', correo: 'jane@example.com' },
        { id: 3, nombre: 'Alice Johnson', apellido: 'Brown', ci: '54321', correo: 'alice@example.com' },
        { id: 4, nombre: 'Bob Brown', apellido: 'Johnson', ci: '09876', correo: 'bob@example.com' },
        { id: 5, nombre: 'Eve Davis', apellido: 'Wilson', ci: '11111', correo: 'eve@example.com' }
      ];;
  
    // Variable para rastrear el estudiante actualmente en edición
    var estudianteEditando = null;
  
    // Función para cargar estudiantes en la tabla
    function cargarEstudiantes() {
      $('#students-table').empty();
      studentsData.forEach(function (student, index) {
        $('#students-table').append(
          `<tr>
            <td>${student.id}</td>
            <td>${student.nombre}</td>
            <td>${student.apellido}</td>
            <td>${student.ci}</td>
            <td>${student.correo}</td>
            <td>
              <button class="btn btn-info btn-editar" data-id="${student.id}">Editar</button>
              <button class="btn btn-danger btn-eliminar" data-id="${student.id}">Eliminar</button>
            </td>
          </tr>`
        );
      });
    }
  
    // Función para guardar datos de estudiantes en localStorage
    function guardarEstudiantesEnLocalStorage() {
      localStorage.setItem('studentsData', JSON.stringify(studentsData));
    }
  
    // Agregar o actualizar estudiante
    function agregarOActualizarEstudiante(id, nombre, apellido, ci, correo) {
      if (estudianteEditando === null) {
        // Agregar un nuevo estudiante
        var newStudent = {
          id: studentsData.length + 1,
          nombre: nombre,
          apellido: apellido,
          ci: ci,
          correo: correo
        };
        studentsData.push(newStudent);
      } else {
        // Actualizar el estudiante existente
        var student = studentsData.find(s => s.id === estudianteEditando);
        student.nombre = nombre;
        student.apellido = apellido;
        student.ci = ci;
        student.correo = correo;
        estudianteEditando = null;
      }
  
      cargarEstudiantes();
      $('#agregarEstudianteModal').modal('hide');
      // Limpia el formulario
      $('#student-form')[0].reset();
      guardarEstudiantesEnLocalStorage();
    }
  
    // Buscar estudiante por ID
    $('#buscarIdBtn').click(function () {
      var buscarId = $('#buscarIdInput').val();
      var student = studentsData.find(s => s.id === parseInt(buscarId));
  
      if (student) {
        // Mostrar el estudiante encontrado en el modal de edición
        $('#nombre').val(student.nombre);
        $('#apellido').val(student.apellido);
        $('#ci').val(student.ci);
        $('#correo').val(student.correo);
  
        estudianteEditando = student.id;
  
        $('#agregarEstudianteModal').modal('show');
      } else {
        alert('Estudiante no encontrado');
      }
    });
  
    // Agregar estudiante
    $('#agregarEstudianteBtn').click(function () {
      var nombre = $('#nombre').val();
      var apellido = $('#apellido').val();
      var ci = $('#ci').val();
      var correo = $('#correo').val();
  
      if (nombre && apellido && ci && correo) {
        agregarOActualizarEstudiante(estudianteEditando, nombre, apellido, ci, correo);
      }
    });
  
    // Editar estudiante
    $('#students-table').on('click', '.btn-editar', function () {
      estudianteEditando = $(this).data('id');
      var student = studentsData.find(s => s.id === estudianteEditando);
  
      if (student) {
        $('#nombre').val(student.nombre);
        $('#apellido').val(student.apellido);
        $('#ci').val(student.ci);
        $('#correo').val(student.correo);
  
        $('#agregarEstudianteModal').modal('show');
      }
    });
  
    // Eliminar estudiante
    $('#students-table').on('click', '.btn-eliminar', function () {
      var studentId = $(this).data('id');
      studentsData = studentsData.filter(s => s.id !== studentId);
      cargarEstudiantes();
      guardarEstudiantesEnLocalStorage();
    });
  
    // Cargar estudiantes iniciales desde localStorage
    cargarEstudiantes();
  });
  