// Pegá este código en script.google.com (Proyecto nuevo > borrar el contenido de
// Code.gs de ejemplo > pegar esto). Instrucciones completas de deploy al final
// del chat con Claude.

// 1) Cambiá esto por una clave inventada por vos, única.
var SHARED_KEY = 'B0dA-LuC!A_AgU$T1N#2026!x7Qm';

// 2) Pegá acá el ID de la carpeta de Drive donde quieren que caigan las fotos.
//    Lo sacás de la URL de la carpeta:
//    https://drive.google.com/drive/folders/ESTE_ES_EL_ID
var FOLDER_ID = '1jIWr13zQx-IxErAWDSL0pAHFOxmESvTh';

function doGet(e) {
  return jsonOutput({ ok: true, mensaje: 'El endpoint de fotos está funcionando. Usá POST para subir.' });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOutput({ error: 'bad_request' });
  }

  if (body.key !== SHARED_KEY) {
    return jsonOutput({ error: 'unauthorized' });
  }

  if (!body.fileName) {
    return jsonOutput({ error: 'missing_filename' });
  }

  var token = ScriptApp.getOAuthToken();

  var initResponse = UrlFetchApp.fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',
    {
      method: 'post',
      contentType: 'application/json',
      headers: {
        Authorization: 'Bearer ' + token,
        'X-Upload-Content-Type': body.mimeType || 'application/octet-stream',
      },
      payload: JSON.stringify({
        name: body.fileName,
        parents: [FOLDER_ID],
      }),
      muteHttpExceptions: true,
    }
  );

  if (initResponse.getResponseCode() !== 200) {
    return jsonOutput({
      error: 'init_failed',
      detail: initResponse.getContentText(),
    });
  }

  var headers = initResponse.getHeaders();
  var uploadUrl = headers['Location'] || headers['location'];

  if (!uploadUrl) {
    return jsonOutput({ error: 'no_upload_url' });
  }

  return jsonOutput({ uploadUrl: uploadUrl, token: token });
}

function jsonOutput(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
