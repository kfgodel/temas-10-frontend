## Punto de inicio
- Si no indica ruta, accede a la index, que lo deriva a la ruta elegida como punto de inicio default. 


## Rutas autenticadas
Las rutas que extiendend de **AuthenticatedRoute** colaboran con el **Authenticator** para
 validar que el usuario se haya logueado antes de acceder.
 - Si el usuario está logueado acceden normalmente
 - Si el usuario no está logueado navegan hasta el login y se registran como 
 punto de retorno para volver una vez logueado



## Navigator
Existe un servicio en la aplicacion que permite moverse entre las distintas secciones.
Tiene un metodo por cada ruta con cada combinacion de parametros posibles.
Si por ejemplo se puede ir a la vista de proyectos con filtro, o sin el, existirán dos métodos.

Este objeto abstrae además la manera concreta en que la vista se mapea a ember, permitiendo hacer cambios
de ruteo sin afectar el código que depende de la navegación.
Internamente utiliza al **transitioner** que depende de un servicio privado de ember para navegar programáticamente
por la app desde cualquier punto del código (incluso componentes).
