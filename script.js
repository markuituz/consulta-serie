function buscarEquipo() {
  document.getElementById("cargando").style.display = "block";


  var serie = document.getElementById("serie").value.toUpperCase();
  var url =  "https://github.com/markuituz/consulta-serie/main/contrato.xlsx";


  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "arraybuffer";

  xhr.onload = function() {
      var data = new Uint8Array(xhr.response);
      var workbook = XLSX.read(data, { type: "array", range: "A2:F26900" });

    
      var sheetName = workbook.SheetNames[0];
      var sheet = workbook.Sheets[sheetName];

    
      var jsonData = XLSX.utils.sheet_to_json(sheet);
      var equipoEncontrado = jsonData.find(function(item) {
          return item.Serie === serie;
      });

    
      var resultadoDiv = document.getElementById("resultado");
      resultadoDiv.innerHTML = "";

      if (equipoEncontrado) {
          var tableHTML = "<table>";
          tableHTML += "<tr><th>Tribunal</th><th>Tipo</th><th>Subtipo de equipo</th><th>Marca - Modelo</th><th>Contrato</th></tr>";
          tableHTML += "<tr>";
          tableHTML += "<td>" + (equipoEncontrado.Tribunal || "") + "</td>";
          tableHTML += "<td>" + (equipoEncontrado.Tipo || "") + "</td>"; 
          tableHTML += "<td>" + (equipoEncontrado["Subtipo de equipo"] || "") + "</td>"; 
          tableHTML += "<td>" + (equipoEncontrado["Marca - Modelo"] || "") + "</td>"; 
          tableHTML += "<td>" + (equipoEncontrado.Contrato || "") + "</td>"; 
          tableHTML += "</tr>";
          tableHTML += "</table>";
          resultadoDiv.innerHTML = tableHTML;
      } else {
          resultadoDiv.innerHTML = "Equipo no encontrado";
      }

  
      document.getElementById("cargando").style.display = "none";
  };

  xhr.send();
}
