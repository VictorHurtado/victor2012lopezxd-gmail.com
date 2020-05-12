import 'package:http/http.dart' as http;
class SendReptilesResponsesAPI {

   Future<http.Response> sendReptilesResponsesApi(String resp)async{
    String url= "http://192.168.0.15:4000/api/reptiles/analyzeReptiles";
  
    http.Response respHttp= await http.post(url,body:{"myResponses":resp});
     if (respHttp.statusCode == 200) {
      // Si la llamada al servidor fue exitosa, analiza el JSON
       return respHttp;
     } else {
      // Si la llamada no fue exitosa, lanza un error.
      throw Exception('Failed to load post');
     }
    
  }
}