# p4-t2-networking-diego-algomas

En este capítulo del libro se empieza definiendo la conexión mediante sockets y su funcionamiento. En el fichero server.js podemos ver como se crea un servidor que se queda escuchando a un puerto en concreto las peticiones de los distintos clientes, el .listen llama a la función bind que une la escucha del servidor con el puerto concreto. 

En el fichero net-watcher.js que se encuentra dentro de la carpeta networking vemos como cogemos los modulos net y fs. Repasamos como en el caso de que el usuario no introduzca un argumento para vigilar el archivo el programa lanzará una excepción, que al no estar controlada parará el flujo del programa y lo cerrará. En la función de create server primero se informa de que se ha establecido la conexión a los dos extremos de la conexión a la parte del servidor mediante la escritura en consola mientras que al cliente se le informará mediante el write en la conexión. En la parte del watcher setup se empieza a vigilar el fichero especificado para que en caso de cambio se le notifique al cliente. Por último se añade un listener de la conexión para que en el momento que se produzca el evento 'close' se cierre la conexión y el watcher del fichero. La callback acaba en un listen que produce que el objeto que devuelve la callback haga un bind al puerto en concreto al que tiene que escuchar para las conexiones.    

Para probar el fichero anterior se ha de ejecutar distintos comandos en varias consolas. Con el comando *watch -n 5 touch target.txt* donde el número signigica cada cuanto tiempo se ha de esperar para hacer el comando touch sobre el fichero target.txt. En otra consola deberemos ejecutar nuestro servidor que nos proporcionará el servicio. Mientras que con el comando *nc localhost 60300* nos conectaremos como clientes, el nc es un programa de utilidad de sockets mientras que se le especifica la dirección de conexión con el puerto al que nos queremos conectar. En el caso de no tener la utilidad de nc se podrría usar la utilidad de *telnet*. 

//Foto

Para mejorar nuestras funcionalidades, hacer casos de prueba y además ser capaces de dar una mayor versatilidad a nuestro código utilizaremos los ficheros JSON de manera que se puedan comunicar mejor cada uno de los extremos de la comunicación. Para ello tendremos que tener en cuenta que un fichero JSOn está compuesto por distintos pares de valores key-value. En nuestro caso se corresponden dos tipos de mensajes los de esperando por conexión y los de cambio de fichero. Usando el *JSON.stringify* podemos enviar por el socket el tipo de paquete JSON de una manera sencilla como se ve en el fichero net-watcher. Y nos da un resultado como este:

//foto

En el fichero net-watcher-client en su primera versión podemos observar como crea una conexión a un servidor por medio del connect del paquete 'net'. Además también se usa el *JASON.parse para descifrar el mensaje cada vez que llega un evento del tipo 'data'. 

Este fichero tiene problemas como que se asume que todo el mensaje llegará en un chunk de datos por lo que puede traer grandes problemas en un estado normal de aplicación de red. Para ello, se nos sugiere que creemos una extensión de la clase eventEmitter en una carpeta que por convenio se llama lib. Para ello usaremos la herencia y extenderemos la clase evenEmitter e implementaremos un método para unir todos los mensajes de manera que se espere al retorno de carro para enviar el mensaje entero. Además mediante el *module.exports*  se puede acceder al código de una manera muy sencilla. El código se encuentra en la clase net-watcher-ldj-client.js donde se ve en detalle el método usado. 

