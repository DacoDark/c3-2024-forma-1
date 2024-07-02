import request from 'supertest'
import { server, app } from '../../../src/index'

/**
 * El objetivo de este test de integración es probar
 * el endpoint para evaluar si la aplicación responde
 */
describe('GET /health', () => {
    afterAll(() => {
        server.close()
    })

    test('should respond ok message', async () => {
        const response = await request(app.callback()).get('/health')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'ok' })
    })
})

/** 
TEST 1
Cuando: realice una solicitud a /api/cities/by_country/:country, tomando en cuenta que :country es un string de largo >= 3, con caracteres compuestos por solo letras y encuentre resultados, independiente del case de :country
Entonces: debe devolver un status 200 y en el body, un arreglo con los objetos que hayan resultado de la búsqueda
*/

describe('GET /api/cities/by_country/:country', () => {
    
    test('Debería devolver status 200 y un arreglo con ciudades para el país especificado', async () => {
      const country = 'Chile';  // País a probar
      
      const response = await request(app.callback()).get(`/api/cities/by_country/${country}`)
      .expect(200)    
      //Verificación status correcto
    
      expect(response.status).toBe(200);  
  
      //Verificamos que la respuesta sea un arreglo con la lista de paises
      expect(Array.isArray(response.body)).toBeTruthy();
  
      //Verificamos que al menos una ciudad fue encontrada para el país especificado
      expect(response.body.length).toBeGreaterThan(0);
    });

    /**
     * Test 2
     * Cuando: realice una solicitud a /api/cities/by_country/:country, tomando en cuenta que :country es un string de largo >= 3, con caracteres compuestos por solo letras y NO encuentre resultados, independiente del case de :country
     * Entonces: debe devolver un status 200 y en el body, un objeto con el siguiente formato: 
     * {
        "message": "No se encontraron ciudades para el país ingresado"
        }
     */

    test('Debería devolver status 200 y un mensaje cuando no se encuentran ciudades para el país especificado', async () => {
        const country = 'PaisNoInexistelikeNarutoland'; // País que sabemos que no existe en nuestros datos
        
        const response = await request(app.callback()).get(`/api/cities/by_country/${country}`)
        .expect(200)
        
        // Validaciones para status 200
        expect(response.status).toBe(200);
    
        // Validaciones para el cuerpo de la respuesta (objeto con mensaje)
        expect(response.body).toEqual({ message: 'No se encontraron ciudades para el país ingresado' });
      });
      
      /**
       * Test 3
       * Dado: Una consulta al servicio
       * Cuando: realice una solicitud a /api/cities/by_country/:country, tomando en cuenta que :country es un string de largo >= 3, con caracteres alfanuméricos o solo númericos, independiente del case de :country
       * Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:
        {
        "message": "Solo se aceptan caracteres no numéricos"
        }  
       */
      test('Debería devolver status 400 y un mensaje cuando el país especificado tiene caracteres no alfabéticos', async () => {
        const country = 'Ar9entina5'; // País con caracteres no alfabéticos
        
        const response = await request(app.callback()).get(`/api/cities/by_country/${country}`)
        

        // Validacion para status 400
        expect(response.status).toBe(400);
    
        //Validacion para la respuesta (objeto con mensaje)
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' });
      });

    it('Debería devolver status 400 si el país especificado no cumple con los requisitos', async () => {
        const pais2letras = 'ab'; // País que no cumple con el largo mínimo de 3 caracteres
    
        const response = await request(app.callback()).get(`/api/cities/by_country/${pais2letras}`)
        
    
        //Validacion para status 400
        expect(response.status).toBe(400);
    
        //Validacion para la respuesta de error 
        expect(response.body).toEqual({ error: 'El país especificado debe tener al menos 3 caracteres' });
      });
  });